import TelegramCta from '../components/TelegramCta';
import { useLanguage } from '../i18n/I18nContext';

const sectionNumber = (index) => String(index + 1).padStart(2, '0');

/**
 * Справочная страница о гарантийных условиях производителей (/warranty).
 * Содержание берётся из i18n/content/warranty.js.
 */
function WarrantyPage() {
  const { t } = useLanguage();
  const content = t('warranty');
  const sections = content?.sections || [];

  return (
    <section className="page warranty-page">
      <h1 className="page__title">{content?.title}</h1>

      <div className="page__intro">
        <p className="page__text">{content?.lead}</p>
        <TelegramCta note={content?.note} />
      </div>

      <nav className="warranty-page__toc" aria-label={content?.tocTitle || 'Contents'}>
        <h2 className="warranty-page__toc-title">{content?.tocTitle}</h2>
        <ol className="warranty-page__toc-list">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <span className="warranty-page__toc-index">{sectionNumber(index)}</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="warranty-page__sections">
        {sections.map((section, index) => (
          <section className="warranty-section" id={section.id} key={section.id}>
            <h2 className="warranty-section__title">
              <span className="warranty-section__index">{sectionNumber(index)}</span>
              {section.title}
            </h2>

            {section.paragraphs?.map((paragraph) => (
              <p className="warranty-section__text" key={paragraph}>{paragraph}</p>
            ))}

            {section.list && (
              <ul className="warranty-section__list">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {section.notes?.map((note) => (
              <p className="warranty-section__note" key={note}>{note}</p>
            ))}
          </section>
        ))}
      </div>
    </section>
  );
}

export default WarrantyPage;
