import TelegramCta from '../components/TelegramCta';
import { useLanguage } from '../i18n/I18nContext';

const sectionNumber = (index) => String(index + 1).padStart(2, '0');

function AboutPage() {
  const { t } = useLanguage();
  const content = t('about');
  const sections = content?.sections || [];
  const title = content?.title || '';
  const lead = content?.lead || '';

  return (
    <section className="page about-page">
      <h1 className="page__title">{title}</h1>

      <div className="page__intro">
        <p className="page__text">{lead}</p>
        <TelegramCta note={content?.ctaNote} />
      </div>

      <nav className="about-page__toc" aria-label={content?.tocTitle || 'Contents'}>
        <h2 className="about-page__toc-title">{content?.tocTitle}</h2>
        <ol className="about-page__toc-list">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <span className="about-page__toc-index">{sectionNumber(index)}</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="about-page__sections">
        {sections.map((section, index) => (
          <section className="about-section" id={section.id} key={section.id}>
            <h2 className="about-section__title">
              <span className="about-section__index">{sectionNumber(index)}</span>
              {section.title}
            </h2>

            {section.lead && (
              <p className="about-section__text about-section__text--lead">{section.lead}</p>
            )}

            {section.paragraphs?.map((p, idx) => (
              <p className="about-section__text" key={idx}>
                {p}
              </p>
            ))}

            {section.items && (
              <div className="about-grid">
                {section.items.map((item, idx) => (
                  <article className="about-card" key={idx}>
                    {item.badge && <span className="about-card__badge">{item.badge}</span>}
                    <h3 className="about-card__title">{item.title}</h3>
                    <p className="about-card__desc">{item.desc}</p>
                  </article>
                ))}
              </div>
            )}

            {section.quote && (
              <blockquote className="about-quote">
                <p className="about-quote__text">«{section.quote}»</p>
              </blockquote>
            )}

            {section.afterQuote && (
              <p className="about-section__text">{section.afterQuote}</p>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}

export default AboutPage;
