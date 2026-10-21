import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateDocumentSeo } from '../data/seo';
import { useLanguage } from '../i18n/I18nContext';

function NotFoundPage() {
  const { t, lang } = useLanguage();
  const content = t('notFound');

  useEffect(() => {
    const seo = (t('seo') || {})['/404'] || {
      title: '404 — Страница не найдена | SST',
      description: content?.text,
    };
    updateDocumentSeo({
      title: `404 — ${content?.title} | SST`,
      description: content?.text,
      ...seo,
    });
  }, [lang, content, t]);

  return (
    <section className="page not-found-page">
      <div className="not-found-page__inner">
        <span className="not-found-page__code">404</span>
        <h1 className="not-found-page__title">{content?.title}</h1>
        <p className="not-found-page__text">{content?.text}</p>
        <div className="not-found-page__actions">
          <Link to="/" className="not-found-page__btn not-found-page__btn--primary">
            {content?.toHome}
          </Link>
          <Link to="/knowledge" className="not-found-page__btn not-found-page__btn--secondary">
            {content?.toKnowledge}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
