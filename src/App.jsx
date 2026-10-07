import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TuningPage from './pages/TuningPage';
import ServicePage from './pages/ServicePage';
import FaqRedirect from './pages/FaqRedirect';
import KnowledgeHubPage from './pages/KnowledgeHubPage';
import KnowledgeArticlePage from './pages/KnowledgeArticlePage';
import CustomPage from './pages/CustomPage';
import WarrantyPage from './pages/WarrantyPage';
import PurchasePage from './pages/PurchasePage';
import AboutPage from './pages/AboutPage';
import CatalogApp from './CatalogApp';

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
        <Route path="purchase" element={<PurchasePage />} />
      </Route>
      <Route path="/catalog/*" element={<CatalogApp />} />
      {/* Неизвестный адрес (в том числе попадание через 404.html) — на главную. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
