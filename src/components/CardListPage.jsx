import { Link } from 'react-router-dom';
import ProductCards from './ProductCards';
import TelegramCta from './TelegramCta';
import { useLanguage } from '../i18n/I18nContext';

/**
 * Общий каркас страниц-витрин («Прошивки» и «Компоненты тюнинга»).
 *
 * Страницы отличались только ключом словаря (tuning / custom) и модулем
 * карточек — вся разметка, состояния «карточек нет» и CTA дублировались
 * один в один. Теперь копия одна, а страница описывает себя двумя пропсами.
 *
 * @param {object} props
 * @param {string} props.i18nKey — ветка словаря: 'tuning' | 'custom'
 * @param {Array} props.cards — карточки из виртуального модуля
 */
function CardListPage({ i18nKey, cards }) {
  const { t } = useLanguage();

  return (
    <section className="page tuning-page">
      <h1 className="page__title">{t(`${i18nKey}.title`)}</h1>

      <div className="page__intro">
        <p className="page__text">{t(`${i18nKey}.lead`)}</p>
        <TelegramCta note={t(`${i18nKey}.note`)} />
      </div>

      {cards.length > 0 ? (
        <ProductCards cards={cards} />
      ) : (
        <div className="tuning-page__empty-state">
          <p className="page__text">{t(`${i18nKey}.empty`)}</p>
          <div className="tuning-page__empty-actions">
            <Link to="/knowledge" className="knowledge-card__btn">
              {t('cta.openKnowledge')}
            </Link>
            <TelegramCta tone="ghost" label={t('cta.clarify')} />
          </div>
        </div>
      )}
    </section>
  );
}

export default CardListPage;
