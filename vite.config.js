import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cardsPlugin } from './plugins/cards-plugin.js';
import { parseCard } from './plugins/parse-card.js';
import { getSeoForPath, SEO_DATA } from './src/data/seo.js';

// Маршруты приложения. GitHub Pages не умеет SPA-фолбэк, поэтому для каждого
// раздела нужна собственная оболочка index.html — иначе прямая ссылка и
// обновление страницы на /zc33s/tuning отдают 404.
//
// Список берётся из реестра SEO-метаданных (src/data/seo.js), а не
// переписывается руками: новая страница = новый ключ в seoContent, и оболочка
// появится сама. Оболочки нужны и редиректам — иначе прямая ссылка на /faq
// упрётся в 404 GitHub Pages раньше, чем сработает роутер.
const REDIRECT_ROUTES = [
  { path: '/faq', seoPath: '/knowledge' },
  { path: '/purchase', seoPath: '/consultations' },
];

const spaRoutes = [
  ...Object.keys(SEO_DATA)
    .filter((path) => path !== '/' && path !== '/404')
    .map((path) => ({ path, seoPath: path })),
  ...REDIRECT_ROUTES,
];

function injectSeoToHtml(html, seo) {
  if (!seo) return html;
  let result = html;
  if (seo.title) {
    result = result.replace(/<title>.*?<\/title>/s, `<title>${seo.title}</title>`);
  }
  if (seo.description) {
    result = result.replace(
      /<meta name="description" content=".*?" \/>/s,
      `<meta name="description" content="${seo.description}" />`
    );
  }
  if (seo.canonical) {
    result = result.replace(
      /<link rel="canonical" href=".*?" \/>/s,
      `<link rel="canonical" href="${seo.canonical}" />`
    );
    result = result.replace(
      /<meta property="og:url" content=".*?" \/>/s,
      `<meta property="og:url" content="${seo.canonical}" />`
    );
  }
  if (seo.alternates) {
    for (const [code, href] of Object.entries(seo.alternates)) {
      const tag = `<link rel="alternate" hreflang="${code}" href="${href}" />`;
      const existing = new RegExp(`<link rel="alternate" hreflang="${code}" href=".*?" />`, 's');
      result = existing.test(result)
        ? result.replace(existing, tag)
        : result.replace('</head>', `  ${tag}\n  </head>`);
    }
  }
  if (seo.robots) {
    const tag = `<meta name="robots" content="${seo.robots}" />`;
    result = result.includes('<meta name="robots"')
      ? result.replace(/<meta name="robots" content=".*?" \/>/s, tag)
      : result.replace('</head>', `  ${tag}\n  </head>`);
  }
  if (seo.ogTitle || seo.title) {
    const titleVal = seo.ogTitle || seo.title;
    result = result.replace(
      /<meta property="og:title" content=".*?" \/>/s,
      `<meta property="og:title" content="${titleVal}" />`
    );
    result = result.replace(
      /<meta name="twitter:title" content=".*?" \/>/s,
      `<meta name="twitter:title" content="${titleVal}" />`
    );
  }
  if (seo.ogDescription || seo.description) {
    const descVal = seo.ogDescription || seo.description;
    result = result.replace(
      /<meta property="og:description" content=".*?" \/>/s,
      `<meta property="og:description" content="${descVal}" />`
    );
    result = result.replace(
      /<meta name="twitter:description" content=".*?" \/>/s,
      `<meta name="twitter:description" content="${descVal}" />`
    );
  }
  if (seo.ogImage) {
    result = result.replace(
      /<meta property="og:image" content=".*?" \/>/s,
      `<meta property="og:image" content="${seo.ogImage}" />`
    );
    result = result.replace(
      /<meta name="twitter:image" content=".*?" \/>/s,
      `<meta name="twitter:image" content="${seo.ogImage}" />`
    );
  }
  return result;
}

function spaFallbackPlugin(routes) {
  let outDir = 'dist';

  return {
    name: 'spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const shellPath = join(outDir, 'index.html');
      if (!existsSync(shellPath)) return;

      const shell = readFileSync(shellPath, 'utf8');
      for (const route of routes) {
        const routeDirectory = join(outDir, route.path);
        mkdirSync(routeDirectory, { recursive: true });
        const routeSeo = getSeoForPath(route.seoPath);
        const routeHtml = injectSeoToHtml(shell, routeSeo);
        writeFileSync(join(routeDirectory, 'index.html'), routeHtml);
      }

      // Неизвестный адрес Pages отдаст со статусом 404, а роутер перенаправит
      // на NotFoundPage (catch-all в src/App.jsx). noindex — чтобы ошибочный
      // адрес не попал в индекс вместо главной.
      const notFoundSeo = { ...getSeoForPath('/404'), robots: 'noindex, follow' };
      writeFileSync(join(outDir, '404.html'), injectSeoToHtml(shell, notFoundSeo));
    },
  };
}

// Реэкспорт для тестов формата card.txt (tests/cards.test.mjs).
export { parseCard };

export default defineConfig({
  plugins: [
    react(),
    spaFallbackPlugin(spaRoutes),
    cardsPlugin({
      directory: 'TuningCards',
      moduleId: 'virtual:tuning-cards',
      name: 'tuning-cards',
    }),
    cardsPlugin({
      directory: 'CustomCards',
      moduleId: 'virtual:custom-cards',
      name: 'custom-cards',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // React и роутер меняются редко, страницы — часто. Разные чанки дают
        // кэшу браузера переиспользовать vendor после каждой выкатки контента.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (
            /node_modules\/(react|react-dom|scheduler|react-router|react-router-dom|@remix-run)\//.test(id)
          ) {
            return 'vendor-react';
          }
          return 'vendor';
        },
      },
    },
  },
  base: '/zc33s/',
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
