import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';
import { getSeoForPath, updateDocumentSeo } from './data/seo';
import { useLanguage } from './i18n/I18nContext';
import './catalog.css';

const pdfUrl = `${import.meta.env.BASE_URL}zc33s_catalog_s.pdf`;

function CodeBadge({ code }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      });
    }
  };

  return (
    <button
      type="button"
      className="catalog-badge"
      onClick={handleCopy}
      title={t('catalog.copyTitle')}
      aria-label={`${t('catalog.copyAria')} ${code}`}
    >
      <span>{code}</span>
      {copied && <span className="catalog-badge__copied">{t('catalog.copied')}</span>}
    </button>
  );
}

function CatalogApp() {
  const { t, lang } = useLanguage();
  const catalog = t('catalog');
  const partsData = catalog?.parts || [];
  const storeLinks = catalog?.stores || [];

  useEffect(() => {
    window.scrollTo(0, 0);
    updateDocumentSeo(getSeoForPath('/catalog', lang));
  }, [lang]);

  return (
    <>
      <Background />
      <Header />
      <main className="catalog-root">
        <div className="catalog-container">
          {/* Hero-блок */}
          <section className="catalog-hero">
            <div className="catalog-hero__tag">
              <span className="catalog-hero__tag-dot" />
              <span>{catalog?.heroTag}</span>
            </div>
            <h1 className="catalog-hero__title">{catalog?.heroTitle}</h1>
            <p className="catalog-hero__subtitle">{catalog?.heroSubtitle}</p>
          </section>

          {/* PDF-баннер */}
          <section className="catalog-pdf-card">
            <div className="catalog-pdf-card__info">
              <span className="catalog-pdf-card__label">{catalog?.pdfLabel}</span>
              <h2 className="catalog-pdf-card__title">{catalog?.pdfTitle}</h2>
              <p className="catalog-pdf-card__desc">{catalog?.pdfDesc}</p>
            </div>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="catalog-pdf-card__btn"
            >
              <span>{catalog?.pdfButton}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </section>

          {/* Трёхколоночная сетка карточек деталей */}
          <section className="catalog-grid" aria-label={catalog?.gridAria}>
            {partsData.map((part, index) => (
              <article key={part.id} className="catalog-card">
                <div className="catalog-card__header">
                  <h3 className="catalog-card__title">{part.title}</h3>
                  <span className="catalog-card__num">#{String(index + 1).padStart(2, '0')}</span>
                </div>

                <div className="catalog-card__rows">
                  {part.rows.map((row, rIdx) => (
                    <div key={rIdx} className="catalog-card__row">
                      <span className="catalog-card__row-label">{row.label}</span>
                      <div className="catalog-card__row-badges">
                        {row.badges.map((badge, bIdx) => (
                          <CodeBadge key={bIdx} code={badge} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {part.desc && <p className="catalog-card__desc">{part.desc}</p>}

                {part.link && (
                  <a
                    href={part.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="catalog-card__link"
                  >
                    <span>{part.link.text}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                )}
              </article>
            ))}
          </section>

          {/* Секция «Где искать» */}
          <section className="catalog-stores">
            <div className="catalog-stores__header">
              <h2 className="catalog-stores__title">{catalog?.storesTitle}</h2>
              <p className="catalog-stores__subtitle">{catalog?.storesSubtitle}</p>
            </div>
            <div className="catalog-stores__grid">
              {storeLinks.map((store) => (
                <a
                  key={store.name}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="catalog-store-card"
                >
                  <span>{store.name}</span>
                  <span className="catalog-store-card__arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CatalogApp;
