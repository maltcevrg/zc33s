import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { translations } from './translations';

const STORAGE_KEY = 'sst_lang';
const SUPPORTED = ['ru', 'en'];

function getInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch {}
  // Попытка угадать по браузеру, fallback ru
  try {
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('en')) return 'en';
  } catch {}
  return 'ru';
}

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

const I18nContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => getInitialLang());

  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    try {
      document.documentElement.lang = next;
    } catch {}
  }, []);

  // Инициализация атрибута html lang и реакции на смену языка
  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {}
  }, [lang]);

  // Загрузка сохранённого языка при монтировании (для SSR-подобной гидратации)
  useEffect(() => {
    const current = getInitialLang();
    if (current !== lang) setLangState(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
