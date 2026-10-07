import { Link } from 'react-router-dom';

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

const gridBlocks = [
  {
    img: imageUrl('dyno-1280.jpg'),
    title: 'Прошивки',
    desc: 'Чип-тюнинг и оптимизация ECU. Увеличение мощности, улучшение отклика педали газа.',
    link: '/tuning',
  },
  {
    img: imageUrl('turbo-960.jpg'),
    title: 'Кастомный тюнинг',
    desc: 'Даунпайпы, выхлопные системы, зеркала, турбины и не только. Создайте уникальный образ своего автомобиля.',
    link: '/custom',
  },
  {
    img: imageUrl('baza-1280.jpg'),
    title: 'База тюнинга',
    desc: 'Основы тюнинга Suzuki Swift: от теории до практики. Руководства, рекомендации, обзор запчастей и расходников.',
    link: '/tuning',
  },
  {
    img: imageUrl('service-1280.jpg'),
    title: 'Обслуживание',
    desc: 'Профессиональное обслуживание Suzuki Swift: диагностика, ремонт, замена расходников и подготовка к тюнингу.',
    link: '/service',
  },
];

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
      <section className="home__hero">
        <div className="home__hero-body">
          <h1 className="home__hero-title">
            <span className="home__hero-title-main">{heroBlock.title}</span>
          </h1>
          <span className="home__hero-accent" aria-hidden="true">
            {heroBlock.accent}
          </span>
          <p className="home__hero-subtitle">{heroBlock.subtitle}</p>
        </div>
      </section>

      {/* ===== Grid 2×2 ===== */}
      <section className="home__grid">
        {gridBlocks.map((block, i) => (
          <Link key={i} to={block.link} className="home__card">
            <div className="home__card-image">
              <img src={block.img} alt={block.title} loading="lazy" />
            </div>
            <div className="home__card-overlay home__card-overlay--dark" />
            <div className="home__card-body">
              <h2 className="home__card-title">{block.title}</h2>
              <p className="home__card-desc">{block.desc}</p>
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
