import { Link } from 'react-router-dom';
import { TELEGRAM_URL } from '../data/siteConfig';

function Footer() {
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
            <p className="footer__brand-desc">
              Независимый проект, посвящённый Suzuki Swift Sport ZC33S.
            </p>
          </div>

          {/* Колонка 2: Разделы */}
          <div className="footer__col">
            <h3 className="footer__heading">Разделы</h3>
            <ul className="footer__list">
              <li>
                <Link to="/tuning" className="footer__link">
                  Прошивки
                </Link>
              </li>
              <li>
                <Link to="/custom" className="footer__link">
                  Компоненты
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="footer__link">
                  База знаний
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer__link">
                  О проекте
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Информация */}
          <div className="footer__col">
            <h3 className="footer__heading">Информация</h3>
            <ul className="footer__list">
              <li>
                <Link to="/purchase" className="footer__link">
                  Условия приобретения
                </Link>
              </li>
              <li>
                <Link to="/purchase#payment-delivery" className="footer__link">
                  Оплата и доставка
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="footer__link">
                  Гарантия и обращения
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Правовая информация и Контакты */}
          <div className="footer__col">
            <div className="footer__group">
              <h3 className="footer__heading">Правовая информация</h3>
              <ul className="footer__list">
                <li>
                  <Link to="/privacy" className="footer__link">
                    Политика обработки персональных данных
                  </Link>
                </li>
                <li>
                  <Link to="/legal" className="footer__link">
                    Правовая информация
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer__group footer__group--contacts">
              <h3 className="footer__heading">Контакты</h3>
              <ul className="footer__list">
                <li>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__link footer__link--contact"
                  >
                    <span className="footer__contact-icon">↗</span>
                    <span>Telegram-канал</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Нижняя строка: дисклеймер и копирайт */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {currentYear} Swift Sport Tuning. Все права защищены.
          </p>
          <p className="footer__disclaimer">
            Сайт является информационным каталогом. Размещённая информация не является публичной офертой.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
