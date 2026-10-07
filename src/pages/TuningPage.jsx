import { Link } from 'react-router-dom';
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
        <div className="tuning-page__empty-state">
          <p className="page__text">
            Спецификации и графики конфигураций формируются на основе измерений и логов. Ознакомьтесь с подробными материалами по калибровкам K14C в Базе знаний или свяжитесь с калибровщиком для индивидуального расчёта.
          </p>
          <div className="tuning-page__empty-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '20px' }}>
            <Link to="/knowledge" className="knowledge-card__btn">
              Открыть базу знаний →
            </Link>
            <TelegramCta tone="ghost" label="Уточнить применимость" />
          </div>
        </div>
      )}
    </section>
  );
}

export default TuningPage;
