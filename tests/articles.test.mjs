import test from 'node:test';
import assert from 'node:assert/strict';

import { buildArticleHtml, normalizeHeading, stripTags } from '../src/utils/articleAnchors.js';
import { translations } from '../src/i18n/translations.js';

const anchorIds = (html) => [...html.matchAll(/id="section-(\d+)"/g)].map((match) => Number(match[1]));

test('stripTags раскрывает сущности и убирает разметку', () => {
  assert.equal(stripTags('<p>Масло&nbsp;&amp;&nbsp;фильтр</p>'), ' Масло & фильтр ');
});

test('normalizeHeading снимает нумерацию, пунктуацию и регистр', () => {
  assert.equal(normalizeHeading('1. Топливная система: какой бензин?'), 'топливная система какой бензин');
  assert.equal(normalizeHeading('2) МОТОРНОЕ масло'), 'моторное масло');
});

test('buildArticleHtml возвращает исходный HTML без оглавления', () => {
  const html = '<p><strong>Раздел</strong></p>';

  assert.equal(buildArticleHtml(html, []), html);
  assert.equal(buildArticleHtml('', ['Раздел']), '');
});

test('buildArticleHtml ставит якоря по порядку пунктов оглавления', () => {
  const html = '<p><strong>Первый раздел</strong></p><p>текст</p>' + '<h2>Второй раздел</h2><p>текст</p>';

  const result = buildArticleHtml(html, ['Первый раздел', 'Второй раздел']);

  assert.deepEqual(anchorIds(result), [1, 2]);
  assert.ok(result.indexOf('id="section-1"') < result.indexOf('id="section-2"'));
});

test('заголовки внутри таблиц не получают якорей', () => {
  const html = '<table><tr><td><p><strong>Бренд</strong></p></td></tr></table><h2>Раздел</h2>';

  const result = buildArticleHtml(html, ['Бренд', 'Раздел']);

  // Номер якоря соответствует номеру пункта оглавления: «Бренд» заголовком не считается,
  // поэтому «Раздел» получает второй номер.
  assert.deepEqual(anchorIds(result), [2]);
});

test('строка «Термин: продолжение текста» не считается заголовком', () => {
  const longTail = 'продолжение текста '.repeat(5);
  const html = `<p><strong>Важно:</strong> ${longTail}</p><h2>Раздел</h2>`;

  const result = buildArticleHtml(html, ['Важно', 'Раздел']);

  assert.deepEqual(anchorIds(result), [2]);
});

test('якоря находятся на своих местах в реальных статьях (RU и EN)', async () => {
  // Контент статей грузится лениво из отдельных модулей — читаем их напрямую,
  // ровно так же, как это делает страница статьи.
  for (const lang of Object.keys(translations)) {
    const articles = translations[lang]?.knowledge?.articles || [];

    for (const article of articles) {
      const url = new URL(`../src/i18n/articles/${lang}/${article.slug}.js`, import.meta.url);
      const { toc, html: rawHtml } = await import(url.href);
      const html = buildArticleHtml(rawHtml, toc);
      const ids = anchorIds(html);
      const ordered = ids.every((id, index) => index === 0 || id > ids[index - 1]);

      assert.equal(ids.length, toc.length, `${lang}/${article.slug}: не все якоря расставлены`);
      assert.deepEqual(
        ids,
        toc.map((_, index) => index + 1),
        `${lang}/${article.slug}: порядок якорей`
      );
      assert.ok(ordered);
    }
  }
});
