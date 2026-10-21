import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

import { cardsPlugin } from './plugins/cards-plugin.js';

// Тесты компонентов идут через jsdom и настоящий Vite-пайплайн: React.lazy,
// import.meta.glob, виртуальные модули карточек — как в браузере.
export default defineConfig({
  plugins: [
    react(),
    cardsPlugin({ directory: 'TuningCards', virtualPath: 'src/data/cards-tuning.js', name: 'tuning-cards' }),
    cardsPlugin({ directory: 'CustomCards', virtualPath: 'src/data/cards-custom.js', name: 'custom-cards' }),
  ],
  test: {
    environment: 'jsdom',
    include: ['tests/dom/**/*.test.jsx'],
    globals: false,
  },
});
