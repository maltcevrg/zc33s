import { Link } from 'react-router-dom';
import tuningCards from 'virtual:tuning-cards';
import ProductCards from '../components/ProductCards';
import TelegramCta from '../components/TelegramCta';
import { useLanguage } from '../i18n/I18nContext';

function TuningPage() {
  const { t } = useLanguage();
  return (
    <section className="page tuning-page">
      <h1 className="page__title">{t('tuning.title')}</h1>

      <div className="page__intro">
        <p className="page__text">{t('tuning.lead')}</p>
        <TelegramCta note={t('tuning.note')} />
      </div>

      {tuningCards.length > 0 ? (
        <ProductCards cards={tuningCards} />
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
