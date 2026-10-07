import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ArticleMeta from '../components/ArticleMeta';
import { KNOWLEDGE_ARTICLES } from '../data/knowledge';
import { getSeoForPath, updateDocumentSeo } from '../data/seo';

// Insert anchor IDs before headings matching TOC entries
function buildHtml(rawHtml, tocEntries) {
  if (!rawHtml || !tocEntries) return rawHtml || '';
  let processed = rawHtml;
  let cumulativeOffset = 0;

  for (let i = 0; i < tocEntries.length; i++) {
    const rawTitle = tocEntries[i].replace(/<[^>]+>/g, '').trim();
    if (rawTitle.length < 5 || rawTitle.length > 140) continue;

    const searchFrom = Math.max(0, processed.length - 8000);
    let searchIdx = processed.indexOf(rawTitle, searchFrom);

    while (searchIdx > -1) {
      let pStart = Math.max(0, searchIdx - 500);
      while (pStart > 0 && processed[pStart] !== '<') pStart--;

      const beforeText = processed.slice(pStart, searchIdx).toLowerCase();
      const closePIdx = processed.indexOf('</p>', searchIdx + rawTitle.length);

      if (closePIdx === -1) break;

      const segLen = closePIdx - pStart;
      const hasMarker = /(<p|<h\d).*?<strong/i.test(beforeText) || /<h\d/i.test(beforeText);
      const topSegment = processed.slice(Math.max(0, pStart - 2), pStart).toLowerCase();
      const isNonHeading =
        /^<\/?li/i.test(topSegment.replace(/\s/g, '')) ||
        /^<ul\s*style=[^>]*list-style-type:\s*disc/i.test(
          processed.slice(Math.max(0, pStart - 50), pStart)
        );

      if (!hasMarker || !isFinite(segLen) || segLen > 400 || isNonHeading) {
        searchIdx = processed.indexOf(rawTitle, searchIdx + 1);
        continue;
      }

      const actualPos = pStart + cumulativeOffset;
      const marker = `<span style="display:inline;" id="section-${i + 1}"></span>`;
      processed = processed.slice(0, actualPos) + marker + processed.slice(actualPos);
      cumulativeOffset += marker.length;
      break;
    }
  }

  return processed;
}

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
  const article = KNOWLEDGE_ARTICLES.find((a) => a.slug === slug);

  const [html, setHtml] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const seo = getSeoForPath(`/knowledge/${slug}`);
    updateDocumentSeo(seo);
  }, [slug]);

  useEffect(() => {
    if (article) {
      setHtml(buildHtml(article.html, article.toc));
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
        aria-label="Наверх"
      >
        ↑
      </button>

      <article className="faq-article knowledge-article">
        <div className="faq-article__bar">
          <Link to="/knowledge" className="faq-article__back">
            ← Вернуться к базе знаний
          </Link>
          <span className="knowledge-article__reading-time">{article.readingTime}</span>
        </div>

        <header className="knowledge-article__header">
          <h1 className="knowledge-article__title">{article.title}</h1>
          <p className="knowledge-article__summary">{article.summary}</p>
          <ArticleMeta meta={article.meta} />
        </header>

        {article.toc && article.toc.length > 0 && (
          <nav className="faq-article__toc" aria-label="Содержание статьи">
            <h2 className="faq-article__toc-heading">Содержание статьи</h2>
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
            ← Все материалы базы знаний
          </Link>
        </div>
      </article>
    </>
  );
}

export default KnowledgeArticlePage;
