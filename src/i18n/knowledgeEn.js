// Совместимость со старым форматом экспорта. Приложение загружает статьи
// по одной через articleContent.js, а не импортирует этот полный набор.
import { enKnowledgeArticles } from './knowledgeArticles.js';

export { default as enFaqShortHtml } from './articles/en/zc33s-faq.js';
export { default as enFaqSelfHtml } from './articles/en/ecu-flashing.js';
export { default as enFaqFlashHtml } from './articles/en/tuning-stages.js';
export { default as enFaqBuyHtml } from './articles/en/buying-zc33s.js';
export { default as enDiagnosticsHtml } from './articles/en/diagnostics.js';
export { default as enHardwareHtml } from './articles/en/hardware.js';

const toc = (slug) => enKnowledgeArticles.find((article) => article.slug === slug).toc;
export const enSectionIds = {
  faqShort: toc('zc33s-faq'),
  selfFlash: toc('ecu-flashing'),
  flashGuides: toc('tuning-stages'),
  buyGuide: toc('buying-zc33s'),
};
export const enDiagnosticsToc = toc('diagnostics');
export const enHardwareToc = toc('hardware');
