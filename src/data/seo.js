// Единый реестр метаданных для поисковой оптимизации (SEO) и Open Graph.
// Используется как при динамической смене страниц в React SPA,
// так и при генерации статических HTML-оболочек при сборке.
//
// Язык живёт в query-параметре (?lang=en), поэтому здесь же считаются
// языковые адреса: canonical и hreflang-альтернативы.

import { seoContent } from '../i18n/content/seo.js';

export const SITE_URL = 'https://maltcevrg.github.io/zc33s';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/main_page-1920.jpg`;
export const DEFAULT_LANG = 'ru';
export const SUPPORTED_LANGS = ['ru', 'en'];

export const SEO_DATA = seoContent.ru;

const FALLBACK = {
  ru: {
    title: 'Suzuki Swift Sport ZC33S — тюнинг, прошивки и компоненты | SST',
    description:
      'Прошивки, турбины, интеркулеры, сцепление и техническая база по Suzuki Swift Sport ZC33S. Stage 1, Stage 2, GR30 и GR39.',
  },
  en: {
    title: 'Suzuki Swift Sport ZC33S — Tuning, ECU Tunes & Components | SST',
    description:
      'ECU tunes, turbochargers, intercoolers, clutch and technical knowledge base for Suzuki Swift Sport ZC33S. Stage 1, Stage 2, GR30 and GR39.',
  },
};

/** Нормализует путь: убирает завершающий слэш и префикс base path. */
export function normalizePath(pathname = '') {
  let clean = pathname.replace(/\/$/, '') || '/';
  if (clean.startsWith('/zc33s')) {
    clean = clean.slice('/zc33s'.length) || '/';
  }
  return clean;
}

/**
 * Языковой адрес страницы: русская версия — чистый путь, английская — ?lang=en.
 * Английский адрес отличается от русского, иначе поисковик считал бы это
 * дублем и не показывал бы EN-версию отдельно.
 */
export function localizedUrl(cleanPath, lang) {
  const url = `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath}`;
  if (lang === DEFAULT_LANG || !SUPPORTED_LANGS.includes(lang)) return url;
  return `${url}?lang=${lang}`;
}

function buildAlternates(cleanPath) {
  return {
    ru: localizedUrl(cleanPath, 'ru'),
    en: localizedUrl(cleanPath, 'en'),
    'x-default': localizedUrl(cleanPath, DEFAULT_LANG),
  };
}

/**
 * Метаданные маршрута: заголовок, описание, canonical, OG и языковые альтернативы.
 * Для неизвестного пути возвращает страницу 404 с noindex, а не заголовок главной.
 */
export function getSeoForPath(pathname, lang = DEFAULT_LANG) {
  const clean = normalizePath(pathname);
  const dictionary = seoContent[lang] || seoContent.ru;
  const found = dictionary[clean];

  if (found) {
    return {
      ...found,
      canonical: localizedUrl(clean, lang),
      alternates: buildAlternates(clean),
      robots: null,
    };
  }

  const notFound = dictionary['/404'] || seoContent.ru['/404'];
  const fallback = FALLBACK[lang] || FALLBACK.ru;

  return {
    ...notFound,
    title: notFound?.title || fallback.title,
    description: notFound?.description || fallback.description,
    canonical: localizedUrl(clean, lang),
    alternates: buildAlternates(clean),
    // Страница-ошибка не должна попадать в индекс, но ссылки с неё обходить можно.
    robots: 'noindex, follow',
    isNotFound: true,
  };
}

function upsertTag(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([name, value]) => el.setAttribute(name, value));
  return el;
}

function removeTag(selector) {
  document.head.querySelector(selector)?.remove();
}

function setMetaTag(attrName, attrValue, content) {
  if (!content) {
    removeTag(`meta[${attrName}="${attrValue}"]`);
    return;
  }
  upsertTag(`meta[${attrName}="${attrValue}"]`, 'meta', { [attrName]: attrValue, content });
}

function setLinkTag(rel, href) {
  if (!href) {
    removeTag(`link[rel="${rel}"]`);
    return;
  }
  upsertTag(`link[rel="${rel}"]`, 'link', { rel, href });
}

/**
 * Обновляет document.head под переданные метаданные.
 * Теги, которых больше не должно быть (robots, hreflang), снимаются —
 * иначе при переходе с 404 на обычную страницу остался бы noindex.
 */
export function updateDocumentSeo(meta) {
  if (typeof document === 'undefined') return;

  if (meta.title) {
    document.title = meta.title;
  }

  setMetaTag('name', 'description', meta.description);
  setMetaTag('name', 'robots', meta.robots || null);
  setLinkTag('canonical', meta.canonical);

  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:site_name', 'Swift Sport Tuning');
  setMetaTag('property', 'og:title', meta.ogTitle || meta.title);
  setMetaTag('property', 'og:description', meta.ogDescription || meta.description);
  setMetaTag('property', 'og:image', meta.ogImage || DEFAULT_OG_IMAGE);
  setMetaTag('property', 'og:url', meta.canonical);

  // Twitter cards fallback
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', meta.ogTitle || meta.title);
  setMetaTag('name', 'twitter:description', meta.ogDescription || meta.description);
  setMetaTag('name', 'twitter:image', meta.ogImage || DEFAULT_OG_IMAGE);

  // Языковые альтернативы для поисковиков: ru / en / x-default.
  const alternates = meta.alternates || {};
  SUPPORTED_LANGS.forEach((code) =>
    upsertTag(`link[rel="alternate"][hreflang="${code}"]`, 'link', {
      rel: 'alternate',
      hreflang: code,
      href: alternates[code] || '',
    })
  );
  upsertTag('link[rel="alternate"][hreflang="x-default"]', 'link', {
    rel: 'alternate',
    hreflang: 'x-default',
    href: alternates['x-default'] || alternates[DEFAULT_LANG] || '',
  });
}
