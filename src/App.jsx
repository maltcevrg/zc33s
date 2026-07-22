import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TuningPage from './pages/TuningPage';
import ServicePage from './pages/ServicePage';
import FaqPage from './pages/FaqPage';
import CustomPage from './pages/CustomPage';

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
    </Routes>
  );
}

export default App;
