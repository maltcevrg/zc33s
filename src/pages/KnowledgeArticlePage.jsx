import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ArticleMeta from '../components/ArticleMeta';
import { getSeoForPath, updateDocumentSeo } from '../data/seo';
import { useLanguage } from '../i18n/I18nContext';
import { buildArticleHtml } from '../utils/articleAnchors';

function scrollToSectionByIndex(idx) {
  requestAnimationFrame(() => {
    const target = document.getElementById('section-' + idx);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    window.scrollTo({ top: Math.max(0, window.scrollY + rect.top - 84), behavior: 'smooth' });
  });
}

function KnowledgeArticlePage() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const knowledge = t('knowledge');
  const article = (knowledge?.articles || []).find((a) => a.slug === slug);

  const [html, setHtml] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const seo = getSeoForPath(`/knowledge/${slug}`, lang);
    updateDocumentSeo(seo);
  }, [slug, lang]);

  useEffect(() => {
    if (article) {
      setHtml(buildArticleHtml(article.html, article.toc));
    }
  }, [article]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!article) {
    return <Navigate to="/knowledge" replace />;
  }

  return (
    <>
      <button
        className={`faq-back-to-top${scrolled ? ' faq-back-to-top--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={t('articleMeta.toTop')}
      >
        ↑
      </button>

      <article className="faq-article knowledge-article">
        <div className="faq-article__bar">
          <Link to="/knowledge" className="faq-article__back">
            {knowledge?.articleBack}
          </Link>
          <span className="knowledge-article__reading-time">{article.readingTime}</span>
        </div>

        <header className="knowledge-article__header">
          <h1 className="knowledge-article__title">{article.title}</h1>
          <p className="knowledge-article__summary">{article.summary}</p>
          <ArticleMeta meta={article.meta} />
        </header>

        {article.toc && article.toc.length > 0 && (
          <nav className="faq-article__toc" aria-label={knowledge?.tocTitle}>
            <h2 className="faq-article__toc-heading">{knowledge?.tocTitle}</h2>
            <ol className="faq-article__toc-list">
              {article.toc.map((entry, idx) => {
                const cleanEntry = entry.replace(/^\d+[\.\)]\s*/, '');
                return (
                  <li key={idx}>
                    <a
                      href={`#section-${idx + 1}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSectionByIndex(idx + 1);
                      }}
                    >
                      <span className="toc-num">{idx + 1}.</span>
                      <span className="toc-title">{cleanEntry}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <div
          className="faq-article__content"
          dangerouslySetInnerHTML={{ __html: html || article.html }}
        />

        <div className="knowledge-article__bottom-nav">
          <Link to="/knowledge" className="knowledge-article__back-btn">
            {knowledge?.allMaterials}
          </Link>
        </div>
      </article>
    </>
  );
}

export default KnowledgeArticlePage;
