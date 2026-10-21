import { Link } from 'react-router-dom';
import tuningCards from 'virtual:tuning-cards';
import ProductCards from '../components/ProductCards';
import TelegramCta from '../components/TelegramCta';
import { useLanguage } from '../i18n/I18nContext';
import useCards from '../i18n/useCards';

const imageUrl = (name) => `${import.meta.env.BASE_URL}images/${name}`;

function TuningPage() {
  const { t } = useLanguage();
  const cards = useCards(tuningCards);
  return (
    <section className="page tuning-page">
      <h1 className="page__title">{t('tuning.title')}</h1>

      <div className="page__intro">
        <p className="page__text">{t('tuning.lead')}</p>

        {/* Сводный лист диностенда: Stage 1, Stage 2, GR30 и GR39 в одном сравнении. */}
        <figure className="tuning-page__overview">
          <picture>
            <source type="image/webp" srcSet={imageUrl('stage-levels.webp')} />
            <img
              src={imageUrl('stage-levels.jpg')}
              alt={t('tuning.overviewAlt')}
              width="1600"
              height="843"
              loading="lazy"
            />
          </picture>
          <figcaption className="tuning-page__overview-caption">
            {t('tuning.overviewCaption')}
          </figcaption>
        </figure>

        <TelegramCta note={t('tuning.note')} />
      </div>

      {cards.length > 0 ? (
        <ProductCards cards={cards} />
      ) : (
        <div className="tuning-page__empty-state">
          <p className="page__text">{t('tuning.empty')}</p>
          <div className="tuning-page__empty-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '20px' }}>
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

export default TuningPage;
