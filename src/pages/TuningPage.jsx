import tuningCards from 'virtual:tuning-cards';
import ProductCards from '../components/ProductCards';
import TelegramCta from '../components/TelegramCta';

function TuningPage() {
  return (
    <section className="page tuning-page">
      <h1 className="page__title">Прошивки</h1>

      {/* Справочная витрина: цена и применимость согласовываются индивидуально,
          заказ на сайте не оформляется — выход в официальный Telegram-контакт. */}
      <div className="page__intro">
        <p className="page__text">
          Варианты прошивок для Suzuki Swift Sport ZC33S: ориентировочная стоимость, требования
          к конфигурации и расчётная мощность. Результат зависит от конфигурации автомобиля,
          топлива и состояния узлов.
        </p>
        <TelegramCta note="Наличие, применимость и состав работ уточняются индивидуально. Оформление заказа на сайте не осуществляется." />
      </div>

      {tuningCards.length > 0 ? (
        <ProductCards cards={tuningCards} />
      ) : (
        <p className="page__text tuning-page__empty">Карточки пока не добавлены.</p>
      )}
    </section>
  );
}

export default TuningPage;
