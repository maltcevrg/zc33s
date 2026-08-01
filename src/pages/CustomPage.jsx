import customCards from 'virtual:custom-cards';
import ProductCards from '../components/ProductCards';

function CustomPage() {
  return (
    <section className="page tuning-page">
      <h1 className="page__title">Кастомное производство</h1>

      {customCards.length > 0 ? (
        <ProductCards cards={customCards} />
      ) : (
        <p className="page__text tuning-page__empty">Карточки пока не добавлены.</p>
      )}
    </section>
  );
}

export default CustomPage;
