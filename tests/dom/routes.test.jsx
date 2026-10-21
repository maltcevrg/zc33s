import { test, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from '../../src/App';
import { LanguageProvider } from '../../src/i18n/I18nContext';
import { ThemeProvider } from '../../src/theme/ThemeContext';

function renderRoute(route) {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

const ROUTES = [
  ['/', /Swift Sport Tuning/i],
  ['/tuning', /Прошивки|ECU Tunes/i],
  ['/custom', /Компоненты|Components/i],
  ['/knowledge', /База знаний|Knowledge/i],
  ['/about', /О проекте|About/i],
  ['/warranty', /Гарант|Warranty/i],
  ['/consultations', /Консультац|Consultations/i],
  ['/privacy', /Политика|Privacy/i],
  ['/legal', /Правов|Legal/i],
];

for (const [route, pattern] of ROUTES) {
  test(`маршрут ${route} отрисовывается`, async () => {
    renderRoute(route);
    expect(await screen.findByRole('heading', { level: 1 }, { timeout: 4000 })).toBeTruthy();
    expect(document.body.textContent).toMatch(pattern);
    cleanup();
  });
}
