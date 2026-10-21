import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TelegramCta from '../components/TelegramCta';
import { useLanguage } from '../i18n/I18nContext';

const sectionNumber = (index) => String(index + 1).padStart(2, '0');

/**
 * Справочная страница о консультациях и компонентах (/consultations).
 * Содержание — в src/i18n/content/consultations.js.
 */
function ConsultationsPage() {
  const location = useLocation();
  const { t } = useLanguage();
  const content = t('consultations');
  const sections = content?.sections || [];

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <section className="page consultations-page">
      <h1 className="page__title">{content?.title}</h1>

      <div className="page__intro">
        <p className="page__text">{content?.lead}</p>
        <TelegramCta note={content?.ctaNote} />
      </div>

      <nav className="consultations-page__toc" aria-label={content?.tocTitle || 'Contents'}>
        <h2 className="consultations-page__toc-title">{content?.tocTitle}</h2>
        <ol className="consultations-page__toc-list">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <span className="consultations-page__toc-index">{sectionNumber(index)}</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="consultations-page__sections">
        {sections.map((section, index) => (
          <section className="consultation-section" id={section.id} key={section.id}>
            <h2 className="consultation-section__title">
              <span className="consultation-section__index">{sectionNumber(index)}</span>
              {section.title}
            </h2>

            {section.paragraphs?.map((paragraph) => (
              <p className="consultation-section__text" key={paragraph}>
                {paragraph}
              </p>
            ))}

            {section.list && (
              <ul className="consultation-section__list">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {section.notes?.map((note) => (
              <p className="consultation-section__note" key={note}>
                {note}
              </p>
            ))}
          </section>
        ))}
      </div>
    </section>
  );
}

export default ConsultationsPage;
