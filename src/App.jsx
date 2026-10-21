import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RouteFallback from './components/RouteFallback';
import { lazyWithRetry } from './utils/lazyWithRetry';

// Главная остаётся в основном бандле: это точка входа, и ждать её отдельный
// чанк незачем. Остальные разделы подгружаются по переходу — так первый экран
// не тянет код страниц, которые посетитель может никогда не открыть.
const TuningPage = lazyWithRetry(() => import('./pages/TuningPage'));
const CustomPage = lazyWithRetry(() => import('./pages/CustomPage'));
const KnowledgeHubPage = lazyWithRetry(() => import('./pages/KnowledgeHubPage'));
const KnowledgeArticlePage = lazyWithRetry(() => import('./pages/KnowledgeArticlePage'));
const FaqRedirect = lazyWithRetry(() => import('./pages/FaqRedirect'));
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage'));
const ServicePage = lazyWithRetry(() => import('./pages/ServicePage'));
const WarrantyPage = lazyWithRetry(() => import('./pages/WarrantyPage'));
const ConsultationsPage = lazyWithRetry(() => import('./pages/ConsultationsPage'));
const PrivacyPage = lazyWithRetry(() => import('./pages/PrivacyPage'));
const LegalPage = lazyWithRetry(() => import('./pages/LegalPage'));
const NotFoundPage = lazyWithRetry(() => import('./pages/NotFoundPage'));
const CatalogApp = lazyWithRetry(() => import('./CatalogApp'));

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
