import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RouteFallback from './components/RouteFallback';

// Главная остаётся в основном бандле: это точка входа, и ждать её отдельный
// чанк незачем. Остальные разделы подгружаются по переходу — так первый экран
// не тянет код страниц, которые посетитель может никогда не открыть.
const TuningPage = lazy(() => import('./pages/TuningPage'));
const CustomPage = lazy(() => import('./pages/CustomPage'));
const KnowledgeHubPage = lazy(() => import('./pages/KnowledgeHubPage'));
const KnowledgeArticlePage = lazy(() => import('./pages/KnowledgeArticlePage'));
const FaqRedirect = lazy(() => import('./pages/FaqRedirect'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const WarrantyPage = lazy(() => import('./pages/WarrantyPage'));
const ConsultationsPage = lazy(() => import('./pages/ConsultationsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const CatalogApp = lazy(() => import('./CatalogApp'));

// Suspense живёт внутри Layout (вокруг <Outlet />), чтобы шапка и подвал
// не пропадали на время загрузки чанка страницы. Каталог — отдельный маршрут
// вне Layout, поэтому ему нужен свой Suspense.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tuning" element={<TuningPage />} />
        <Route path="custom" element={<CustomPage />} />
        <Route path="knowledge" element={<KnowledgeHubPage />} />
        <Route path="knowledge/:slug" element={<KnowledgeArticlePage />} />
        <Route path="faq" element={<FaqRedirect />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="service" element={<ServicePage />} />
        <Route path="warranty" element={<WarrantyPage />} />
        <Route path="consultations" element={<ConsultationsPage />} />
        <Route path="purchase" element={<Navigate to="/consultations" replace />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="legal" element={<LegalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route
        path="/catalog/*"
        element={
          <Suspense fallback={<RouteFallback />}>
            <CatalogApp />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
