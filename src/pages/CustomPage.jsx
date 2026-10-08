import { Link } from 'react-router-dom';
import customCards from 'virtual:custom-cards';
import ProductCards from '../components/ProductCards';
import TelegramCta from '../components/TelegramCta';

function CustomPage() {
  return (
    <section className="page tuning-page">
      <h1 className="page__title">Компоненты</h1>

      {/* Справочная витрина компонентов; Telegram используется для консультаций. */}
      <div className="page__intro">
        <p className="page__text">
          Компоненты для Suzuki Swift Sport ZC33S: турбины, интеркулеры, сцепление.
          Технические характеристики и ориентировочные цены приведены для справки.
        </p>
        <TelegramCta note="Кнопка предназначена для технических консультаций. Сайт не оформляет заказы и не принимает платежи." />
      </div>

      {customCards.length > 0 ? (
        <ProductCards cards={customCards} />
      ) : (
        <div className="tuning-page__empty-state">
          <p className="page__text">
            Спецификации компонентов приведены для ознакомления и формируются на основе испытаний и опыта эксплуатации. Изучите материалы о компонентах в Базе знаний или задайте технический вопрос в Telegram.
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
