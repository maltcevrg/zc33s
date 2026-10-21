/**
 * Двузначный номер раздела: 01, 02, … — используется в оглавлении и заголовках.
 *
 * @param {number} index — индекс раздела в массиве
 * @returns {string}
 */
export const sectionNumber = (index) => String(index + 1).padStart(2, '0');

/**
 * Оглавление справочной страницы со ссылками на якоря разделов.
 *
 * Разметка одинаковая у /about, /warranty и /consultations, различаются только
 * BEM-классы, поэтому префикс передаётся пропсом: className="about-page" даёт
 * about-page__toc, about-page__toc-title и т.д.
 *
 * @param {object} props
 * @param {Array<{id: string, title: string}>} props.sections
 * @param {string} props.title — заголовок блока оглавления
 * @param {string} props.className — BEM-префикс страницы
 * @param {string} [props.ariaLabel]
 */
function SectionToc({ sections, title, className, ariaLabel }) {
  if (!sections?.length) return null;

  return (
    <nav className={`${className}__toc`} aria-label={ariaLabel || title || 'Contents'}>
      <h2 className={`${className}__toc-title`}>{title}</h2>
      <ol className={`${className}__toc-list`}>
        {sections.map((section, index) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span className={`${className}__toc-index`}>{sectionNumber(index)}</span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default SectionToc;
