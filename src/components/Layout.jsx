import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Background from './Background';
import { getSeoForPath, updateDocumentSeo } from '../data/seo';

function Layout() {
  const location = useLocation();

  // Сбрасываем скролл и обновляем SEO-метаданные при смене маршрута
  useEffect(() => {
    window.scrollTo(0, 0);
    const seo = getSeoForPath(location.pathname);
    updateDocumentSeo(seo);
  }, [location.pathname]);

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
