import { Link } from 'react-router-dom';
import TelegramCta from '../components/TelegramCta';
import TuningLevels from '../components/TuningLevels';
import { useLanguage } from '../i18n/I18nContext';

const imageUrl = (name) => `${import.meta.env.BASE_URL}images/${name}`;

// Разделы главной: один список вместо двух (id → ключ перевода → картинка → ссылка).
// Раньше id жили в одном месте, а i18n-ключи в другом, и их приходилось
// держать в синхроне руками.
const HOME_SECTIONS = [
  { id: 'tuning', i18nKey: 'tuning', img: 'dyno-1280.jpg', link: '/tuning' },
  { id: 'components', i18nKey: 'components', img: 'turbo-960.jpg', link: '/custom' },
  { id: 'knowledge', i18nKey: 'knowledge', img: 'baza-1280.jpg', link: '/knowledge' },
  { id: 'about', i18nKey: 'about', img: 'gunrace.jpg', link: '/about' },
  // Сервис пока не наполнен — раздел скрыт, но остаётся в списке на будущее.
  { id: 'service', i18nKey: 'service', img: 'service-1280.jpg', link: '/service', hidden: true },
];

const VISIBLE_HOME_SECTIONS = HOME_SECTIONS.filter((section) => !section.hidden);

function HomePage() {
  const { t } = useLanguage();

  const heroBlock = {
    title: t('home.heroTitle'),
    accent: t('home.heroAccent'),
    subtitle: t('home.heroSubtitle'),
  };

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
      <section className={`home__grid${VISIBLE_HOME_SECTIONS.length % 2 ? ' home__grid--odd' : ''}`}>
        {VISIBLE_HOME_SECTIONS.map((section) => {
          const title = t(`home.sections.${section.i18nKey}.title`);
          const desc = t(`home.sections.${section.i18nKey}.desc`);
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
              className={`contact-card${c.flag ? ` contact-card--${c.flag}` : ''}`}
            >
              {c.flag === 'tatarstan' && (
                <img
                  src={imageUrl('tatarstan.png')}
                  alt=""
                  className="contact-card__flag"
                  aria-hidden="true"
                />
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
