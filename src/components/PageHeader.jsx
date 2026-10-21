import TelegramCta from './TelegramCta';

/**
 * Шапка внутренней страницы: заголовок, лид и CTA-примечание.
 *
 * Одинаковая у /about, /warranty, /consultations и /service — раньше эта
 * разметка была скопирована в каждую страницу.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.lead
 * @param {string} [props.ctaNote] — пояснение под кнопкой; пустое — кнопка без пояснения
 */
function PageHeader({ title, lead, ctaNote }) {
  return (
    <>
      <h1 className="page__title">{title}</h1>

      <div className="page__intro">
        <p className="page__text">{lead}</p>
        <TelegramCta note={ctaNote} />
      </div>
    </>
  );
}

export default PageHeader;
