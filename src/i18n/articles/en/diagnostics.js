// English version of the article.
// HTML и «toc» живут отдельно от словаря: они грузятся только при открытии статьи.
import { enDiagnosticsHtml, enDiagnosticsToc } from '../../knowledgeEn.js';

export const toc = enDiagnosticsToc;

export const html = enDiagnosticsHtml;

export default { toc, html };
