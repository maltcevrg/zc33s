import { Link } from 'react-router-dom';
import tuningCards from 'virtual:tuning-cards';
import ProductCards from '../components/ProductCards';
import TelegramCta from '../components/TelegramCta';

function TuningPage() {
  return (
    <section className="page tuning-page">
      <h1 className="page__title">Прошивки</h1>

      {/* Справочная витрина: технические сведения и цены для ознакомления;
          Telegram-контакт предназначен для консультаций. */}
      <div className="page__intro">
        <p className="page__text">
          Варианты прошивок для Suzuki Swift Sport ZC33S: ориентировочная стоимость, требования
          к конфигурации и расчётная мощность. Результат зависит от конфигурации автомобиля,
          топлива и состояния узлов.
        </p>
        <TelegramCta note="Технические характеристики и ориентировочная стоимость приведены для справки. Сайт не оформляет заказы и не принимает платежи." />
      </div>

      {tuningCards.length > 0 ? (
        <ProductCards cards={tuningCards} />
      ) : (
        <div className="tuning-page__empty-state">
          <p className="page__text">
            Спецификации и графики конфигураций формируются на основе измерений и логов. Ознакомьтесь с подробными материалами по калибровкам K14C в Базе знаний или задайте технический вопрос в Telegram.
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
