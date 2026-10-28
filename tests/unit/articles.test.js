import assert from 'node:assert/strict';
import test from 'node:test';
import { translations } from '../../src/i18n/translations.js';
import { loadArticleHtml } from '../../src/i18n/articleContent.js';
import { buildArticleHtml, decodeEntities, normalizeHeading } from '../../src/utils/articleAnchors.js';

for (const lang of ['ru', 'en']) {
  for (const article of translations[lang].knowledge.articles) {
    test(`${lang}: ${article.slug} loads independently with a complete TOC`, async () => {
      const raw = await loadArticleHtml(lang, article.slug);
      assert.equal(typeof raw, 'string');
      assert.ok(raw.length > 100);
      assert.equal(article.html, undefined, 'HTML must not be in the initial dictionary');
      const html = buildArticleHtml(raw, article.toc);
      const actual = [...html.matchAll(/class="article-anchor" id="section-(\d+)"/g)].map((match) => +match[1]);
      assert.deepEqual(actual, article.toc.map((_, index) => index + 1));
    });
  }
}

test('unknown article IDs, including object prototype keys, are rejected', async () => {
  for (const slug of ['missing', 'constructor', 'toString', '__proto__']) {
    await assert.rejects(loadArticleHtml('ru', slug), /Unknown article/);
  }
});

test('unsupported language falls back to Russian', async () => {
  assert.equal(await loadArticleHtml('de', 'hardware'), await loadArticleHtml('ru', 'hardware'));
});

test('heading normalization and invalid entities are safe', () => {
  assert.equal(normalizeHeading('<strong>2. Масло &amp; фильтр!</strong>'), 'масло фильтр');
  assert.equal(decodeEntities('&#x110000;'), ' ');
});

test('anchors precede actual headings, not matching text inside a table', () => {
  const html = '<table><tr><td><p><strong>Масло</strong></p></td></tr></table><p><strong>Масло</strong></p>';
  assert.equal(buildArticleHtml(html, ['Масло']), html.replace('</table>', '</table><span class="article-anchor" id="section-1"></span>'));
});
