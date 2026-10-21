// Статья «Гайд по покупке» (RU).
// HTML и оглавление живут отдельно от словаря: они грузятся только при открытии статьи.
import html, { sectionIds } from '../../../data/faqBuyGuide.js';

export const toc = sectionIds;

export { html };

export default { toc, html };
