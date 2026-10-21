// Статья «Краткое FAQ по авто» (RU).
// HTML и оглавление живут отдельно от словаря: они грузятся только при открытии статьи.
import html, { sectionIds } from '../../../data/faqShort.js';

export const toc = sectionIds;

export { html };

export default { toc, html };
