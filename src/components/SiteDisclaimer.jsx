import { CATALOG_DISCLAIMER, PRIVACY_NOTE } from '../data/siteConfig';

/**
 * Юридический блок: показывает, что сайт — информационный каталог,
 * а не интерфейс автоматического заключения сделки.
 * Выводится в подвале, поэтому присутствует на всех страницах,
 * включая отдельный роут каталога деталей (/catalog).
 */
function SiteDisclaimer({ className = '' }) {
  return (
    <div className={`site-disclaimer${className ? ` ${className}` : ''}`}>
      <p className="site-disclaimer__text">{CATALOG_DISCLAIMER}</p>
      <p className="site-disclaimer__text site-disclaimer__text--muted">{PRIVACY_NOTE}</p>
    </div>
  );
}

export default SiteDisclaimer;
