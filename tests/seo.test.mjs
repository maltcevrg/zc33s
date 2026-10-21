import test from 'node:test';
import assert from 'node:assert/strict';

import { getSeoForPath, localizedUrl, normalizePath, SITE_URL } from '../src/data/seo.js';

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

test('неизвестный маршрут отдаёт заголовок 404 на нужном языке', () => {
  const ru = getSeoForPath('/no-such-page', 'ru');
  const en = getSeoForPath('/no-such-page', 'en');

  assert.match(ru.title, /404/);
  assert.match(en.title, /404/);
  assert.notEqual(ru.title, en.title);
  assert.equal(ru.canonical, `${SITE_URL}/no-such-page`);
  assert.ok(ru.ogImage.endsWith('/images/main_page-1920.jpg'));
});

test('404 закрыта от индексации', () => {
  const meta = getSeoForPath('/no-such-page', 'ru');

  assert.equal(meta.isNotFound, true);
  assert.equal(meta.robots, 'noindex, follow');
  assert.match(meta.description, /Перейдите на главную|Такой страницы нет/);
});

test('известные страницы индексируются без noindex', () => {
  assert.equal(getSeoForPath('/tuning', 'ru').robots, null);
  assert.equal(getSeoForPath('/', 'en').isNotFound, undefined);
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
});

test('у каждой языковой версии свой canonical', () => {
  assert.equal(getSeoForPath('/about', 'ru').canonical, `${SITE_URL}/about`);
  assert.equal(getSeoForPath('/about', 'en').canonical, `${SITE_URL}/about?lang=en`);
});

test('hreflang-альтернативы указывают на оба языка и x-default', () => {
  const { alternates } = getSeoForPath('/tuning', 'en');

  assert.equal(alternates.ru, `${SITE_URL}/tuning`);
  assert.equal(alternates.en, `${SITE_URL}/tuning?lang=en`);
  assert.equal(alternates['x-default'], `${SITE_URL}/tuning`);
});

test('localizedUrl и normalizePath работают с base path', () => {
  assert.equal(localizedUrl('/', 'ru'), `${SITE_URL}/`);
  assert.equal(localizedUrl('/', 'en'), `${SITE_URL}/?lang=en`);
  assert.equal(localizedUrl('/catalog', 'en'), `${SITE_URL}/catalog?lang=en`);
  assert.equal(normalizePath('/zc33s/knowledge/'), '/knowledge');
  assert.equal(normalizePath('/zc33s'), '/');
});
