import { Link } from 'react-router-dom';
import SiteDisclaimer from './SiteDisclaimer';
import TelegramCta from './TelegramCta';
import { PURCHASE_PATH, WARRANTY_PATH } from '../data/siteConfig';
import { PURCHASE_TITLE } from '../data/purchase';
import { WARRANTY_TITLE } from '../data/warranty';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Юридическая модель: видна на каждой странице сайта. */}
        <SiteDisclaimer />

        {/* Служебные разделы сайта */}
        <nav className="footer__links" aria-label="Служебные разделы">
          <Link className="footer__link" to="/about">О проекте</Link>
          <Link className="footer__link" to="/knowledge">База знаний</Link>
          <Link className="footer__link" to={PURCHASE_PATH}>{PURCHASE_TITLE}</Link>
          <Link className="footer__link" to={WARRANTY_PATH}>{WARRANTY_TITLE}</Link>
        </nav>

        <div className="footer__bottom">
          <p className="footer__copy">&copy; {new Date().getFullYear()} Swift Sport Tuning</p>
          <TelegramCta tone="ghost" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
