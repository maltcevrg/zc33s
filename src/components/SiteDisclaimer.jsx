import { useLanguage } from '../i18n/I18nContext';

/**
 * Юридический блок: показывает, что сайт — информационный каталог,
 * а не интерфейс автоматического заключения сделки.
 * Выводится в подвале, поэтому присутствует на всех страницах,
 * включая отдельный роут каталога деталей (/catalog).
 */
function SiteDisclaimer({ className = '' }) {
  const { t } = useLanguage();

  return (
    <div className={`site-disclaimer${className ? ` ${className}` : ''}`}>
      <p className="site-disclaimer__text">{t('siteConfig.catalogDisclaimer')}</p>
      <p className="site-disclaimer__text site-disclaimer__text--muted">{t('siteConfig.privacyNote')}</p>
    </div>
  );
}

export default SiteDisclaimer;
