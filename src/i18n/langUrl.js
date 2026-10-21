// Язык в адресе страницы: ?lang=en.
//
// Отдельный модуль без React — чтобы правила «откуда брать язык» и «как его
// записать в адрес» можно было проверить обычными тестами (см.
// tests/urlLang.test.mjs), не поднимая провайдер контекста.
export const SUPPORTED_LANGS = ['ru', 'en'];
export const DEFAULT_LANG = 'ru';
export const LANG_PARAM = 'lang';

/**
 * Язык из query-параметра или null, если параметра нет либо он не поддерживается.
 * @returns {'ru' | 'en' | null}
 */
export function readUrlLang() {
  try {
    const value = new URLSearchParams(window.location.search).get(LANG_PARAM);
    return SUPPORTED_LANGS.includes(value) ? value : null;
  } catch {
    return null;
  }
}

/**
 * Записывает язык в адрес через replaceState: переключение языка не должно
 * добавлять записи в историю браузера. Русский — язык по умолчанию, для него
 * адрес остаётся чистым; остальные параметры и якорь сохраняются.
 *
 * @param {'ru' | 'en'} lang
 */
export function syncUrlLang(lang) {
  try {
    const url = new URL(window.location.href);
    const current = url.searchParams.get(LANG_PARAM);
    const next = lang === DEFAULT_LANG ? null : lang;
    if (current === next) return;

    if (next === null) {
      url.searchParams.delete(LANG_PARAM);
    } else {
      url.searchParams.set(LANG_PARAM, next);
    }

    window.history.replaceState(window.history.state, '', url);
  } catch {}
}
