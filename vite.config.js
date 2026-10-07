import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const collator = new Intl.Collator('ru', { numeric: true });
const byName = (a, b) => collator.compare(a.name, b.name);

// Формат card.txt: поля HEADER / DESC / PRICE (строго заглавными буквами),
// значение поля может занимать несколько строк.
export function parseCard(rawContent, folderName) {
  const content = rawContent.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const fields = {};
  // [ \t] вместо \s, чтобы «HEADER -» с пустым значением не захватывало следующую строку.
  // Без флага i, чтобы строки описания вроде «Price - …» не воспринимались как поля.
  const fieldPattern = /^(HEADER|DESC|PRICE)[ \t]*-[ \t]*(.*)$/gm;
  const matches = [...content.matchAll(fieldPattern)];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const valueStart = match.index + match[0].length;
    const valueEnd = matches[index + 1]?.index ?? content.length;
    const continuation = content.slice(valueStart, valueEnd).trim();
    fields[match[1]] = [match[2], continuation].filter(Boolean).join('\n').trim();
  }

  return {
    title: fields.HEADER || folderName,
    hasHeader: Boolean(fields.HEADER),
    description: fields.DESC || '',
    price: fields.PRICE || '',
  };
}

// Картинки подключаются обычными import'ами: Vite сам отдаёт их в dev,
// добавляет content-hash к именам в production и учитывает base.
function cardsPlugin({ directory, moduleId, name }) {
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
        const textFile = entries.find((entry) => entry.isFile() && extname(entry.name).toLowerCase() === '.txt');

        if (textFile) this.addWatchFile(join(folderPath, textFile.name));
        const { hasHeader, ...details } = parseCard(
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

        if (!textFile) this.warn(`[${name}] В папке «${folder.name}» нет .txt файла, используется имя папки.`);
        else if (!hasHeader) this.warn(`[${name}] В карточке «${folder.name}» не найдено поле HEADER.`);
        if (images.length === 0) this.warn(`[${name}] В карточке «${folder.name}» нет картинок.`);

        const fields = Object.entries({ id: folder.name, ...details })
          .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
          .join(', ');
        return `{ ${fields}, images: [${images.join(', ')}] }`;
      });

      return `${imports.join('\n')}\nexport default [\n  ${cards.join(',\n  ')}\n];`;
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    cardsPlugin({
      directory: 'TuningCards',
      moduleId: 'virtual:tuning-cards',
      name: 'tuning-cards',
    }),
    cardsPlugin({
      directory: 'CustomCards',
      moduleId: 'virtual:custom-cards',
      name: 'custom-cards',
    }),
  ],
  base: '/zc33s/',
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
