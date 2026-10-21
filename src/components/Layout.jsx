import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Background from './Background';
import { getSeoForPath, updateDocumentSeo } from '../data/seo';
import { useLanguage } from '../i18n/I18nContext';

function Layout() {
  const location = useLocation();
  const { lang } = useLanguage();

  // Сбрасываем скролл и обновляем SEO-метаданные при смене маршрута или языка
  useEffect(() => {
    window.scrollTo(0, 0);
    const seo = getSeoForPath(location.pathname, lang);
    updateDocumentSeo(seo);
  }, [location.pathname, lang]);

  return (
    <>
      <Background />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
