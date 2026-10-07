import customCards from 'virtual:custom-cards';
import ProductCards from '../components/ProductCards';
import TelegramCta from '../components/TelegramCta';

function CustomPage() {
  return (
    <section className="page tuning-page">
      <h1 className="page__title">Кастомное производство</h1>

      {/* Справочная витрина компонентов: без «купить» и «в наличии»,
          выход на согласование конфигурации — в Telegram. */}
      <div className="page__intro">
        <p className="page__text">
          Компоненты для Suzuki Swift Sport ZC33S: турбины, интеркулеры, сцепление.
          Ориентировочная стоимость и варианты приобретения приведены для предварительного
          ознакомления.
        </p>
        <TelegramCta note="Наличие, применимость и состав работ уточняются индивидуально. Оформление заказа на сайте не осуществляется." />
      </div>

      {customCards.length > 0 ? (
        <ProductCards cards={customCards} />
      ) : (
        <p className="page__text tuning-page__empty">Карточки пока не добавлены.</p>
      )}
    </section>
  );
}

export default CustomPage;
