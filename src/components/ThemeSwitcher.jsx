import { useLanguage } from '../i18n/I18nContext';
import { useTheme } from '../theme/ThemeContext';

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.4v2.2M12 19.4v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.4 12h2.2M19.4 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </svg>
  );
}

// Кнопка-переключатель светлой и тёмной темы. Повторяет логику LanguageSwitcher:
// на десктопе — компактная круглая кнопка в шапке, в мобильном дровере — пилюля с подписью.
function ThemeSwitcher({ variant = 'desktop' }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const isDark = theme === 'dark';
  const label = isDark ? t('theme.switchToLight') : t('theme.switchToDark');
  const caption = isDark ? t('theme.light') : t('theme.dark');

  return (
    <button
      type="button"
      className={`theme-switcher theme-switcher--${variant}`}
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={label}
      title={label}
    >
      <span className="theme-switcher__icon" aria-hidden="true">
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
      {variant === 'mobile' && <span className="theme-switcher__label">{caption}</span>}
    </button>
  );
}

export default ThemeSwitcher;
