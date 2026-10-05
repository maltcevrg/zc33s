import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { lockScroll, unlockScroll } from '../utils/scrollLock';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function CardModal({ card, onClose }) {
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

  return createPortal(
    <div className="card-modal" role="dialog" aria-modal="true" aria-label={card.title} onClick={onClose}>
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
          <h2 className="card-modal__title">{card.title}</h2>
          {card.description && <p className="card-modal__description">{card.description}</p>}
          {card.price && <p className="card-modal__price">{card.price}</p>}
        </div>
      </article>
    </div>,
    document.body
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
            {card.images[0] ? (
              <img className="tuning-card__image" src={card.images[0]} alt="" loading="lazy" />
            ) : (
              <div className="tuning-card__placeholder">Нет изображения</div>
            )}

            <span className="tuning-card__content">
              <span className="tuning-card__title">{card.title || card.id}</span>
              <span className="tuning-card__actions">
                <span className="tuning-card__price">{card.price || 'Цена по запросу'}</span>
                <span className="tuning-card__more">Подробнее</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      {selectedCard && <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />}
    </>
  );
}

export default ProductCards;
