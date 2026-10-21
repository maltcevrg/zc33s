import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { translations } from './translations';
import { DEFAULT_LANG, SUPPORTED_LANGS, readUrlLang, syncUrlLang } from './langUrl';

const STORAGE_KEY = 'sst_lang';

function getInitialLang() {
  // Приоритет: явный ?lang= в адресе → выбор пользователя → язык браузера → ru.
  const fromUrl = readUrlLang();
  if (fromUrl) return fromUrl;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  } catch {}
  try {
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('en')) return 'en';
  } catch {}
  return DEFAULT_LANG;
}

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

const I18nContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = useCallback((next) => {
    if (!SUPPORTED_LANGS.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    syncUrlLang(next);
  }, []);

  // Атрибут html lang, запоминание языка и адрес страницы всегда соответствуют
  // текущему состоянию — в том числе когда язык пришёл из ?lang=.
  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {}
    syncUrlLang(lang);
  }, [lang]);

  // Навигация «назад/вперёд» по ссылкам с разным ?lang= не перезагружает
  // страницу, поэтому язык берём из адреса вручную.
  useEffect(() => {
    const onPopState = () => {
      const fromUrl = readUrlLang() || 'ru';
      setLangState((prev) => (prev === fromUrl ? prev : fromUrl));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const t = useCallback(
    (key, fallback) => {
      const val = getNested(translations[lang], key);
      if (val !== undefined) return val;
      const ruVal = getNested(translations.ru, key);
      if (ruVal !== undefined) return ruVal;
      return fallback !== undefined ? fallback : key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t, translations }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export function useTranslation() {
  return useLanguage();
}
