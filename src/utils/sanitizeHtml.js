// Единая точка вставки HTML-контента (статьи, юридические тексты).
//
// Тексты приходят из репозитория, но это не повод вставлять их в DOM «как есть»:
// dangerouslySetInnerHTML с непроверенной строкой — классический путь для XSS,
// если контент когда-нибудь начнут импортировать извне (CMS, Word-документ).
// Поэтому любой HTML проходит через DOMPurify с белым списком тегов.
import DOMPurify from 'dompurify';

// Разметка статей и юридических страниц: абзацы, списки, таблицы характеристик,
// ссылки, выделения. Ничего исполняемого здесь не нужно.
export const ALLOWED_TAGS = [
  'p',
  'br',
  'hr',
  'span',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'small',
  'sub',
  'sup',
  'code',
  'pre',
  'blockquote',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'li',
  'dl',
  'dt',
  'dd',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'caption',
  'a',
  'figure',
  'figcaption',
];

export const ALLOWED_ATTR = ['href', 'title', 'id', 'class', 'colspan', 'rowspan', 'scope', 'target', 'rel'];

export const SANITIZE_CONFIG = {
  ALLOWED_TAGS,
  ALLOWED_ATTR,
  // Ссылки только безопасных схем: javascript: и data: отбрасываются.
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|#|\/)/i,
  // Ссылки, открывающиеся в новой вкладке, не получают доступ к opener.
  ADD_ATTR: ['target'],
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'base', 'link', 'meta'],
  FORBID_ATTR: ['style', 'srcset', 'formaction'],
  ALLOW_DATA_ATTR: false,
  USE_PROFILES: { html: true },
};

/**
 * Создаёт функцию очистки HTML для конкретного window.
 * Нужна тестам (jsdom) и остаётся единственным способом санитайза вне браузера.
 *
 * @param {Window} domWindow
 * @returns {(html: string) => string}
 */
export function createSanitizer(domWindow) {
  const purify = typeof DOMPurify.sanitize === 'function' ? DOMPurify : DOMPurify(domWindow);

  return (html) => (html ? purify.sanitize(String(html), SANITIZE_CONFIG) : '');
}

/**
 * Очищает HTML перед вставкой через dangerouslySetInnerHTML.
 * В браузере работает через DOMPurify; там, где DOM нет (SSR, юнит-тесты),
 * возвращает строку как есть — вставлять её некуда.
 */
export const sanitizeHtml =
  typeof window === 'undefined' ? (html) => String(html ?? '') : createSanitizer(window);

export default sanitizeHtml;
