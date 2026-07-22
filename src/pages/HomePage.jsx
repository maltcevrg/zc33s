import { Link } from 'react-router-dom';

const heroBlock = {
  title: 'Swift Sport Tuning',
  subtitle:
    'Профессиональный тюнинг и обслуживание автомобилей Suzuki Swift. Сообщество энтузиастов, которые знают о Swift всё.',
};

const gridBlocks = [
  {
    img: './images/dyno.jpg',
    title: 'Прошивки',
    desc: 'Чип-тюнинг и оптимизация ECU. Увеличение мощности, улучшение отклика педали газа.',
    link: '/tuning',
  },
  {
    img: './images/turbo.jpg',
    title: 'Кастомный тюнинг',
    desc: 'Даунпайпы, выхлопные системы, зеркала, турбины и не только. Создайте уникальный образ своего автомобиля.',
    link: '/custom',
  },
  {
    img: './images/baza.jpg',
    title: 'База тюнинга',
    desc: 'Основы тюнинга Suzuki Swift: от теории до практики. Руководства, рекомендации, обзор запчастей и расходников.',
    link: '/tuning',
  },
  {
    img: 'https://a1.drive-data.ru/OkWO4q8q9Yy50z7kxj-mYOVghmA-1920.jpg',
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
          <h1 className="home__hero-title">{heroBlock.title}</h1>
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
                  src="/images/tatarstan.png"
                  alt=""
                  className="contact-card__flag"
                  aria-hidden="true"
                />
              )}
              {c.gunrace && (
                <div className="contact-card__bg-img">
                  <img src="/images/gunrace.jpg" alt="" aria-hidden="true" />
                </div>
              )}
              {c.olego && (
                <div className="contact-card__bg-img">
                  <img src="/images/olego.jpg" alt="" aria-hidden="true" />
                </div>
              )}
              <span className="contact-card__icon">
                <img src="/images/telegram.svg?v=2" alt="" className="contact-card__tg-icon" />
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
