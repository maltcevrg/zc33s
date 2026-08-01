import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function CardModal({ card, onClose }) {
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = card.images[activeImage];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return createPortal(
    <div className="card-modal" role="dialog" aria-modal="true" aria-label={card.title} onClick={onClose}>
      <article className="card-modal__panel" onClick={(event) => event.stopPropagation()}>
        <button className="card-modal__close" type="button" onClick={onClose} aria-label="Закрыть">
          <span />
          <span />
        </button>

        <div className="card-modal__gallery">
          {currentImage ? (
            <img className="card-modal__main-image" src={currentImage} alt={card.title} />
          ) : (
            <div className="card-modal__placeholder">Нет изображения</div>
          )}

          {card.images.length > 1 && (
            <div className="card-modal__thumbnails" aria-label="Изображения карточки">
              {card.images.map((image, index) => (
                <button
                  key={image}
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
              <span className="tuning-card__title">{card.title}</span>
              {card.description && <span className="tuning-card__description">{card.description}</span>}
              {card.price && <span className="tuning-card__price">{card.price}</span>}
              <span className="tuning-card__more">Подробнее</span>
            </span>
          </button>
        ))}
      </div>

      {selectedCard && <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />}
    </>
  );
}

export default ProductCards;
