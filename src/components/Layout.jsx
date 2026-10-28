import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import PageLoading from './PageLoading';
import Footer from './Footer';
import Background from './Background';
import ErrorBoundary from './ErrorBoundary';
import { getSeoForPath, updateDocumentSeo } from '../data/seo';
import { useLanguage } from '../i18n/I18nContext';

function Layout() {
  const location = useLocation();
  const { lang } = useLanguage();

  // Сбрасываем скролл и обновляем SEO-метаданные при смене маршрута или языка
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
    const seo = getSeoForPath(location.pathname, lang);
    updateDocumentSeo(seo);
  }, [location.pathname, location.hash, location.key, lang]);

  return (
    <>
      <Background />
      <Header />
      <main>
        <ErrorBoundary resetKey={`${location.pathname}:${lang}`}>
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
