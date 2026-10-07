import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TuningPage from './pages/TuningPage';
import ServicePage from './pages/ServicePage';
import FaqPage from './pages/FaqPage';
import CustomPage from './pages/CustomPage';
import WarrantyPage from './pages/WarrantyPage';
import CatalogApp from './CatalogApp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tuning" element={<TuningPage />} />
        <Route path="service" element={<ServicePage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="custom" element={<CustomPage />} />
        <Route path="warranty" element={<WarrantyPage />} />
      </Route>
      <Route path="/catalog/*" element={<CatalogApp />} />
      {/* Неизвестный адрес (в том числе попадание через 404.html) — на главную. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
