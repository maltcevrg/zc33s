import test from 'node:test';
import assert from 'node:assert/strict';

import { getSeoForPath, SITE_URL } from '../src/data/seo.js';

test('getSeoForPath возвращает метаданные известного маршрута', () => {
  const meta = getSeoForPath('/tuning', 'ru');

  assert.match(meta.title, /Прошивки/);
  assert.ok(meta.description.length > 20);
  assert.equal(meta.canonical, `${SITE_URL}/tuning`);
});

test('завершающий слэш и префикс /zc33s нормализуются', () => {
  const plain = getSeoForPath('/knowledge', 'ru');

  assert.deepEqual(getSeoForPath('/knowledge/', 'ru'), plain);
  assert.deepEqual(getSeoForPath('/zc33s/knowledge', 'ru'), plain);
  assert.deepEqual(getSeoForPath('/zc33s/knowledge/', 'ru'), plain);
});

test('корень сайта отдаётся по адресу «/»', () => {
  assert.equal(getSeoForPath('/', 'ru').canonical, `${SITE_URL}/`);
  assert.equal(getSeoForPath('', 'ru').canonical, `${SITE_URL}/`);
  assert.equal(getSeoForPath('/zc33s', 'ru').canonical, `${SITE_URL}/`);
});

test('неизвестный маршрут получает фолбэк на нужном языке', () => {
  const ru = getSeoForPath('/no-such-page', 'ru');
  const en = getSeoForPath('/no-such-page', 'en');

  assert.match(ru.title, /Suzuki Swift Sport ZC33S/);
  assert.match(en.title, /Tuning/);
  assert.notEqual(ru.title, en.title);
  assert.equal(ru.canonical, `${SITE_URL}/no-such-page`);
  assert.ok(ru.ogImage.endsWith('/images/main_page-1920.jpg'));
});

test('неизвестный язык не ломает функцию', () => {
  const meta = getSeoForPath('/tuning', 'de');

  assert.ok(meta.title);
  assert.equal(meta.canonical, `${SITE_URL}/tuning`);
});

test('английская версия маршрута отличается от русской', () => {
  const ru = getSeoForPath('/about', 'ru');
  const en = getSeoForPath('/about', 'en');

  assert.notEqual(ru.title, en.title);
  assert.equal(ru.canonical, en.canonical, 'canonical не должен зависеть от языка');
});
