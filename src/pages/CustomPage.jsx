import { Link } from 'react-router-dom';
import customCards from 'virtual:custom-cards';
import ProductCards from '../components/ProductCards';
import TelegramCta from '../components/TelegramCta';

function CustomPage() {
  return (
    <section className="page tuning-page">
      <h1 className="page__title">Компоненты</h1>

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
        <div className="tuning-page__empty-state">
          <p className="page__text">
            Спецификации проверенных компонентов формируются на основе испытаний и реального опыта эксплуатации. Изучите подробные материалы о железе в Базе знаний или свяжитесь с нами для подбора компонентов.
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

export default CustomPage;
