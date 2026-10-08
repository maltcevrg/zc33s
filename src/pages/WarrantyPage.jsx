import TelegramCta from '../components/TelegramCta';
import { WARRANTY_LEAD, WARRANTY_SECTIONS, WARRANTY_TITLE } from '../data/warranty';

const sectionNumber = (index) => String(index + 1).padStart(2, '0');

/**
 * Справочная страница о гарантийных условиях производителей (/warranty).
 * Содержание — в src/data/warranty.js.
 */
function WarrantyPage() {
  return (
    <section className="page warranty-page">
      <h1 className="page__title">{WARRANTY_TITLE}</h1>

      <div className="page__intro">
        <p className="page__text">{WARRANTY_LEAD}</p>
        <TelegramCta note="Telegram-контакт предназначен для технических консультаций. По вопросам гарантии используйте контакты и порядок, указанные изготовителем или продавцом конкретного изделия." />
      </div>

      <nav className="warranty-page__toc" aria-label="Содержание страницы">
        <h2 className="warranty-page__toc-title">Содержание</h2>
        <ol className="warranty-page__toc-list">
          {WARRANTY_SECTIONS.map((section, index) => (
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
        {WARRANTY_SECTIONS.map((section, index) => (
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
