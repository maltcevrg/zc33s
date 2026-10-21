// Статья «Гид по прошивкам и стадиям тюнинга» (RU).
// HTML и оглавление живут отдельно от словаря: они грузятся только при открытии статьи.
import html, { sectionIds } from '../../../data/faqFlashGuides.js';

export const toc = sectionIds;

export { html };

export default { toc, html };
