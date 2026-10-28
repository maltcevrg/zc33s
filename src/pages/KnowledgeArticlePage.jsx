import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import PageLoading from '../components/PageLoading';
import { loadArticleHtml } from '../i18n/articleContent';
import { useLanguage } from '../i18n/I18nContext';
import { buildArticleHtml } from '../utils/articleAnchors';

function KnowledgeArticlePage() {
  const { slug } = useParams();
  const location = useLocation();
  const { t, lang } = useLanguage();
  const knowledge = t('knowledge');
  const article = (knowledge?.articles || []).find((a) => a.slug === slug);

  const [content, setContent] = useState(null);
  const contentKey = `${lang}:${slug}`;
  const currentContent = content?.key === contentKey ? content : null;
  const html = currentContent?.html;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!article) return;
    let cancelled = false;
    loadArticleHtml(lang, slug).then(
      (rawHtml) => {
        if (!cancelled) setContent({ key: contentKey, html: buildArticleHtml(rawHtml, article.toc) });
      }
    ).catch((error) => {
      if (!cancelled) setContent({ key: contentKey, error });
    });
    return () => { cancelled = true; };
  }, [article, lang, slug, contentKey]);

  // Текст и web-шрифты должны быть готовы до вычисления положения якоря.
  // location.key учитывает повторное нажатие той же ссылки и Back/Forward.
  useEffect(() => {
    if (!html || !location.hash) return;
    let cancelled = false;
    let frame;
    const scrollToHash = () => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        let id;
        try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
        document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    };
    Promise.resolve(document.fonts?.ready).then(scrollToHash);
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [html, location.hash, location.key]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (currentContent?.error) throw currentContent.error;

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
        </div>

        <header className="knowledge-article__header">
          <h1 className="knowledge-article__title">{article.title}</h1>
          <p className="knowledge-article__summary">{article.summary}</p>
        </header>

        {article.toc && article.toc.length > 0 && (
          <nav className="faq-article__toc" aria-label={knowledge?.tocTitle}>
            <h2 className="faq-article__toc-heading">{knowledge?.tocTitle}</h2>
            <ol className="faq-article__toc-list">
              {article.toc.map((entry, idx) => {
                const cleanEntry = entry.replace(/^\d+[\.\)]\s*/, '');
                return (
                  <li key={idx}>
                    <Link to={`#section-${idx + 1}`}>
                      <span className="toc-num">{idx + 1}.</span>
                      <span className="toc-title">{cleanEntry}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {html ? (
          <div className="faq-article__content" dangerouslySetInnerHTML={{ __html: html }} />
        ) : <PageLoading />}

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
