import { Link } from 'react-router-dom';
import TelegramCta from '../components/TelegramCta';
import TuningLevels from '../components/TuningLevels';
import { useLanguage } from '../i18n/I18nContext';

const imageUrl = (name) => `${import.meta.env.BASE_URL}images/${name}`;

// Маппинг id разделов → ключам перевода
const SECTION_I18N_KEY = {
  tuning: 'home.sections.tuning',
  components: 'home.sections.components',
  knowledge: 'home.sections.knowledge',
  about: 'home.sections.about',
  service: 'home.sections.service',
};

function HomePage() {
  const { t } = useLanguage();

  const heroBlock = {
    title: t('home.heroTitle'),
    accent: t('home.heroAccent'),
    subtitle: t('home.heroSubtitle'),
  };

  const visibleHomeSections = [
    { id: 'tuning', img: 'dyno-1280.jpg', link: '/tuning' },
    { id: 'components', img: 'turbo-960.jpg', link: '/custom' },
    { id: 'knowledge', img: 'baza-1280.jpg', link: '/knowledge' },
    { id: 'about', img: 'gunrace.jpg', link: '/about' },
    { id: 'service', img: 'service-1280.jpg', link: '/service' },
  ].filter((section) => {
    // Показываем только наполненные разделы: service пока выключен
    if (section.id === 'service') return false;
    return true;
  });

  const contacts = [
    {
      label: t('home.contacts.allRussia'),
      flag: 'tatarstan',
      link: 'https://t.me/ZC33Sru',
    },
    {
      label: t('home.contacts.tuning'),
      link: 'https://t.me/+1hplL5z7qHo4Nzdi',
    },
  ];

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

          {/* Основной CTA ведёт на консультацию в официальном Telegram-контакте. */}
          <TelegramCta className="home__hero-cta" tone="light" inline note={t('home.heroCtaNoteLong')} />
        </div>
      </section>

      {/* ===== Уровни тюнинга ===== */}
      <TuningLevels />

      {/* ===== Главные разделы ===== */}
      <section className={`home__grid${visibleHomeSections.length % 2 ? ' home__grid--odd' : ''}`}>
        {visibleHomeSections.map((section) => {
          const title = t(`${SECTION_I18N_KEY[section.id]}.title`);
          const desc = t(`${SECTION_I18N_KEY[section.id]}.desc`);
          return (
            <Link key={section.id} to={section.link} className="home__card">
              <div className="home__card-image">
                <picture>
                  <source type="image/webp" srcSet={imageUrl(section.img.replace(/\.jpg$/, '.webp'))} />
                  <img
                    src={imageUrl(section.img)}
                    alt={`Illustration: ${title}`}
                    loading="lazy"
                    width="1280"
                    height="720"
                  />
                </picture>
              </div>
              <div className="home__card-overlay home__card-overlay--dark" />
              <div className="home__card-body">
                <h2 className="home__card-title">{title}</h2>
                <p className="home__card-desc">{desc}</p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ===== Контакты ===== */}
      <section className="home__contacts">
        <h2 className="home__contacts-title">{t('home.contacts.title')}</h2>
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
