// Ленивая загрузка HTML статей базы знаний.
//
// Тексты статей — самая тяжёлая часть бандла (десятки килобайт на статью),
// а нужны они только тому, кто статью открыл. Поэтому словарь интерфейса
// хранит лишь метаданные (title, summary, meta), а HTML и оглавление лежат
// в отдельных модулях и подтягиваются динамическим import().
const modules = import.meta.glob('./{ru,en}/*.js');

/**
 * Загружает HTML и оглавление статьи.
 * Если для языка статьи нет, отдаёт русскую версию (как и остальные тексты сайта).
 *
 * @param {string} lang — 'ru' | 'en'
 * @param {string} slug — идентификатор статьи
 * @returns {Promise<{ toc: string[], html: string } | null>}
 */
export function loadArticleContent(lang, slug) {
  const candidate = modules[`./${lang}/${slug}.js`] || modules[`./ru/${slug}.js`];
  if (!candidate) return Promise.resolve(null);
  return candidate().then((module) => ({
    toc: module.toc || [],
    html: module.html || '',
  }));
}

/**
 * Синхронный список доступных статей — нужен сборке (генерация оболочек
 * index.html для GitHub Pages) и проверкам.
 */
export const ARTICLE_CONTENT_PATHS = Object.keys(modules).map((path) =>
  path.replace('./', '').replace(/\.js$/, '')
);
