import { useLanguage } from '../i18n/I18nContext';

function ArticleMeta({ meta }) {
  const { t } = useLanguage();
  if (!meta) return null;

  const updatedLabel = t('articleMeta.updated');
  const reviewerLabel = t('articleMeta.reviewer');
  const compatibilityLabel = t('articleMeta.compatibility');

  return (
    <div className="article-meta" aria-label={t('articleMeta.metaLabel')}>
      <div className="article-meta__grid">
        <div className="article-meta__item">
          <span className="article-meta__label">{updatedLabel}</span>
          <span className="article-meta__value">{meta.updated}</span>
        </div>

        <div className="article-meta__item">
          <span className="article-meta__label">{reviewerLabel}</span>
          <span className="article-meta__value article-meta__value--author">
            <svg
              className="article-meta__badge-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {meta.reviewer}
          </span>
        </div>

        <div className="article-meta__item article-meta__item--full">
          <span className="article-meta__label">{compatibilityLabel}</span>
          <span className="article-meta__value">{meta.compatibility}</span>
        </div>
      </div>

      {meta.note && (
        <p className="article-meta__note">
          <span className="article-meta__note-dot" aria-hidden="true" />
          {meta.note}
        </p>
      )}
    </div>
  );
}

export default ArticleMeta;
