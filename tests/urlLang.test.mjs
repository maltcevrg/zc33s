import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

// Хелперы языка работают с window напрямую, поэтому поднимаем jsdom до импорта модуля.
const dom = new JSDOM('', { url: 'https://example.com/zc33s/tuning' });
globalThis.window = dom.window;
globalThis.localStorage = dom.window.localStorage;

const { readUrlLang, syncUrlLang } = await import('../src/i18n/langUrl.js');

const setUrl = (url) => dom.window.history.replaceState({}, '', url);

test('?lang=en читается из адреса', () => {
  setUrl('/zc33s/tuning?lang=en');
  assert.equal(readUrlLang(), 'en');
});

test('без параметра язык не навязывается', () => {
  setUrl('/zc33s/tuning');
  assert.equal(readUrlLang(), null);
});

test('неподдерживаемый язык в адресе игнорируется', () => {
  setUrl('/zc33s/tuning?lang=de');
  assert.equal(readUrlLang(), null);
});

test('переключение на английский добавляет ?lang=en, не трогая путь и якорь', () => {
  setUrl('/zc33s/knowledge?module=02#section-3');
  syncUrlLang('en');

  assert.equal(dom.window.location.pathname, '/zc33s/knowledge');
  assert.equal(dom.window.location.search, '?module=02&lang=en');
  assert.equal(dom.window.location.hash, '#section-3');
});

test('русский — язык по умолчанию, параметр снимается', () => {
  setUrl('/zc33s/knowledge?module=02&lang=en');
  syncUrlLang('ru');

  assert.equal(dom.window.location.search, '?module=02');
});

test('повторный вызов не меняет адрес', () => {
  setUrl('/zc33s/about?lang=en');
  syncUrlLang('en');

  assert.equal(dom.window.location.search, '?lang=en');
});
