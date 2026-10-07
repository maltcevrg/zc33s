function ArticleMeta({ meta }) {
  if (!meta) return null;

  return (
    <div className="article-meta" aria-label="Метаданные материала">
      <div className="article-meta__grid">
        <div className="article-meta__item">
          <span className="article-meta__label">Обновлено:</span>
          <span className="article-meta__value">{meta.updated}</span>
        </div>

        <div className="article-meta__item">
          <span className="article-meta__label">Проверил:</span>
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
          <span className="article-meta__label">Применимость:</span>
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
