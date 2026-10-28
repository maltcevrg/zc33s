import { Link } from 'react-router-dom';
import { CONSULTATIONS_PATH, TELEGRAM_URL } from '../data/siteConfig';
import { useLanguage } from '../i18n/I18nContext';

function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Колонка 1: Бренд и суть проекта */}
          <div className="footer__col footer__col--brand">
            <Link to="/" className="footer__brand" aria-label="Swift Sport Tuning">
              <span className="footer__brand-badge">SST</span>
              <span className="footer__brand-title">Swift Sport Tuning</span>
            </Link>
            <p className="footer__brand-desc">{t('footer.brandDesc')}</p>
          </div>

          {/* Колонка 2: Разделы */}
          <div className="footer__col">
            <h3 className="footer__heading">{t('footer.sections')}</h3>
            <ul className="footer__list">
              <li>
                <Link to="/tuning" className="footer__link">
                  {t('nav.tuning')}
                </Link>
              </li>
              <li>
                <Link to="/custom" className="footer__link">
                  {t('nav.components')}
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="footer__link">
                  {t('nav.knowledge')}
                </Link>
              </li>
              <li>
                <Link to="/manual/" className="footer__link">
                  {t('manual.title')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer__link">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Информация */}
          <div className="footer__col">
            <h3 className="footer__heading">{t('footer.info')}</h3>
            <ul className="footer__list">
              <li>
                <Link to={CONSULTATIONS_PATH} className="footer__link">
                  {t('footer.consultations')}
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="footer__link">
                  {t('footer.warranty')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Правовая информация и Контакты */}
          <div className="footer__col">
            <div className="footer__group">
              <h3 className="footer__heading">{t('footer.legalHeading')}</h3>
              <ul className="footer__list">
                <li>
                  <Link to="/privacy" className="footer__link">
                    {t('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link to="/legal" className="footer__link">
                    {t('footer.legalInfo')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer__group footer__group--contacts">
              <h3 className="footer__heading">{t('footer.contacts')}</h3>
              <ul className="footer__list">
                <li>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__link footer__link--contact"
                  >
                    <span className="footer__contact-icon">↗</span>
                    <span>{t('footer.telegram')}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Нижняя строка: дисклеймер и копирайт */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {currentYear} {t('footer.copyright')}
          </p>
          <p className="footer__disclaimer">{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
