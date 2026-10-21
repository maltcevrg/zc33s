import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

import { createSanitizer, SANITIZE_CONFIG } from '../src/utils/sanitizeHtml.js';

const { window } = new JSDOM('');
const sanitize = createSanitizer(window);

test('<script> вырезается из контента статьи', () => {
  const dirty = '<p>Текст</p><script>alert(document.cookie)</script>';
  const clean = sanitize(dirty);

  assert.ok(clean.includes('<p>Текст</p>'));
  assert.ok(!clean.toLowerCase().includes('<script'));
  assert.ok(!clean.includes('alert'));
});

test('инлайн-обработчики событий удаляются', () => {
  const clean = sanitize('<p onclick="steal()" onmouseover="steal()">Текст</p>');

  assert.equal(clean.includes('onclick'), false);
  assert.equal(clean.includes('onmouseover'), false);
});

test('javascript: в ссылке отбрасывается', () => {
  const clean = sanitize('<a href="javascript:alert(1)">клик</a>');

  assert.equal(clean.includes('javascript:'), false);
});

test('iframe, object и form не проходят', () => {
  const clean = sanitize('<iframe src="https://evil"></iframe><object></object><form></form>');

  for (const tag of ['<iframe', '<object', '<form']) {
    assert.equal(clean.includes(tag), false, `${tag} должен быть вырезан`);
  }
});

test('безопасная разметка статьи сохраняется целиком', () => {
  const article = [
    '<p><strong>1. AFR</strong> — соотношение воздух/топливо</p>',
    '<ul><li>пункт</li></ul>',
    '<table><thead><tr><th>Параметр</th></tr></thead><tbody><tr><td>AFR</td></tr></tbody></table>',
    '<a href="https://example.com">источник</a>',
    '<span id="section-1"></span>',
  ].join('');

  const clean = sanitize(article);

  assert.ok(clean.includes('<strong>1. AFR</strong>'));
  assert.ok(clean.includes('<li>пункт</li>'));
  assert.ok(clean.includes('<th>Параметр</th>'));
  assert.ok(clean.includes('href="https://example.com"'));
  // Якоря оглавления обязаны выжить — иначе перестанет работать навигация по статье.
  assert.ok(clean.includes('id="section-1"'));
});

test('пустой вход даёт пустую строку', () => {
  assert.equal(sanitize(''), '');
  assert.equal(sanitize(null), '');
  assert.equal(sanitize(undefined), '');
});

test('inline style не разрешён — оформление задаётся только CSS сайта', () => {
  const clean = sanitize('<p style="position:fixed;top:0">Текст</p>');

  assert.equal(clean.includes('style='), false);
  assert.ok(clean.includes('Текст'));
});

test('конфиг запрещает исполняемые теги явно', () => {
  for (const tag of ['script', 'iframe', 'object', 'embed', 'form']) {
    assert.ok(SANITIZE_CONFIG.FORBID_TAGS.includes(tag), `${tag} должен быть в FORBID_TAGS`);
  }
});
