import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);

function parseCard(content, folderName) {
  const fields = {};
  const fieldPattern = /^(HEADER|DESC|PRICE)\s*-\s*(.*)$/gim;
  const matches = [...content.matchAll(fieldPattern)];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const valueStart = match.index + match[0].length;
    const valueEnd = matches[index + 1]?.index ?? content.length;
    const continuation = content.slice(valueStart, valueEnd).trim();
    fields[match[1].toUpperCase()] = [match[2], continuation].filter(Boolean).join('\n').trim();
  }

  return {
    title: fields.HEADER || folderName,
    description: fields.DESC || '',
    price: fields.PRICE || '',
  };
}

function cardsPlugin({ directory, moduleId, outputDirectory, name }) {
  const cardsDirectory = resolve(directory);
  const resolvedModuleId = `\0${moduleId}`;
  let isBuild = false;
  let base = '/';

  return {
    name,
    configResolved(config) {
      isBuild = config.command === 'build';
      base = config.base;
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : null;
    },
    load(id) {
      if (id !== resolvedModuleId) return null;
      if (!existsSync(cardsDirectory)) return 'export default [];';

      const folders = readdirSync(cardsDirectory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .sort((a, b) => a.name.localeCompare(b.name, 'ru', { numeric: true }));

      const cards = folders.map((folder, folderIndex) => {
        const folderPath = join(cardsDirectory, folder.name);
        const entries = readdirSync(folderPath, { withFileTypes: true });
        const textFile = entries.find((entry) => entry.isFile() && extname(entry.name).toLowerCase() === '.txt');
        const details = textFile
          ? parseCard(readFileSync(join(folderPath, textFile.name), 'utf8'), folder.name)
          : parseCard('', folder.name);
        const images = entries
          .filter((entry) => entry.isDirectory())
          .flatMap((directory) => {
            const imageDirectory = join(folderPath, directory.name);
            return readdirSync(imageDirectory, { withFileTypes: true })
              .filter((entry) => entry.isFile() && imageExtensions.has(extname(entry.name).toLowerCase()))
              .sort((a, b) => a.name.localeCompare(b.name, 'ru', { numeric: true }))
              .map((entry, imageIndex) => {
                const imagePath = join(imageDirectory, entry.name);
                this.addWatchFile(imagePath);

                if (isBuild) {
                  const referenceId = this.emitFile({
                    type: 'asset',
                    fileName: `${outputDirectory}/card-${folderIndex + 1}/image-${imageIndex + 1}${extname(entry.name).toLowerCase()}`,
                    source: readFileSync(imagePath),
                  });
                  return `__VITE_ASSET__${referenceId}__`;
                }

                return `${base}@fs/${imagePath.replaceAll('\\', '/')}`;
              });
          });

        return { id: folder.name, ...details, images };
      });

      return `export default ${JSON.stringify(cards)};`;
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    cardsPlugin({
      directory: 'TuningCards',
      moduleId: 'virtual:tuning-cards',
      outputDirectory: 'tuning-cards',
      name: 'tuning-cards',
    }),
    cardsPlugin({
      directory: 'CustomCards',
      moduleId: 'virtual:custom-cards',
      outputDirectory: 'custom-cards',
      name: 'custom-cards',
    }),
  ],
  base: '/zc33site/',
});
