// Проверка якорей оглавления во всех статьях базы знаний (RU/EN).
// Запуск: npm run check:anchors

import { translations } from '../src/i18n/translations.js';
import { loadArticleHtml } from '../src/i18n/articleContent.js';
import { buildArticleHtml } from '../src/utils/articleAnchors.js';

let failures = 0;

for (const lang of Object.keys(translations)) {
  const articles = translations[lang]?.knowledge?.articles || [];
  if (!articles.length) continue;

  console.log(`\n${lang.toUpperCase()}:`);

  for (const article of articles) {
    const html = buildArticleHtml(await loadArticleHtml(lang, article.slug), article.toc);
    const ids = [...html.matchAll(/id="section-(\d+)"/g)].map((match) => Number(match[1]));
    const anchors = new Set(ids);
    const missing = article.toc.map((_, index) => index + 1).filter((num) => !anchors.has(num));
    const ordered = ids.every((num, index) => index === 0 || num > ids[index - 1]);
    const ok = missing.length === 0 && ids.length === article.toc.length && ordered;

    if (!ok) failures += 1;
    console.log(
      `${ok ? 'OK  ' : 'FAIL'} ${article.slug}: ${ids.length}/${article.toc.length} anchors` +
        (ordered ? '' : ', anchors out of document order')
    );

    if (!ok) {
      article.toc.forEach((entry, index) => {
        if (!anchors.has(index + 1)) console.log(`       missing #${index + 1}: ${entry}`);
      });
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} article(s) without full TOC anchors.`);
  process.exit(1);
}

console.log('\nAll articles have complete TOC anchors.');
