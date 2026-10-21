import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../i18n/I18nContext';
import { buildArticleHtml } from '../utils/articleAnchors';

// Модули FAQ (обратная совместимость со старыми ссылками ?module=01…04).
const MODULE_SLUGS = {
  '01': 'zc33s-faq',
  '02': 'ecu-flashing',
  '03': 'tuning-stages',
  '04': 'buying-zc33s',
};

function scrollToSectionByIndex(idx) {
  requestAnimationFrame(() => {
    const target = document.getElementById('section-' + idx);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    window.scrollTo({ top: Math.max(0, window.scrollY + rect.top - 76), behavior: 'smooth' });
  });
}

function FaqArticle({ article }) {
  const { t } = useLanguage();
  const [html, setHtml] = useState('');

  useEffect(() => {
    setHtml(buildArticleHtml(article.html, article.toc));
  }, [article]);

  return (
    <section className="faq-article">
      <div className="faq-article__bar">
        <button
          className="faq-article__back"
          type="button"
          onClick={() => window.history.back()}
          aria-label={t('faq.backToKnowledge')}
        >
          {t('faq.backToKnowledge')}
        </button>
      </div>

      {html ? (
        <>
          <nav className="faq-article__toc" aria-label={t('faq.tableOfContents')}>
            <h2 className="faq-article__toc-heading">{t('faq.sectionsTitle')}</h2>
            <ol className="faq-article__toc-list">
              {article.toc.map((entry, idx) => {
                const cleanEntry = entry.replace(/^\d+[\.\)]\s*/, '');
                return (
                  <li key={idx}>
                    <a href="#" onClick={(e) => { e.preventDefault(); scrollToSectionByIndex(idx + 1); }}>
                      <span className="toc-num">{idx + 1}.</span>
                      <span className="toc-title">{cleanEntry}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="faq-article__content" dangerouslySetInnerHTML={{ __html: html }} />
        </>
      ) : (
        <p className="faq-article__loading">{t('faq.loading')}</p>
      )}
    </section>
  );
}

export default function FaqPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [, forceUpdate] = useState(0);
  const { t, lang } = useLanguage();
  const modules = useMemo(() => t('faq.modules') || [], [t]);
  const articles = useMemo(() => t('knowledge.articles') || [], [t]);

  const faqArticles = useMemo(() => {
    const map = {};
    Object.entries(MODULE_SLUGS).forEach(([number, slug]) => {
      const found = articles.find((a) => a.slug === slug);
      if (found) map[number] = found;
    });
    return map;
  }, [articles]);

  const validModules = Object.keys(faqArticles);

  let activeModule = null;
  try {
    const m = searchParams.get('module');
    if (m && validModules.includes(m)) activeModule = m;
  } catch {}

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    setScrolled(window.scrollY > 400);
    const handler = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const savePos = (n) => {
    try { const el = document.querySelector('[data-module="' + n + '"]'); if (el) localStorage.setItem('faq-scroll-' + n, String(el.getBoundingClientRect().top + window.scrollY)); } catch {}
  };
  const restorePos = (n) => {
    try { const p = localStorage.getItem('faq-scroll-' + n); if (p && !isNaN(+p)) window.scrollTo({ top: +p, behavior: 'smooth' }); } catch {}
  };

  return (
    <>
      <button
        className={`faq-back-to-top${scrolled ? ' faq-back-to-top--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={t('articleMeta.toTop')}
      >
        ↑
      </button>

      {!activeModule && (
        <section className="page faq-page">
          <h1 className="page__title">{t('knowledge.title')}</h1>
          <div className="faq-page__grid">
            {modules.map((mod) => (
              <article className="faq-module" data-module={mod.number} key={`${lang}-${mod.number}`}>
                <span className="faq-module__number">{mod.number}</span>
                <div className="faq-module__content">
                  <h2 className="faq-module__title">{mod.title}</h2>
                  <p className="faq-module__text">{mod.text}</p>
                  <button
                    className="faq-module__link"
                    type="button"
                    onClick={() => { savePos(mod.number); setSearchParams({ module: mod.number }); forceUpdate(n => n + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >
                    {t('faq.openSection')}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeModule && faqArticles[activeModule] ? (
        <FaqArticle key={`${lang}-${activeModule}`} article={faqArticles[activeModule]} />
      ) : null}
    </>
  );
}
