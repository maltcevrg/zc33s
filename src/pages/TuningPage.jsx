import tuningCards from 'virtual:tuning-cards';
import ProductCards from '../components/ProductCards';

function TuningPage() {
  return (
    <section className="page tuning-page">
      <h1 className="page__title">Прошивки</h1>

      {tuningCards.length > 0 ? (
        <ProductCards cards={tuningCards} />
      ) : (
        <p className="page__text tuning-page__empty">Карточки пока не добавлены.</p>
      )}
    </section>
  );
}

export default TuningPage;
