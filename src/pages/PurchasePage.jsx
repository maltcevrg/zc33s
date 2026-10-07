import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TelegramCta from '../components/TelegramCta';
import { TELEGRAM_URL } from '../data/siteConfig';
import { PURCHASE_LEAD, PURCHASE_SECTIONS, PURCHASE_TITLE } from '../data/purchase';

const sectionNumber = (index) => String(index + 1).padStart(2, '0');

/**
 * Страница «Условия приобретения» (/purchase).
 * Содержание — в src/data/purchase.js.
 */
function PurchasePage() {
  const location = useLocation();

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
    <section className="page purchase-page">
      <h1 className="page__title">{PURCHASE_TITLE}</h1>

      <div className="page__intro">
        <p className="page__text">{PURCHASE_LEAD}</p>
        <TelegramCta note="Согласование конфигурации, стоимости и оформление заказа осуществляются в официальном Telegram-контакте проекта." />
      </div>

      <nav className="purchase-page__toc" aria-label="Содержание страницы">
        <h2 className="purchase-page__toc-title">Содержание</h2>
        <ol className="purchase-page__toc-list">
          {PURCHASE_SECTIONS.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <span className="purchase-page__toc-index">{sectionNumber(index)}</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="purchase-page__sections">
        {PURCHASE_SECTIONS.map((section, index) => (
          <section className="purchase-section" id={section.id} key={section.id}>
            <h2 className="purchase-section__title">
              <span className="purchase-section__index">{sectionNumber(index)}</span>
              {section.title}
            </h2>

            {section.paragraphs?.map((paragraph) => (
              <p className="purchase-section__text" key={paragraph}>
                {paragraph}
              </p>
            ))}

            {section.steps && (
              <ol className="purchase-section__steps">
                {section.steps.map((step) => (
                  <li key={step}>
                    {step === 'Переходит в официальный Telegram.' ? (
                      <>
                        Переходит в{' '}
                        <a
                          href={TELEGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="purchase-section__link"
                        >
                          официальный Telegram
                        </a>
                        .
                      </>
                    ) : (
                      step
                    )}
                  </li>
                ))}
              </ol>
            )}

            {section.list && (
              <ul className="purchase-section__list">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {section.notes?.map((note) => (
              <p className="purchase-section__note" key={note}>
                {note}
              </p>
            ))}
          </section>
        ))}
      </div>
    </section>
  );
}

export default PurchasePage;
