import { useLanguage } from '../i18n/I18nContext';

function LanguageSwitcher({ variant = 'default' }) {
  const { lang, setLang, t } = useLanguage();

  const isRu = lang === 'ru';
  const isEn = lang === 'en';

  return (
    <div
      className={`lang-switcher${variant === 'mobile' ? ' lang-switcher--mobile' : ''}${variant === 'desktop' ? ' lang-switcher--desktop' : ''}`}
      role="group"
      aria-label={t('language.aria')}
    >
      <button
        type="button"
        className={`lang-switcher__btn${isRu ? ' lang-switcher__btn--active' : ''}`}
        onClick={() => setLang('ru')}
        aria-pressed={isRu}
        aria-label={t('language.switchToRu')}
        title="Русский"
      >
        {t('language.ru')}
      </button>
      <span className="lang-switcher__divider" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        className={`lang-switcher__btn${isEn ? ' lang-switcher__btn--active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={isEn}
        aria-label={t('language.switchToEn')}
        title="English"
      >
        {t('language.en')}
      </button>
    </div>
  );
}

export default LanguageSwitcher;
