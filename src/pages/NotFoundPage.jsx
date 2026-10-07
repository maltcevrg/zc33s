import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateDocumentSeo } from '../data/seo';

function NotFoundPage() {
  useEffect(() => {
    updateDocumentSeo({
      title: '404 — Страница не найдена | SST',
      description:
        'Страница не найдена. Возможно, материал был перемещён. Перейдите на главную или откройте базу знаний.',
    });
  }, []);

  return (
    <section className="page not-found-page">
      <div className="not-found-page__inner">
        <span className="not-found-page__code">404</span>
        <h1 className="not-found-page__title">Страница не найдена</h1>
        <p className="not-found-page__text">
          Возможно, материал был перемещён. Перейдите на главную или откройте базу знаний.
        </p>
        <div className="not-found-page__actions">
          <Link to="/" className="not-found-page__btn not-found-page__btn--primary">
            На главную
          </Link>
          <Link to="/knowledge" className="not-found-page__btn not-found-page__btn--secondary">
            База знаний
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
