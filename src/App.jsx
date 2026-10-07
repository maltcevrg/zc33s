import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TuningPage from './pages/TuningPage';
import ServicePage from './pages/ServicePage';
import FaqPage from './pages/FaqPage';
import CustomPage from './pages/CustomPage';
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
      </Route>
      <Route path="/catalog/*" element={<CatalogApp />} />
    </Routes>
  );
}

export default App;
