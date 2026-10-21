// Проверка якорей оглавления во всех статьях базы знаний (RU/EN).
// Запуск: npm run check:anchors
//
// HTML и оглавление статей лежат в src/i18n/articles/<lang>/<slug>.js
// и грузятся лениво, поэтому скрипт читает эти модули напрямую.

import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { translations } from '../src/i18n/translations.js';
import { buildArticleHtml } from '../src/utils/articleAnchors.js';

const ARTICLES_DIR = new URL('../src/i18n/articles/', import.meta.url).pathname;

let failures = 0;

for (const lang of Object.keys(translations)) {
  const articles = translations[lang]?.knowledge?.articles || [];
  if (!articles.length) continue;

  console.log(`\n${lang.toUpperCase()}:`);

  for (const article of articles) {
    const langDir = join(ARTICLES_DIR, lang);
    const fallbackDir = join(ARTICLES_DIR, 'ru');
    const dir = existsSync(join(langDir, `${article.slug}.js`)) ? langDir : fallbackDir;
    const modulePath = join(dir, `${article.slug}.js`);

    if (!existsSync(modulePath)) {
      failures += 1;
      console.log(`FAIL ${article.slug}: нет файла контента статьи`);
      continue;
    }

    const { toc = [], html: rawHtml = '' } = await import(pathToFileURL(modulePath).href);
    const html = buildArticleHtml(rawHtml, toc);
    const ids = [...html.matchAll(/id="section-(\d+)"/g)].map((match) => Number(match[1]));
    const anchors = new Set(ids);
    const missing = toc.map((_, index) => index + 1).filter((num) => !anchors.has(num));
    const ordered = ids.every((num, index) => index === 0 || num > ids[index - 1]);
    const ok = missing.length === 0 && ids.length === toc.length && ordered;

    if (!ok) failures += 1;
    console.log(
      `${ok ? 'OK  ' : 'FAIL'} ${article.slug}: ${ids.length}/${toc.length} anchors` +
        (ordered ? '' : ', anchors out of document order')
    );

    if (!ok) {
      toc.forEach((entry, index) => {
        if (!anchors.has(index + 1)) console.log(`       missing #${index + 1}: ${entry}`);
      });
    }
  }
}

// Ловим и обратную ситуацию: модуль контента есть, а статьи в словаре нет.
for (const lang of readdirSync(ARTICLES_DIR, { withFileTypes: true }).filter((e) => e.isDirectory())) {
  const slugs = new Set((translations[lang.name]?.knowledge?.articles || []).map((a) => a.slug));
  for (const file of readdirSync(join(ARTICLES_DIR, lang.name))) {
    const slug = file.replace(/\.js$/, '');
    if (!slugs.has(slug)) {
      failures += 1;
      console.log(`FAIL ${lang.name}/${slug}: контент есть, а статьи в словаре нет`);
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} article(s) without full TOC anchors.`);
  process.exit(1);
}

console.log('\nAll articles have complete TOC anchors.');
