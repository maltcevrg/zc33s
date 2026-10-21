// Разбор card.txt — формат описан в docs/card-format.md.
// Вынесено из vite.config.js: плагину карточек и тестам парсер нужен без
// циклической зависимости от самого конфига Vite.
export const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const collator = new Intl.Collator('ru', { numeric: true });
export const byName = (a, b) => collator.compare(a.name, b.name);

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
  'ORDER',
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
    // Порядок на витрине: меньшее число — выше карточка. Пустое значение —
    // карточка идёт после всех упорядоченных, в алфавитном порядке папок.
    order: Number.isFinite(Number(fields.ORDER)) && fields.ORDER ? Number(fields.ORDER) : null,
  };
}
