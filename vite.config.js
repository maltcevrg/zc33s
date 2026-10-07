import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getSeoForPath } from './src/data/seo.js';

const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const collator = new Intl.Collator('ru', { numeric: true });
const byName = (a, b) => collator.compare(a.name, b.name);

// Формат card.txt: поля (строго заглавными буквами) в виде «ПОЛЕ - значение»,
// значение поля может занимать несколько строк. Порядок полей произвольный.
//
//   HEADER      — название карточки;
//   HIGHLIGHTS  — ключевые параметры на карточке витрины, по одному в строке (до 4);
//   SUMMARY     — назначение: короткий абзац без маркетинговых формулировок;
//   SPECS       — основные характеристики, строки вида «Параметр — значение»;
//   POWER       — заявление о мощности (только как ориентировочный расчётный показатель);
//   REQUIRED    — обязательные требования к конфигурации, по одному в строке;
//   RECOMMENDED — рекомендуемые требования к конфигурации, по одному в строке;
//   INCLUDED    — что входит в стоимость, по одному в строке;
//   VARIANTS    — варианты приобретения, строки вида «65 000 ₽ — условие»;
//                 строки без цены в начале выводятся как пояснения к вариантам;
//   WARRANTY    — срок гарантии, например «6 месяцев»;
//   TESTS       — измеренный результат тестового автомобиля, «Параметр — значение»;
//   PRICE_NOTE  — пояснение к цене (по умолчанию берётся из src/data/siteConfig.js);
//   DESC        — свободный текст (устаревшее поле, показывается, если нет SUMMARY);
//   PRICE       — ориентировочная стоимость.
//
// Разделитель в парах «Параметр — значение» — длинное тире с пробелами, чтобы
// артикулы вида TD02L11-025*075WDS-F3.4 не разбивались на части.
// Полное описание формата: docs/card-format.md
const CARD_FIELD_NAMES = [
  'HEADER',
  'HIGHLIGHTS',
  'SUMMARY',
  'SPECS',
  'POWER',
  'REQUIRED',
  'RECOMMENDED',
  'INCLUDED',
  'VARIANTS',
  'WARRANTY',
  'TESTS',
  'PRICE_NOTE',
  'DESC',
  'PRICE',
];

// Строки списка: пустые отбрасываем, маркеры «-», «•», «*» в начале убираем.
const toList = (value) =>
  value
    .split('\n')
    .map((line) => line.replace(/^\s*[-•*]\s+/, '').trim())
    .filter(Boolean);

// Пары «Параметр — значение». Строки без разделителя попадают в text с пустым label.
const toPairs = (value) =>
  toList(value).map((line) => {
    const match = line.match(/^([^—]+?)\s+—\s+([\s\S]+)$/);
    return match ? { label: match[1].trim(), text: match[2].trim() } : { label: '', text: line };
  });

// Варианты приобретения: цена в начале строки отделяется длинным тире от условия.
const toVariants = (value) => {
  const variants = [];
  const notes = [];

  for (const line of toList(value)) {
    const match = line.match(/^(.*?\d[\d\s]*\s*₽)\s*—\s*([\s\S]+)$/);
    if (match) variants.push({ price: match[1].trim(), text: match[2].trim() });
    else notes.push(line);
  }

  return { variants, notes };
};

