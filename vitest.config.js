import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

import { cardsPlugin } from './plugins/cards-plugin.js';

// Тесты компонентов идут через jsdom и настоящий Vite-пайплайн: React.lazy,
// import.meta.glob, виртуальные модули карточек — как в браузере.
export default defineConfig({
  plugins: [
    react(),
    cardsPlugin({ directory: 'TuningCards', moduleId: 'virtual:tuning-cards', name: 'tuning-cards' }),
    cardsPlugin({ directory: 'CustomCards', moduleId: 'virtual:custom-cards', name: 'custom-cards' }),
  ],
  test: {
    environment: 'jsdom',
    include: ['tests/dom/**/*.test.jsx'],
    globals: false,
  },
});
