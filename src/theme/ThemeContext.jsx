import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Тема хранится только на клиенте: класс на <html> + ключ в localStorage.
// Начальное значение выставляет инлайн-скрипт в index.html, чтобы не было
// вспышки светлой темы до гидрации.
const STORAGE_KEY = 'sst_theme';
const THEMES = ['light', 'dark'];

const ThemeContext = createContext(null);

function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  try {
    const root = document.documentElement;
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
  } catch {}
}

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && THEMES.includes(stored)) return stored;
  } catch {}
  try {
    if (document.documentElement.getAttribute('data-theme') === 'dark') return 'dark';
  } catch {}
  return 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  const setTheme = useCallback((next) => {
    if (!THEMES.includes(next)) return;
    setThemeState(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Синхронизация с инлайн-скриптом в index.html после монтирования.
  useEffect(() => {
    const initial = getInitialTheme();
    if (initial !== theme) setThemeState(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
