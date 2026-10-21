import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';

import { byName, imageExtensions, parseCard } from './parse-card.js';

// Картинки подключаются обычными import'ами: Vite сам отдаёт их в dev,
// добавляет content-hash к именам в production и учитывает base.
export function cardsPlugin({ directory, moduleId, name }) {
  const cardsDirectory = resolve(directory);
  const resolvedModuleId = `\0${moduleId}`;
  let root = process.cwd();

  const isInsideCards = (file) => {
    const path = resolve(file);
    return path === cardsDirectory || path.startsWith(cardsDirectory + sep);
  };

  const toImportPath = (file) => {
    const relativePath = relative(root, file).split(sep).join('/');
    return relativePath.startsWith('..') ? file.split(sep).join('/') : `/${relativePath}`;
  };

  return {
    name,
    configResolved(config) {
      root = config.root;
    },
    configureServer(server) {
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

      const imports = [];
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

        const images = imageNames.map((imagePath) => {
          if (/[?#]/.test(imagePath)) {
            this.error(`[${name}] В пути к картинке есть символы "?" или "#": ${imagePath}`);
          }
          const variable = `image${imports.length}`;
          imports.push(`import ${variable} from ${JSON.stringify(toImportPath(imagePath))};`);
          return variable;
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

      return `${imports.join('\n')}\nexport default [\n  ${cards.map((card) => card.code).join(',\n  ')}\n];`;
    },
  };
}
