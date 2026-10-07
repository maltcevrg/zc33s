import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import TelegramCta from './TelegramCta';
import {
  IMPORTANT_NOTE,
  IMPORTANT_TITLE,
  POWER_CALC_NOTE,
  POWER_NOTE,
  POWER_TEST_NOTE,
  POWER_TEST_TITLE,
  PRICE_FALLBACK,
  PRICE_LABEL,
  PRICE_NOTE,
  PRODUCT_PRICE_NOTE,
  WARRANTY_MORE_LABEL,
  WARRANTY_PATH,
} from '../data/siteConfig';

// «Расчётная мощность» показываем только там, где в тексте карточки действительно
// заявлены расчётные лошадиные силы, — иначе подпись была бы не по делу.
// Используется для старых карточек, заполненных только полем DESC.
const hasPowerEstimate = (description = '') => /расч[её]тн/i.test(description) && /л\.?\s*с/i.test(description);

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Раздел модального окна: подзаголовок и содержимое.
function Block({ title, children, tone = '' }) {
  return (
    <section className={`card-modal__block${tone ? ` card-modal__block--${tone}` : ''}`}>
      <h3 className="card-modal__subtitle">{title}</h3>
      {children}
    </section>
  );
}

// Список «параметр — значение».
function PairList({ items }) {
  return (
    <dl className="pair-list">
      {items.map((item, index) => (
        <div className="pair-list__row" key={`${item.label || 'spec'}-${index}`}>
          {item.label ? (
            <>
              <dt className="pair-list__label">{item.label}</dt>
              <dd className="pair-list__value">{item.text}</dd>
            </>
          ) : (
            <dd className="pair-list__value pair-list__value--full">{item.text}</dd>
          )}
        </div>
      ))}
    </dl>
  );
}

