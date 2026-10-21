import { sectionNumber } from './SectionToc';

/**
 * Список разделов справочной страницы.
 *
 * Одна реализация на /about, /warranty и /consultations: разметка совпадала
 * почти построчно, отличался только BEM-префикс (about-section, warranty-section,
 * consultation-section). Блоки, которых нет в данных (items, quote, list, notes),
 * просто не рендерятся — на выходе получается ровно та же разметка, что раньше.
 *
 * @param {object} props
 * @param {Array} props.sections — разделы из словаря
 * @param {string} props.itemClass — BEM-класс раздела, он же префикс элементов
 * @param {string} props.wrapperClass — класс обёртки (…-page__sections)
 */
function InfoSections({ sections, itemClass, wrapperClass }) {
  return (
    <div className={wrapperClass}>
      {sections.map((section, index) => (
        <section className={itemClass} id={section.id} key={section.id}>
          <h2 className={`${itemClass}__title`}>
            <span className={`${itemClass}__index`}>{sectionNumber(index)}</span>
            {section.title}
          </h2>

          {section.lead && <p className={`${itemClass}__text ${itemClass}__text--lead`}>{section.lead}</p>}

          {section.paragraphs?.map((paragraph, idx) => (
            <p className={`${itemClass}__text`} key={idx}>
              {paragraph}
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

          {section.afterQuote && <p className={`${itemClass}__text`}>{section.afterQuote}</p>}

          {section.list && (
            <ul className={`${itemClass}__list`}>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          {section.notes?.map((note) => (
            <p className={`${itemClass}__note`} key={note}>
              {note}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

export default InfoSections;
