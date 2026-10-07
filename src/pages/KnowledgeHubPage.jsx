import { useState } from 'react';
import { Link } from 'react-router-dom';
import TelegramCta from '../components/TelegramCta';
import {
  KNOWLEDGE_ARTICLES,
  KNOWLEDGE_CATEGORIES,
  KNOWLEDGE_LEAD,
  KNOWLEDGE_TITLE,
} from '../data/knowledge';

function KnowledgeHubPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles =
    activeCategory === 'all'
      ? KNOWLEDGE_ARTICLES
      : KNOWLEDGE_ARTICLES.filter(
          (a) =>
            a.category === activeCategory ||
            (a.additionalCategories && a.additionalCategories.includes(activeCategory))
        );

  const getCategoryTitle = (id) => {
    const found = KNOWLEDGE_CATEGORIES.find((c) => c.id === id);
    return found ? found.title : id;
  };

  return (
    <section className="page knowledge-page">
      <h1 className="page__title">{KNOWLEDGE_TITLE}</h1>

      <div className="page__intro">
        <p className="page__text">{KNOWLEDGE_LEAD}</p>
        <TelegramCta note="Не нашли ответ на свой вопрос? Задайте его напрямую в официальном Telegram-чате проекта." />
      </div>

      {/* Структура категорий базы знаний (пункт 18 ТЗ) */}
      <div className="knowledge-categories-overview">
        <h2 className="knowledge-categories-overview__title">Тематические разделы</h2>
        <div className="knowledge-categories-grid">
          {KNOWLEDGE_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <article
              key={cat.id}
              className={`knowledge-cat-card${activeCategory === cat.id ? ' knowledge-cat-card--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <div className="knowledge-cat-card__header">
                <span className="knowledge-cat-card__id">{cat.title}</span>
                <span className="knowledge-cat-card__arrow">→</span>
              </div>
              <p className="knowledge-cat-card__desc">{cat.desc}</p>
              <ul className="knowledge-cat-card__topics">
                {cat.topics.map((topic) => (
                  <li key={topic} className="knowledge-cat-card__topic">
                    {topic}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      {/* Фильтр статей */}
      <div className="knowledge-filter-bar">
        <span className="knowledge-filter-bar__label">Категория:</span>
        <div className="knowledge-filter-bar__buttons" role="tablist">
          {KNOWLEDGE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`knowledge-filter-btn${activeCategory === cat.id ? ' knowledge-filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка статей с постоянными чистыми URL (пункт 19 ТЗ) */}
      <div className="knowledge-articles-grid">
        {filteredArticles.map((article) => (
          <article className="knowledge-card" key={article.slug}>
            <div className="knowledge-card__top">
              <span className="knowledge-card__category">
                {getCategoryTitle(article.category)}
              </span>
              <span className="knowledge-card__time">{article.readingTime}</span>
            </div>

            <h3 className="knowledge-card__title">
              <Link to={`/knowledge/${article.slug}`}>{article.title}</Link>
            </h3>

            <p className="knowledge-card__summary">{article.summary}</p>

            <div className="knowledge-card__meta-bar">
              <span className="knowledge-card__meta-item">
                Обновлено: <strong>{article.meta.updated}</strong>
              </span>
              <span className="knowledge-card__meta-item">
                Проверил: <strong>{article.meta.reviewer}</strong>
              </span>
            </div>

            <Link
              to={`/knowledge/${article.slug}`}
              className="knowledge-card__btn"
              aria-label={`Читать: ${article.title}`}
            >
              Читать материал →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default KnowledgeHubPage;
