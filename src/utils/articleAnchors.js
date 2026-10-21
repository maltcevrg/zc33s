// Расстановка якорей оглавления (#section-N) в HTML статей базы знаний.
//
// Заголовки статей свёрстаны как <p><strong>…</strong></p> (иногда с ведущим
// номером «1. », «2) ») или обычными тегами h1–h6, а в оглавлении (toc) текст
// идёт без нумерации и может отличаться пунктуацией/кавычками. Поэтому прямое
// сравнение строк не работает — текст нормализуется: снимаются теги и HTML-
// сущности, регистр, пунктуация, ведущий номер и лишние пробелы.

const ENTITY_MAP = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  mdash: '—',
  ndash: '–',
  minus: '−',
  hellip: '…',
  laquo: '«',
  raquo: '»',
  ldquo: '“',
  rdquo: '”',
  lsquo: '‘',
  rsquo: '’',
  times: '×',
  deg: '°',
};

const ENTITY_RE = /&(#\d+|#x[0-9a-f]+|[a-z][a-z0-9]*);/gi;

/** Раскрывает HTML-сущности в тексте (&amp;, &nbsp;, &laquo; …). */
export function decodeEntities(value) {
  return String(value ?? '').replace(ENTITY_RE, (match, code) => {
    const key = code.toLowerCase();
    if (key.startsWith('#')) {
      const num = key[1] === 'x' ? parseInt(key.slice(2), 16) : parseInt(key.slice(1), 10);
      if (!Number.isFinite(num)) return ' ';
      try {
        return String.fromCodePoint(num);
      } catch {
        return ' ';
      }
    }
    return ENTITY_MAP[key] ?? ' ';
  });
}

/** Убирает теги и раскрывает сущности — получается «читаемый» текст фрагмента. */
export function stripTags(html) {
  return decodeEntities(String(html ?? '').replace(/<[^>]*>/g, ' '));
}

/**
 * Нормализует заголовок для сравнения: нижний регистр, без ведущего номера
 * («1. », «2) »), без пунктуации и лишних пробелов.
 */
export function normalizeHeading(value) {
  return stripTags(value)
    .replace(/\u00a0/g, ' ')
    .toLowerCase()
    .replace(/^\s*\d{1,3}\s*[.)]\s*/, '')
    .replace(/[’‘`´]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const MIN_SCORE = 1.5;

/** Насколько заголовок из HTML похож на пункт оглавления (0 = не похож). */
function matchScore(heading, entry) {
  if (!heading || !entry) return 0;
  if (heading === entry) return 3;

  const shorter = Math.min(heading.length, entry.length);
  const longer = Math.max(heading.length, entry.length);
  if (!shorter) return 0;

  const startsWith = heading.startsWith(entry) || entry.startsWith(heading);
  if (startsWith && longer - shorter <= 40) return 2.5;

  const includes = heading.includes(entry) || entry.includes(heading);
  if (includes && shorter / longer >= 0.6) return 2;

  // Запасной вариант: почти совпадающий набор слов (порядок/служебные слова).
  const headingTokens = heading.split(' ');
  const entryTokens = entry.split(' ');
  if (headingTokens.length >= 3 && entryTokens.length >= 3) {
    const entrySet = new Set(entryTokens);
    const common = headingTokens.filter((token) => entrySet.has(token)).length;
    const union = new Set([...headingTokens, ...entryTokens]).size;
    if (common / union >= 0.8) return 1.5;
  }

  return 0;
}

/** true, если позиция находится внутри ячейки таблицы (<td>/<th>). */
function isInsideTableCell(html, index) {
  const before = html.slice(0, index).toLowerCase();
  const lastOpen = Math.max(before.lastIndexOf('<td'), before.lastIndexOf('<th'));
  if (lastOpen === -1) return false;
  const lastClose = Math.max(before.lastIndexOf('</td'), before.lastIndexOf('</th'));
  return lastOpen > lastClose;
}

/** Собирает блоки-заголовки: <p><strong>…</strong></p> и h1–h6. */
function collectHeadingBlocks(html) {
  const blocks = [];
  const blockRe = /<(p|h[1-6])\b[^>]*>([\s\S]*?)<\/\1\s*>/gi;
  let match = blockRe.exec(html);

  while (match) {
    const pos = match.index;
    const tag = match[1].toLowerCase();
    const inner = match[2];

    if (!isInsideTableCell(html, pos)) {
      let headingHtml = null;
      let restText = '';

      if (tag.startsWith('h')) {
        headingHtml = inner;
      } else {
        const strong = /^\s*<strong\b[^>]*>([\s\S]*?)<\/strong\s*>/i.exec(inner);
        if (strong) {
          headingHtml = strong[1];
          restText = stripTags(inner.slice(strong[0].length)).trim();
        }
      }

      // В <p><strong>Начало:</strong> продолжение текста…</p> — это не заголовок.
      if (headingHtml !== null && restText.length <= 60) {
        const norm = normalizeHeading(headingHtml);
        if (norm.length >= 2) blocks.push({ pos, norm, anchor: 0 });
      }
    }

    match = blockRe.exec(html);
  }

  return blocks;
}

/**
 * Вставляет перед заголовками статей маркеры нужные для TOC:
 * <span id="section-N"></span> (стили — в _page.scss).
 *
 * @param {string} rawHtml — HTML статьи
 * @param {string[]} tocEntries — пункты оглавления в порядке отображения
 * @returns {string} HTML с якорями (или исходный, если сопоставить не удалось)
 */
export function buildArticleHtml(rawHtml, tocEntries) {
  if (!rawHtml || !Array.isArray(tocEntries) || tocEntries.length === 0) {
    return rawHtml || '';
  }

  const html = String(rawHtml);
  const blocks = collectHeadingBlocks(html);
  if (!blocks.length) return html;

  const used = new Set();
  let cursor = 0;

  tocEntries.forEach((entry, index) => {
    const entryNorm = normalizeHeading(entry);
    if (!entryNorm) return;

    let bestIdx = -1;
    let bestScore = 0;

    // Сначала ищем кандидата не выше уже найденного — сохраняем порядок статей.
    for (let i = 0; i < blocks.length; i++) {
      if (used.has(i) || blocks[i].pos < cursor) continue;
      const score = matchScore(blocks[i].norm, entryNorm);
      if (score > bestScore) {
        bestScore = score;
        bestIdx = i;
        if (score === 3) break;
      }
    }

    // Если в этой части документа ничего не нашли — ищем по всей статье.
    if (bestScore < MIN_SCORE) {
      for (let i = 0; i < blocks.length; i++) {
        if (used.has(i)) continue;
        const score = matchScore(blocks[i].norm, entryNorm);
        if (score > bestScore) {
          bestScore = score;
          bestIdx = i;
        }
      }
    }

    if (bestScore < MIN_SCORE) return;

    const block = blocks[bestIdx];
    used.add(bestIdx);
    block.anchor = index + 1;
    cursor = block.pos + 1;
  });

  // Вставляем маркеры с конца, чтобы не сбить позиции предыдущих блоков.
  return blocks
    .filter((block) => block.anchor > 0)
    .sort((a, b) => b.pos - a.pos)
    .reduce((acc, block) => {
      const marker = `<span id="section-${block.anchor}"></span>`;
      return acc.slice(0, block.pos) + marker + acc.slice(block.pos);
    }, html);
}

export default buildArticleHtml;
