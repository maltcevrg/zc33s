import { Link } from 'react-router-dom';
import TelegramCta from '../components/TelegramCta';
import TuningLevels from '../components/TuningLevels';
import { PRICE_NOTE } from '../data/siteConfig';
import { visibleHomeSections } from '../data/siteSections';

const imageUrl = (name) => `${import.meta.env.BASE_URL}images/${name}`;

// Позиционирование одно и конкретное: прошивки, конфигурации и компоненты под ZC33S.
// Формулировку «профессиональный сервис + сообщество энтузиастов» не используем —
// она смешивает две разные роли и размывает позиционирование.
const heroBlock = {
  title: 'SUZUKI SWIFT SPORT ZC33S',
  // Вторая, декоративная строка заголовка: смысловой нагрузки не несёт,
  // поэтому скрыта от скринридеров и поисковиков — H1 остаётся чистым.
  accent: 'Tuning',
  subtitle:
    'Прошивки, проверенные конфигурации и компоненты для Suzuki Swift Sport ZC33S. Практическая база по настройке, обслуживанию и эксплуатации автомобиля.',
};

const contacts = [
  {
    label: 'Всероссийский чат',
    flag: 'tatarstan',
    link: 'https://t.me/ZC33Sru',
  },
  {
    label: 'Чат по тюнингу',
    link: 'https://t.me/+1hplL5z7qHo4Nzdi',
  },
];

function HomePage() {
  return (
    <div className="home">
      {/* ===== Hero ===== */}
      <section
        className="home__hero"
        style={{
          '--hero-bg-webp': `url('${imageUrl('main_page-1920.webp')}')`,
          '--hero-bg-jpg': `url('${imageUrl('main_page-1920.jpg')}')`,
        }}
      >
        <div className="home__hero-body">
          <h1 className="home__hero-title">
            <span className="home__hero-title-main">{heroBlock.title}</span>
          </h1>
          <span className="home__hero-accent" aria-hidden="true">
            {heroBlock.accent}
          </span>
          <p className="home__hero-subtitle">{heroBlock.subtitle}</p>

          {/* Основной CTA: переход в официальный Telegram-контакт проекта.
              Рядом — короткое напоминание, что сайт не оформляет заказы. */}
          <TelegramCta
            className="home__hero-cta"
            tone="light"
            inline
            note={`${PRICE_NOTE} Оформление заказа на сайте не осуществляется.`}
          />
        </div>
      </section>

      {/* ===== Уровни тюнинга ===== */}
      <TuningLevels />

      {/* ===== Главные разделы =====
          Крупные изображения и карточная композиция сохраняются.
          Нечётное число разделов (пока «Обслуживание» не наполнено) даёт класс
          home__grid--odd: первая карточка занимает всю ширину, пустой ячейки нет. */}
      <section
        className={`home__grid${visibleHomeSections.length % 2 ? ' home__grid--odd' : ''}`}
      >
        {visibleHomeSections.map((section) => (
          <Link key={section.id} to={section.link} className="home__card">
            <div className="home__card-image">
              <picture>
                <source
                  type="image/webp"
                  srcSet={imageUrl(section.img.replace(/\.jpg$/, '.webp'))}
                />
                <img
                  src={imageUrl(section.img)}
                  alt={`Иллюстрация раздела: ${section.title}`}
                  loading="lazy"
                  width="1280"
                  height="720"
                />
              </picture>
            </div>
            <div className="home__card-overlay home__card-overlay--dark" />
            <div className="home__card-body">
              <h2 className="home__card-title">{section.title}</h2>
              <p className="home__card-desc">{section.desc}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* ===== Контакты ===== */}
      <section className="home__contacts">
        <h2 className="home__contacts-title">Контакты</h2>
        <div className="home__contacts-grid">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-card${c.flag ? ` contact-card--${c.flag}` : ''}${c.gunrace ? ' contact-card--gunrace' : ''}${c.olego ? ' contact-card--olego' : ''}`}
            >
              {c.flag === 'tatarstan' && (
                <img
                  src={imageUrl('tatarstan.png')}
                  alt=""
                  className="contact-card__flag"
                  aria-hidden="true"
                />
              )}
              {c.gunrace && (
                <div className="contact-card__bg-img">
                  <img src={imageUrl('gunrace.jpg')} alt="" aria-hidden="true" loading="lazy" />
                </div>
              )}
              {c.olego && (
                <div className="contact-card__bg-img">
                  <img src={imageUrl('olego.jpg')} alt="" aria-hidden="true" loading="lazy" />
                </div>
              )}
              <span className="contact-card__icon">
                <img src={`${imageUrl('telegram.svg')}?v=2`} alt="" className="contact-card__tg-icon" />
              </span>
              {c.label && <span className="contact-card__label">{c.label}</span>}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
