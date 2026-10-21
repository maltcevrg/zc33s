// Единый реестр метаданных для поисковой оптимизации (SEO) и Open Graph.
// Используется как при динамической смене страниц в React SPA,
// так и при генерации статических HTML-оболочек при сборке.

import { seoContent } from '../i18n/content/seo.js';

export const SITE_URL = 'https://maltcevrg.github.io/zc33s';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/main_page-1920.jpg`;

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

export function getSeoForPath(pathname, lang = 'ru') {
  // Нормализуем путь: убираем завершающий слэш, если он не корневой
  let clean = pathname.replace(/\/$/, '') || '/';
  // Если зашли по префиксу /zc33s (base path)
  if (clean.startsWith('/zc33s')) {
    clean = clean.slice('/zc33s'.length) || '/';
  }

  const dictionary = seoContent[lang] || seoContent.ru;
  const found = dictionary[clean];
  if (found) return found;

  const fallback = FALLBACK[lang] || FALLBACK.ru;
  return {
    title: fallback.title,
    description: fallback.description,
    canonical: `${SITE_URL}${clean === '/' ? '/' : clean}`,
    ogTitle: fallback.title,
    ogDescription: fallback.description,
    ogImage: DEFAULT_OG_IMAGE,
  };
}

export function updateDocumentSeo(meta) {
  if (typeof document === 'undefined') return;

  if (meta.title) {
    document.title = meta.title;
  }

  const setMetaTag = (attrName, attrValue, content) => {
    if (!content) return;
    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const setLinkTag = (rel, href) => {
    if (!href) return;
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  setMetaTag('name', 'description', meta.description);
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
}
