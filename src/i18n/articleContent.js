// Явная карта импортов: Vite собирает отдельный chunk для каждого текста.
const loaders = {
  ru: {
    'zc33s-faq': () => import('../data/faqShort.js'),
    'ecu-flashing': () => import('../data/faqSelfFlashing.js'),
    'tuning-stages': () => import('../data/faqFlashGuides.js'),
    'buying-zc33s': () => import('../data/faqBuyGuide.js'),
    diagnostics: () => import('./articles/ru/diagnostics.js'),
    hardware: () => import('./articles/ru/hardware.js'),
  },
  en: {
    'zc33s-faq': () => import('./articles/en/zc33s-faq.js'),
    'ecu-flashing': () => import('./articles/en/ecu-flashing.js'),
    'tuning-stages': () => import('./articles/en/tuning-stages.js'),
    'buying-zc33s': () => import('./articles/en/buying-zc33s.js'),
    diagnostics: () => import('./articles/en/diagnostics.js'),
    hardware: () => import('./articles/en/hardware.js'),
  },
};

export async function loadArticleHtml(lang, slug) {
  const dictionary = Object.hasOwn(loaders, lang) ? loaders[lang] : loaders.ru;
  if (!Object.hasOwn(dictionary, slug)) throw new Error(`Unknown article: ${slug}`);
  const module = await dictionary[slug]();
  return module.default;
}
