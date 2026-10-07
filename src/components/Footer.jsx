import SiteDisclaimer from './SiteDisclaimer';
import TelegramCta from './TelegramCta';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Юридическая модель: видна на каждой странице сайта. */}
        <SiteDisclaimer />

        <div className="footer__bottom">
          <p className="footer__copy">&copy; {new Date().getFullYear()} Swift Sport Tuning</p>
          <TelegramCta tone="ghost" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