export function parseCard(rawContent, folderName) {
  const content = rawContent.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const fields = {};
  // [ \t] вместо \s, чтобы «HEADER -» с пустым значением не захватывало следующую строку.
  // Без флага i, чтобы строки описания вроде «Price - …» не воспринимались как поля.
  const fieldPattern = new RegExp(`^(${CARD_FIELD_NAMES.join('|')})[ \\t]*-[ \\t]*(.*)$`, 'gm');
  const matches = [...content.matchAll(fieldPattern)];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const valueStart = match.index + match[0].length;
    const valueEnd = matches[index + 1]?.index ?? content.length;
    const continuation = content.slice(valueStart, valueEnd).trim();
    fields[match[1]] = [match[2], continuation].filter(Boolean).join('\n').trim();
  }

  const { variants, notes: variantNotes } = toVariants(fields.VARIANTS || '');

  return {
    title: fields.HEADER || folderName,
    hasHeader: Boolean(fields.HEADER),
    // На карточке витрины помещается ограниченное число подписей.
    highlights: toList(fields.HIGHLIGHTS || '').slice(0, 4),
    summary: fields.SUMMARY || '',
    specs: toPairs(fields.SPECS || ''),
    power: fields.POWER || '',
    required: toList(fields.REQUIRED || ''),
    recommended: toList(fields.RECOMMENDED || ''),
    included: toList(fields.INCLUDED || ''),
    variants,
    variantNotes,
    warranty: fields.WARRANTY || '',
    tests: toPairs(fields.TESTS || ''),
    priceNote: fields.PRICE_NOTE || '',
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

// Маршруты приложения (см. src/App.jsx). GitHub Pages не умеет SPA-фолбэк,
// поэтому для каждого раздела нужна собственная оболочка index.html —
// иначе прямая ссылка и обновление страницы на /zc33s/tuning отдают 404.
const spaRoutes = [
  'tuning',
  'service',
  'faq',
  'custom',
  'catalog',
  'warranty',
  'purchase',
  'about',
  'privacy',
  'legal',
  'knowledge',
  'knowledge/zc33s-faq',
  'knowledge/ecu-flashing',
  'knowledge/tuning-stages',
  'knowledge/buying-zc33s',
  'knowledge/diagnostics',
  'knowledge/hardware',
];

function injectSeoToHtml(html, seo) {
  if (!seo) return html;
  let result = html;
  if (seo.title) {
    result = result.replace(/<title>.*?<\/title>/s, `<title>${seo.title}</title>`);
  }
  if (seo.description) {
    result = result.replace(
      /<meta name="description" content=".*?" \/>/s,
      `<meta name="description" content="${seo.description}" />`
    );
  }
  if (seo.canonical) {
    result = result.replace(
      /<link rel="canonical" href=".*?" \/>/s,
      `<link rel="canonical" href="${seo.canonical}" />`
    );
    result = result.replace(
      /<meta property="og:url" content=".*?" \/>/s,
      `<meta property="og:url" content="${seo.canonical}" />`
    );
  }
  if (seo.ogTitle || seo.title) {
    const titleVal = seo.ogTitle || seo.title;
    result = result.replace(
      /<meta property="og:title" content=".*?" \/>/s,
      `<meta property="og:title" content="${titleVal}" />`
    );
    result = result.replace(
      /<meta name="twitter:title" content=".*?" \/>/s,
      `<meta name="twitter:title" content="${titleVal}" />`
    );
  }
  if (seo.ogDescription || seo.description) {
    const descVal = seo.ogDescription || seo.description;
    result = result.replace(
      /<meta property="og:description" content=".*?" \/>/s,
      `<meta property="og:description" content="${descVal}" />`
    );
    result = result.replace(
      /<meta name="twitter:description" content=".*?" \/>/s,
      `<meta name="twitter:description" content="${descVal}" />`
    );
  }
  if (seo.ogImage) {
    result = result.replace(
      /<meta property="og:image" content=".*?" \/>/s,
      `<meta property="og:image" content="${seo.ogImage}" />`
    );
    result = result.replace(
      /<meta name="twitter:image" content=".*?" \/>/s,
      `<meta name="twitter:image" content="${seo.ogImage}" />`
    );
  }
  return result;
}

function spaFallbackPlugin(routes) {
  let outDir = 'dist';

  return {
    name: 'spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const shellPath = join(outDir, 'index.html');
      if (!existsSync(shellPath)) return;

      const shell = readFileSync(shellPath, 'utf8');
      for (const route of routes) {
        const routeDirectory = join(outDir, route);
        mkdirSync(routeDirectory, { recursive: true });
        const routePath = route.startsWith('/') ? route : `/${route}`;
        const routeSeo = getSeoForPath(routePath);
        const routeHtml = injectSeoToHtml(shell, routeSeo);
        writeFileSync(join(routeDirectory, 'index.html'), routeHtml);
      }

      // Неизвестный адрес Pages отдаст со статусом 404, а роутер перенаправит
      // на главную (catch-all в src/App.jsx). Пути к ассетам абсолютные, поэтому
      // оболочка работает на любой глубине вложенности.
      writeFileSync(join(outDir, '404.html'), shell);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    spaFallbackPlugin(spaRoutes),
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
