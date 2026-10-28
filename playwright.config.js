import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  use: {
    baseURL: 'http://localhost:4173/zc33s/',
    browserName: 'chromium',
    locale: 'ru-RU',
    viewport: { width: 1400, height: 900 },
    trace: 'retain-on-failure',
    launchOptions: process.env.CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  webServer: {
    command: 'npm run preview -- --host 0.0.0.0 --port 4173 --strictPort',
    url: 'http://localhost:4173/zc33s/',
    reuseExistingServer: !process.env.CI,
  },
});
