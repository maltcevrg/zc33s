import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import TelegramCta from './TelegramCta';
import { WARRANTY_PATH } from '../data/siteConfig';
import { useLanguage } from '../i18n/I18nContext';

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
  const { t } = useLanguage();
  if (!items.length) return null;
  return (
    <div className={`req-list req-list--${tone}`}>
      <h4 className="req-list__title">{tone === 'required' ? t('product.required') : t('product.recommended')}</h4>
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
export function CardModalPanel({ card, onClose }) {
  const { t } = useLanguage();
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
    if (panel) {
      const focusable = [...panel.querySelectorAll(FOCUSABLE)];
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        panel.focus({ preventScroll: true });
      }
    }

    const handleKeyDown = (event) => {
      const count = imageCountRef.current;

      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
      } else if (event.key === 'ArrowLeft' && count > 1) {
        setActiveImage((index) => (index - 1 + count) % count);
      } else if (event.key === 'ArrowRight' && count > 1) {
        setActiveImage((index) => (index + 1) % count);
      } else if (event.key === 'Tab' && panel) {
        const focusable = [...panel.querySelectorAll(FOCUSABLE)];
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey) {
          if (active === first || active === panel || !panel.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !panel.contains(active)) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, []);

  const specs = card.specs || [];
  const required = card.required || [];
  const recommended = card.recommended || [];
  const included = card.included || [];
  const variants = card.variants || [];
  const variantNotes = card.variantNotes || [];
  const tests = card.tests || [];
  const summary = card.summary || card.description;
  const priceNote = card.priceNote || (variants.length ? t('product.productPriceNote') : t('product.priceNote'));
  const hasStructuredContent =
    specs.length > 0 ||
    required.length > 0 ||
    recommended.length > 0 ||
    included.length > 0 ||
    variants.length > 0 ||
    Boolean(card.power);

  return (
    <article ref={panelRef} tabIndex={-1} className="card-modal__panel" onClick={(event) => event.stopPropagation()}>
      <button className="card-modal__close" type="button" onClick={onClose} aria-label={t('product.close')}>
        <span />
        <span />
      </button>

      <div
        className="card-modal__gallery"
        onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        {currentImage ? (
          <img
            className="card-modal__main-image"
            src={currentImage}
            alt={card.title}
            width="800"
            height="600"
          />
        ) : (
          <div className="card-modal__placeholder">{t('product.noImage')}</div>
        )}

        {hasMultipleImages && (
          <>
            <button
              className="card-modal__arrow card-modal__arrow--previous"
              type="button"
              onClick={showPreviousImage}
              aria-label={t('product.prevImage')}
            >
              ‹
            </button>
            <button
              className="card-modal__arrow card-modal__arrow--next"
              type="button"
              onClick={showNextImage}
              aria-label={t('product.nextImage')}
            >
              ›
            </button>
          </>
        )}

        {hasMultipleImages && (
          <div className="card-modal__thumbnails" aria-label={t('product.photoOf')}>
            {card.images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                className={`card-modal__thumbnail${index === activeImage ? ' card-modal__thumbnail--active' : ''}`}
                onClick={() => setActiveImage(index)}
                aria-label={`${t('product.photoOf')} ${index + 1} ${t('product.of')} ${imageCount} ${t('product.for')} ${card.title}`}
                aria-pressed={index === activeImage}
              >
                <img
                  src={image}
                  alt={`${t('product.thumbnailFor')} ${index + 1} ${t('product.for')} ${card.title}`}
                  loading="lazy"
                  width="72"
                  height="54"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="card-modal__content">
        <h2 className="card-modal__title">{card.title}</h2>
        {summary && <p className="card-modal__summary">{summary}</p>}

        {specs.length > 0 && (
          <Block title={t('product.specs')}>
            <PairList items={specs} />
          </Block>
        )}

        {card.power && (
          <Block title={t('product.power')}>
            <p className="card-modal__power">{card.power}</p>
            <p className="card-modal__note">{t('product.powerCalcNote')}</p>
          </Block>
        )}

        {(required.length > 0 || recommended.length > 0) && (
          <Block title={t('product.requirements')}>
            <div className="card-modal__requirements">
              <RequirementList items={required} tone="required" />
              <RequirementList items={recommended} tone="recommended" />
            </div>
          </Block>
        )}

        {included.length > 0 && (
          <Block title={t('product.included')}>
            <ul className="check-list">
              {included.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          </Block>
        )}

        {variants.length > 0 && (
          <Block title={t('product.variants')}>
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
            <p className="card-modal__note">{priceNote}</p>
          </Block>
        )}

        {card.warranty && (
          <Block title={t('product.warranty')}>
            <div className="warranty-note">
              <p className="warranty-note__term">{t('product.warrantyTerm')} {card.warranty}</p>
              <p className="card-modal__note">{t('product.warrantyNote')}</p>
              <Link className="warranty-note__link" to={WARRANTY_PATH} onClick={onClose}>
                {t('product.warrantyMore')} →
              </Link>
            </div>
          </Block>
        )}

        {tests.length > 0 && (
          <Block title={t('product.testTitle')}>
            <PairList items={tests} />
            <p className="card-modal__note">{t('product.testNote')}</p>
          </Block>
        )}

        {!hasStructuredContent && card.description && !card.summary && (
          <p className="card-modal__description">{card.description}</p>
        )}

        <Block title={t('product.important')} tone="important">
          <p className="card-modal__important">{t('product.importantNote')}</p>
        </Block>

        <div className="card-modal__cta">
          {variants.length === 0 && (
            <div className="card-modal__price-block">
              <span className="card-modal__price-label">{t('product.priceLabel')}</span>
              <span className="card-modal__price">{card.price || t('product.priceFallback')}</span>
              <p className="card-modal__note">{priceNote}</p>
            </div>
          )}

          <div className="card-modal__actions">
            <TelegramCta />
            <TelegramCta tone="ghost" label={t('cta.clarify')} />
          </div>

          {!card.power && hasPowerEstimate(card.description) && (
            <p className="card-modal__note">{t('product.powerNote')}</p>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductCards({ cards }) {
  const { t } = useLanguage();
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
            aria-label={`${t('product.openCard')}: ${card.title}`}
          >
            <span className="tuning-card__media">
              {card.images[0] ? (
                <img
                  className="tuning-card__image"
                  src={card.images[0]}
                  alt={card.title}
                  loading="lazy"
                  width="400"
                  height="280"
                />
              ) : (
                <span className="tuning-card__placeholder">{t('product.noImage')}</span>
              )}
            </span>

            <span className="tuning-card__content">
              <span className="tuning-card__title">{card.title || card.id}</span>

              {card.highlights?.length > 0 && (
                <span className="tuning-card__specs">
                  {card.highlights.map((item) => (
                    <span className="tuning-card__chip" key={item}>{item}</span>
                  ))}
                </span>
              )}

              <span className="tuning-card__footer">
                <span className="tuning-card__price-block">
                  <span className="tuning-card__price-label">{t('product.priceLabel')}</span>
                  <span className="tuning-card__price">{card.price || t('product.priceFallback')}</span>
                </span>
                <span className="tuning-card__more">{t('product.more')}</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <p className="tuning-page__grid-note">
        {t('tuning.gridNote')}
      </p>

      {selectedCard && <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />}
    </>
  );
}

export default ProductCards;
