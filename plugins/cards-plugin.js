import { createHash } from 'node:crypto';
import { createReadStream, existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, resolve, sep } from 'node:path';

import { byName, imageExtensions, parseCard } from './parse-card.js';

/**
 * Плагин карточек: собирает папки с card.txt в модуль карточек.
 *
 * Импортируется он обычным относительным путём (`../data/cards-tuning.js`),
 * а resolveId возвращает абсолютный путь к несуществующему файлу. Это важно:
 * id с префиксом «\0» Vite отдаёт браузеру как /@id/__x00__virtual:… —
 * служебный префикс и двоеточие в адресе ломаются на прокси и в некоторых
 * окружениях предпросмотра. С обычным путём запрос выглядит как
 * /zc33s/src/data/cards-tuning.js и проходит везде.
 *
 * @param {object} options
 * @param {string} options.directory — папка с карточками (TuningCards, CustomCards)
 * @param {string} options.virtualPath — путь модуля внутри проекта
 * @param {string} options.name — имя плагина
 */
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

export function cardsPlugin({ directory, virtualPath, name }) {
  const cardsDirectory = resolve(directory);
  let root = process.cwd();
  let modulePath = resolve(root, virtualPath);
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
      root = config.root;
      modulePath = resolve(root, virtualPath);
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
        const module = server.moduleGraph.getModuleById(modulePath);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: 'full-reload' });
      };
      ['add', 'change', 'unlink', 'addDir', 'unlinkDir'].forEach((event) => server.watcher.on(event, reload));
    },
    resolveId(id, importer) {
      if (id === modulePath) return modulePath;

      // Запрос за самим модулем приходит как URL: /zc33s/src/data/cards-tuning.js
      if (id.startsWith('/')) {
        const withoutBase = base !== '/' && id.startsWith(base) ? id.slice(base.length) : id.slice(1);
        if (resolve(root, withoutBase) === modulePath) return modulePath;
        return null;
      }

      if (!importer || !id.startsWith('.')) return null;

      // Импорт пишется относительно страницы: ../data/cards-tuning.js
      const cleanImporter = importer.split('?')[0];
      const target = resolve(dirname(cleanImporter), id);
      return target === modulePath ? modulePath : null;
    },
    load(id) {
      if (id !== modulePath) return null;
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
