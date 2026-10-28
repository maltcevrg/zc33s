import { useState } from 'react';
import { Link } from 'react-router-dom';
import TelegramCta from '../components/TelegramCta';
import { useLanguage } from '../i18n/I18nContext';

const CATEGORY_ORDER = ['all', 'car', 'ecu', 'hardware', 'diagnostics'];

function KnowledgeHubPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const content = t('knowledge');
  const articles = content?.articles || [];

  const categories = CATEGORY_ORDER.map((id) => ({
    id,
    title: content?.categories?.[id] || id,
    desc: content?.categoryDesc?.[id] || '',
    topics: content?.categoryTopics?.[id] || [],
  }));

  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter(
          (a) =>
            a.category === activeCategory ||
            (a.additionalCategories && a.additionalCategories.includes(activeCategory))
        );

  const getCategoryTitle = (id) => content?.categories?.[id] || id;

  return (
    <section className="page knowledge-page">
      <h1 className="page__title">{content?.title}</h1>

      <div className="page__intro">
        <p className="page__text">{content?.lead}</p>
        <TelegramCta note={content?.notFoundNote} />
      </div>

      {/* Руководство по ремонту — отдельный раздел, поэтому стоит над категориями статей */}
      <article className="knowledge-card knowledge-card--manual" style={{ marginBottom: '2rem' }}>
        <div className="knowledge-card__top"><span className="knowledge-card__category">{t('manual.cardTag')}</span></div>
        <h2 className="knowledge-card__title"><Link to="/manual/">{t('manual.cardTitle')}</Link></h2>
        <p className="knowledge-card__summary">{t('manual.cardDescription')}</p>
        <Link to="/manual/" className="knowledge-card__btn">{t('manual.cardLink')}</Link>
      </article>

      {/* Структура категорий базы знаний (пункт 18 ТЗ) */}
      <div className="knowledge-categories-overview">
        <h2 className="knowledge-categories-overview__title">{content?.categoriesTitle}</h2>
        <div className="knowledge-categories-grid">
          {categories.filter((c) => c.id !== 'all').map((cat) => (
            <button
              type="button"
              aria-pressed={activeCategory === cat.id}
              aria-controls="knowledge-results"
              aria-label={cat.title}
              key={cat.id}
              className={`knowledge-cat-card${activeCategory === cat.id ? ' knowledge-cat-card--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="knowledge-cat-card__header">
                <span className="knowledge-cat-card__id">{cat.title}</span>
                <span className="knowledge-cat-card__arrow">→</span>
              </span>
              <span className="knowledge-cat-card__desc">{cat.desc}</span>
              <span className="knowledge-cat-card__topics">
                {cat.topics.map((topic) => (
                  <span key={topic} className="knowledge-cat-card__topic">
                    {topic}
                  </span>
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Фильтр статей */}
      <div className="knowledge-filter-bar">
        <span className="knowledge-filter-bar__label">{content?.filterLabel}</span>
        <div className="knowledge-filter-bar__buttons" role="group" aria-label={content?.filterLabel}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              aria-pressed={activeCategory === cat.id}
              aria-controls="knowledge-results"
              className={`knowledge-filter-btn${activeCategory === cat.id ? ' knowledge-filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка статей с постоянными чистыми URL (пункт 19 ТЗ) */}
      <div className="knowledge-articles-grid" id="knowledge-results" aria-live="polite">
        {filteredArticles.map((article) => (
          <article className="knowledge-card" key={article.slug}>
            <div className="knowledge-card__top">
              <span className="knowledge-card__category">
                {getCategoryTitle(article.category)}
              </span>
            </div>

            <h3 className="knowledge-card__title">
              <Link to={`/knowledge/${article.slug}`}>{article.title}</Link>
            </h3>

            <p className="knowledge-card__summary">{article.summary}</p>

            <div className="knowledge-card__meta-bar">
              <span className="knowledge-card__meta-item">
                {content?.updated} <strong>{article.meta?.updated}</strong>
              </span>
              <span className="knowledge-card__meta-item">
                {content?.reviewedBy} <strong>{article.meta?.reviewer}</strong>
              </span>
            </div>

            <Link
              to={`/knowledge/${article.slug}`}
              className="knowledge-card__btn"
              aria-label={`${content?.openMaterial}: ${article.title}`}
            >
              {content?.openMaterial}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default KnowledgeHubPage;
