import { createHash } from 'node:crypto';
import { createReadStream, existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, resolve, sep } from 'node:path';

import { byName, imageExtensions, parseCard } from './parse-card.js';

// Расширение → Content-Type для отдачи картинок в dev.
const MIME_TYPES = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

/**
 * Плагин карточек: собирает папки с card.txt в виртуальный модуль.
 *
 * Модуль виртуальный намеренно: файла на диске у него нет, и сканер
 * зависимостей Vite (esbuild) такие id пропускает. Если подставить вместо него
 * путь к несуществующему файлу, optimizeDeps падает с ENOENT, и React приезжает
 * в приложение как null («Cannot read properties of null (reading 'useMemo')»).
 *
 * Картинки карточек, наоборот, отдаются по ASCII-адресам
 * /<base>card-images/<хэш папки>/N.jpg: папки называются «Stage 1»,
 * «Турбина GR30», и пробелы с кириллицей в адресах модулей — лишний риск
 * для прокси и кодирования. В сборке картинки кладёт Rollup (emitFile),
 * там имена и так ASCII.
 *
 * @param {object} options
 * @param {string} options.directory — папка с карточками (TuningCards, CustomCards)
 * @param {string} options.moduleId — id виртуального модуля (virtual:tuning-cards)
 * @param {string} options.name — имя плагина
 */
export function cardsPlugin({ directory, moduleId, name }) {
  const cardsDirectory = resolve(directory);
  const resolvedModuleId = `\0${moduleId}`;
  let base = '/';
  let isBuild = false;

  // Адреса картинок в dev: /<base>card-images/<хэш папки>/<имя>.jpg.
  // Папки карточек называются по-человечески («Stage 1», «Турбина GR30»),
  // а в адресах пробелы и кириллица — лишний риск (прокси, кодирование).
  // В сборке картинки отдаёт Rollup через emitFile, там хэши и так ASCII.
  const devAssets = new Map();
  const assetSlug = (name) => createHash('sha1').update(name).digest('hex').slice(0, 10);

  const isInsideCards = (file) => {
    const path = resolve(file);
    return path === cardsDirectory || path.startsWith(cardsDirectory + sep);
  };

  /**
   * Код выражения, дающего адрес картинки.
   * dev  — обычная строка, файл отдаёт middleware плагина;
   * build — emitFile, Rollup сам положит файл в assets и подставит URL.
   */
  const imageExpression = (context, slug, index, file) => {
    const extension = extname(file).toLowerCase();

    if (!isBuild) {
      const url = `${base}card-images/${slug}/${index}${extension}`;
      devAssets.set(url, file);
      return JSON.stringify(url);
    }

    const reference = context.emitFile({
      type: 'asset',
      name: `${slug}-${index}${extension}`,
      source: readFileSync(file),
    });
    return `import.meta.ROLLUP_FILE_URL_${reference}`;
  };

  return {
    name,
    configResolved(config) {
      base = config.base || '/';
      isBuild = config.command === 'build';
    },
    configureServer(server) {
      // Картинки карточек отдаём по ASCII-адресам вида /card-images/<хэш>/0.jpg.
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0];
        const file = path ? devAssets.get(path) : null;
        if (!file || !existsSync(file)) return next();

        res.setHeader('Content-Type', MIME_TYPES[extname(file).toLowerCase()] || 'application/octet-stream');
        res.setHeader('Cache-Control', 'no-cache');
        createReadStream(file).pipe(res);
      });

      // Новые/удалённые/изменённые папки, card.txt и картинки обновляют карточки без перезапуска dev-сервера.
      server.watcher.add(cardsDirectory);
      const reload = (file) => {
        if (!isInsideCards(file)) return;
        const module = server.moduleGraph.getModuleById(resolvedModuleId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: 'full-reload' });
      };
      ['add', 'change', 'unlink', 'addDir', 'unlinkDir'].forEach((event) => server.watcher.on(event, reload));
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : null;
    },
    load(id) {
      if (id !== resolvedModuleId) return null;
      if (!existsSync(cardsDirectory)) return 'export default [];';

      const folders = readdirSync(cardsDirectory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !/^[._]/.test(entry.name))
        .sort(byName);

      const cards = folders.map((folder) => {
        const folderPath = join(cardsDirectory, folder.name);
        const entries = readdirSync(folderPath, { withFileTypes: true });
        const textFile = entries.find(
          (entry) => entry.isFile() && extname(entry.name).toLowerCase() === '.txt'
        );

        if (textFile) this.addWatchFile(join(folderPath, textFile.name));
        const { hasHeader, order, ...details } = parseCard(
          textFile ? readFileSync(join(folderPath, textFile.name), 'utf8') : '',
          folder.name
        );

        const imageNames = entries
          .filter((entry) => entry.isDirectory())
          .sort(byName)
          .flatMap((directory) => {
            const imageDirectory = join(folderPath, directory.name);
            return readdirSync(imageDirectory, { withFileTypes: true })
              .filter((entry) => entry.isFile() && imageExtensions.has(extname(entry.name).toLowerCase()))
              .sort(byName)
              .map((entry) => join(imageDirectory, entry.name));
          });

        const slug = assetSlug(folder.name);
        const images = imageNames.map((imagePath, index) => {
          if (/[?#]/.test(imagePath)) {
            this.error(`[${name}] В пути к картинке есть символы "?" или "#": ${imagePath}`);
          }
          return imageExpression(this, slug, index, imagePath);
        });

        if (!textFile)
          this.warn(`[${name}] В папке «${folder.name}» нет .txt файла, используется имя папки.`);
        else if (!hasHeader) this.warn(`[${name}] В карточке «${folder.name}» не найдено поле HEADER.`);
        if (images.length === 0) this.warn(`[${name}] В карточке «${folder.name}» нет картинок.`);

        const fields = Object.entries({ id: folder.name, ...details })
          .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
          .join(', ');
        return {
          name: folder.name,
          code: `{ ${fields}, images: [${images.join(', ')}] }`,
          // Без ORDER карточка уезжает в конец, сохраняя алфавитный порядок папок.
          order: order ?? Number.POSITIVE_INFINITY,
        };
      });

      // Сортировка по полю ORDER из card.txt; при равных значениях — по имени папки.
      cards.sort((a, b) => a.order - b.order || byName(a, b));

      return `export default [\n  ${cards.map((card) => card.code).join(',\n  ')}\n];`;
    },
  };
}

export default cardsPlugin;
