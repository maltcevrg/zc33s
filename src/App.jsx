import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoading from './components/PageLoading';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const TuningPage = lazy(() => import('./pages/TuningPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const FaqRedirect = lazy(() => import('./pages/FaqRedirect'));
const KnowledgeHubPage = lazy(() => import('./pages/KnowledgeHubPage'));
const KnowledgeArticlePage = lazy(() => import('./pages/KnowledgeArticlePage'));
const CustomPage = lazy(() => import('./pages/CustomPage'));
const WarrantyPage = lazy(() => import('./pages/WarrantyPage'));
const ConsultationsPage = lazy(() => import('./pages/ConsultationsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const CatalogApp = lazy(() => import('./CatalogApp'));

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
          <ErrorBoundary>
            <Suspense fallback={<PageLoading />}><CatalogApp /></Suspense>
          </ErrorBoundary>
        }
      />
    </Routes>
  );
}

export default App;
