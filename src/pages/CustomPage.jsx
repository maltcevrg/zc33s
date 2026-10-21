import { Link } from 'react-router-dom';
import customCards from 'virtual:custom-cards';
import ProductCards from '../components/ProductCards';
import TelegramCta from '../components/TelegramCta';
import { useLanguage } from '../i18n/I18nContext';

function CustomPage() {
  const { t } = useLanguage();
  return (
    <section className="page tuning-page">
      <h1 className="page__title">{t('custom.title')}</h1>

      <div className="page__intro">
        <p className="page__text">{t('custom.lead')}</p>
        <TelegramCta note={t('custom.note')} />
      </div>

      {customCards.length > 0 ? (
        <ProductCards cards={customCards} />
      ) : (
        <div className="tuning-page__empty-state">
          <p className="page__text">{t('custom.empty')}</p>
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

export default CustomPage;