// Перечень требований: «Обязательно» либо «Рекомендуется».
function RequirementList({ items, tone }) {
  if (!items.length) return null;

  return (
    <div className={`req-list req-list--${tone}`}>
      <h4 className="req-list__title">{tone === 'required' ? 'Обязательно' : 'Рекомендуется'}</h4>
      <ul className="req-list__items">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function CardModal({ card, onClose }) {
  return createPortal(
    <div className="card-modal" role="dialog" aria-modal="true" aria-label={card.title} onClick={onClose}>
      <CardModalPanel card={card} onClose={onClose} />
    </div>,
    document.body
  );
}

// Содержимое модального окна (без портала): галерея и блоки карточки товара.
// Выделено в отдельный компонент, чтобы его можно было отрисовать и проверить
// отдельно от обёртки с createPortal.
export function CardModalPanel({ card, onClose }) {
  const [activeImage, setActiveImage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const imageCount = card.images.length;
  const imageCountRef = useRef(imageCount);
  const currentImage = card.images[activeImage];
  const hasMultipleImages = imageCount > 1;

  onCloseRef.current = onClose;
  imageCountRef.current = imageCount;

  const showPreviousImage = () => {
    setActiveImage((index) => (index - 1 + imageCount) % imageCount);
  };

  const showNextImage = () => {
    setActiveImage((index) => (index + 1) % imageCount);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;

    if (Math.abs(distance) >= 45) {
      if (distance > 0) showPreviousImage();
      else showNextImage();
    }

    setTouchStartX(null);
  };

  useEffect(() => {
    const panel = panelRef.current;
    const opener = document.activeElement;

    lockScroll();
    panel?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      const count = imageCountRef.current;

      if (event.key === 'Escape') {
        onCloseRef.current();
      } else if (event.key === 'ArrowLeft' && count > 1) {
        setActiveImage((index) => (index - 1 + count) % count);
      } else if (event.key === 'ArrowRight' && count > 1) {
        setActiveImage((index) => (index + 1) % count);
      } else if (event.key === 'Tab' && panel) {
        // Фокус не уходит за пределы модального окна.
        const focusable = [...panel.querySelectorAll(FOCUSABLE)];
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && (active === first || active === panel || !panel.contains(active))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
      // Возвращаем фокус на карточку, с которой открыли окно.
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, []);

  const specs = card.specs || [];  const required = card.required || [];
  const recommended = card.recommended || [];
  const included = card.included || [];
  const variants = card.variants || [];
  const variantNotes = card.variantNotes || [];
  const tests = card.tests || [];
  const summary = card.summary || card.description;
  const priceNote = card.priceNote || (variants.length ? PRODUCT_PRICE_NOTE : PRICE_NOTE);
  const hasStructuredContent =
    specs.length > 0 ||
    required.length > 0 ||
    recommended.length > 0 ||
    included.length > 0 ||
    variants.length > 0 ||
    Boolean(card.power);

  return (
    <article ref={panelRef} tabIndex={-1} className="card-modal__panel" onClick={(event) => event.stopPropagation()}>
      <button className="card-modal__close" type="button" onClick={onClose} aria-label="Закрыть">
        <span />
        <span />
      </button>

      <div
        className="card-modal__gallery"
        onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        {currentImage ? (
          <img className="card-modal__main-image" src={currentImage} alt={card.title} />
        ) : (
          <div className="card-modal__placeholder">Нет изображения</div>
        )}

        {hasMultipleImages && (
          <>
            <button className="card-modal__arrow card-modal__arrow--previous" type="button" onClick={showPreviousImage} aria-label="Предыдущее изображение">‹</button>
            <button className="card-modal__arrow card-modal__arrow--next" type="button" onClick={showNextImage} aria-label="Следующее изображение">›</button>
          </>
        )}

        {hasMultipleImages && (
          <div className="card-modal__thumbnails" aria-label="Изображения карточки">
            {card.images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                className={`card-modal__thumbnail${index === activeImage ? ' card-modal__thumbnail--active' : ''}`}
                onClick={() => setActiveImage(index)}
                aria-label={`Показать изображение ${index + 1}`}
              >
                <img src={image} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="card-modal__content">
        {/* 1. Название */}
        <h2 className="card-modal__title">{card.title}</h2>

        {/* 2. Назначение */}
        {summary && <p className="card-modal__summary">{summary}</p>}

        {/* 3. Основные характеристики */}
        {specs.length > 0 && (
          <Block title="Основные характеристики">
            <PairList items={specs} />
          </Block>
        )}

        {/* Ориентировочная мощность — только как расчётный показатель. */}
        {card.power && (
          <Block title="Ориентировочная мощность">
            <p className="card-modal__power">{card.power}</p>
            <p className="card-modal__note">{POWER_CALC_NOTE}</p>
          </Block>
        )}

        {/* 4. Требования к конфигурации */}
        {(required.length > 0 || recommended.length > 0) && (
          <Block title="Требования к конфигурации">
            <div className="card-modal__requirements">
              <RequirementList items={required} tone="required" />
              <RequirementList items={recommended} tone="recommended" />
            </div>
          </Block>
        )}

        {included.length > 0 && (
          <Block title="Входит в стоимость">
            <ul className="check-list">
              {included.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          </Block>
        )}

        {/* 5. Варианты приобретения */}
        {variants.length > 0 && (
          <Block title="Варианты приобретения">
            <ul className="variant-list">
              {variants.map((variant, index) => (
                <li className="variant-list__item" key={`${variant.price}-${index}`}>
                  <span className="variant-list__price">{variant.price}</span>
                  <span className="variant-list__text">{variant.text}</span>
                </li>
              ))}
            </ul>
            {variantNotes.map((note, index) => (
              <p className="card-modal__note" key={`${note}-${index}`}>{note}</p>
            ))}
            {/* Цена не читается как окончательная сумма сделки. */}
            <p className="card-modal__note">{priceNote}</p>
          </Block>
        )}

        {/* 6. Гарантия — короткая строка и переход к условиям. */}
        {card.warranty && (
          <Block title="Гарантия">
            <div className="warranty-note">
              <p className="warranty-note__term">Гарантия: {card.warranty}</p>
              <Link className="warranty-note__link" to={WARRANTY_PATH} onClick={onClose}>
                {WARRANTY_MORE_LABEL} →
              </Link>
            </div>
          </Block>
        )}

        {/* 7. Измеренный результат — только при наличии реальных замеров. */}
        {tests.length > 0 && (
          <Block title={POWER_TEST_TITLE}>
            <PairList items={tests} />
            <p className="card-modal__note">{POWER_TEST_NOTE}</p>
          </Block>
        )}

        {/* Старые карточки без структурированных полей — показываем свободный текст. */}
        {!hasStructuredContent && card.description && !card.summary && (
          <p className="card-modal__description">{card.description}</p>
        )}

        {/* 8. Важно */}
        <Block title={IMPORTANT_TITLE} tone="important">
          <p className="card-modal__important">{IMPORTANT_NOTE}</p>
        </Block>

        {/* Цена — справочная, не оферта; основной выход — в Telegram. */}
        <div className="card-modal__cta">
          {variants.length === 0 && (
            <div className="card-modal__price-block">
              <span className="card-modal__price-label">{PRICE_LABEL}</span>
              <span className="card-modal__price">{card.price || PRICE_FALLBACK}</span>
              <p className="card-modal__note">{priceNote}</p>
            </div>
          )}

          <div className="card-modal__actions">
            <TelegramCta />
            {/* Разрешённая ТЗ формулировка: тот же Telegram-канал, другой сценарий обращения. */}
            <TelegramCta tone="ghost" label="Уточнить применимость" />
          </div>

          {!card.power && hasPowerEstimate(card.description) && (
            <p className="card-modal__note">{POWER_NOTE}</p>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductCards({ cards }) {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <>
      <div className="tuning-page__grid">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            className="tuning-card"
            onClick={() => setSelectedCard(card)}
            aria-label={`Открыть карточку «${card.title}»`}
          >
            <span className="tuning-card__media">
              {card.images[0] ? (
                <img className="tuning-card__image" src={card.images[0]} alt="" loading="lazy" />
              ) : (
                <span className="tuning-card__placeholder">Нет изображения</span>
              )}
            </span>

            <span className="tuning-card__content">
              <span className="tuning-card__title">{card.title || card.id}</span>

              {/* Ключевые параметры — видно до открытия карточки. */}
              {card.highlights?.length > 0 && (
                <span className="tuning-card__specs">
                  {card.highlights.map((item) => (
                    <span className="tuning-card__chip" key={item}>{item}</span>
                  ))}
                </span>
              )}

              <span className="tuning-card__footer">
                <span className="tuning-card__price-block">
                  <span className="tuning-card__price-label">{PRICE_LABEL}</span>
                  <span className="tuning-card__price">{card.price || PRICE_FALLBACK}</span>
                </span>
                <span className="tuning-card__more">Подробнее</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <p className="tuning-page__grid-note">
        Значения мощности на карточках — ориентировочные расчётные показатели. Стоимость
        приведена для предварительного ознакомления; состав работ и окончательная цена
        согласовываются индивидуально.
      </p>

      {selectedCard && <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />}
    </>
  );
}

export default ProductCards;
