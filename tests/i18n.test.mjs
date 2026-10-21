import test from 'node:test';
import assert from 'node:assert/strict';

import { translations } from '../src/i18n/translations.js';
import { seoContent } from '../src/i18n/content/seo.js';

const LANGS = ['ru', 'en'];

// Собирает плоский список путей вида 'home.heroTitle' / 'knowledge.articles.0.title'.
function flatten(value, prefix = '', out = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flatten(item, `${prefix}.${index}`, out));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => flatten(item, prefix ? `${prefix}.${key}` : key, out));
  } else {
    out.push(prefix);
  }
  return out;
}

test('словари RU и EN содержат одинаковый набор ключей', () => {
  const ru = new Set(flatten(translations.ru));
  const en = new Set(flatten(translations.en));

  const missingInEn = [...ru].filter((key) => !en.has(key));
  const missingInRu = [...en].filter((key) => !ru.has(key));

  assert.deepEqual(missingInEn, [], 'ключи, которых нет в EN');
  assert.deepEqual(missingInRu, [], 'ключи, которых нет в RU');
});

// Необязательные подписи уровней: пустая строка = подпись не показывается.
const OPTIONAL_KEYS = [/^home\.levels\.items\.\d+\.(tag|fuelNote|powerPrefix)$/];

test('у каждого ключа непустой перевод на обоих языках', () => {
  const empty = [];
  for (const lang of LANGS) {
    for (const key of flatten(translations[lang])) {
      if (OPTIONAL_KEYS.some((pattern) => pattern.test(key))) continue;
      const value = key.split('.').reduce((acc, part) => acc?.[part], translations[lang]);
      if (typeof value === 'string' && value.trim() === '') empty.push(`${lang}:${key}`);
    }
  }

  assert.deepEqual(empty, [], 'пустые строки в словарях');
});

test('статьи базы знаний совпадают по слагам в RU и EN', () => {
  const slugs = LANGS.map((lang) =>
    (translations[lang].knowledge?.articles || []).map((article) => article.slug).sort()
  );

  assert.deepEqual(slugs[0], slugs[1]);
  assert.ok(slugs[0].length > 0, 'в словаре нет ни одной статьи');
});

test('у каждой статьи есть заголовок, лид, оглавление и HTML', () => {
  for (const lang of LANGS) {
    for (const article of translations[lang].knowledge.articles) {
      assert.ok(article.title?.trim(), `${lang}/${article.slug}: нет title`);
      assert.ok(article.summary?.trim(), `${lang}/${article.slug}: нет summary`);
      assert.ok(Array.isArray(article.toc) && article.toc.length > 0, `${lang}/${article.slug}: пустое toc`);
      assert.ok(article.html?.includes('<p'), `${lang}/${article.slug}: пустой html`);
    }
  }
});

test('SEO-словарь покрывает все основные маршруты на двух языках', () => {
  const routes = ['/', '/tuning', '/custom', '/knowledge', '/about', '/catalog'];

  for (const route of routes) {
    for (const lang of LANGS) {
      const meta = seoContent[lang]?.[route];
      assert.ok(meta, `${lang}: нет SEO для ${route}`);
      assert.ok(meta.title?.trim(), `${lang}/${route}: нет title`);
      assert.ok(meta.description?.trim(), `${lang}/${route}: нет description`);
    }
  }
});

test('в словаре нет дублирующихся ключей верхнего уровня', () => {
  // Дублирование ключа в объектном литерале молча перетирает предыдущий —
  // так однажды ломался раздел catalog.
  const shared = Object.keys(translations.ru).filter((key) => !(key in translations.en));

  assert.deepEqual(shared, []);
});
