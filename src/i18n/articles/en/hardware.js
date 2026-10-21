// English version of the article.
// HTML и «toc» живут отдельно от словаря: они грузятся только при открытии статьи.
import { enHardwareHtml, enHardwareToc } from '../../knowledgeEn.js';

export const toc = enHardwareToc;

export const html = enHardwareHtml;

export default { toc, html };
