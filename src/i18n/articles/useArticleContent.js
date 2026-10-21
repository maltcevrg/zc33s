import { useEffect, useState } from 'react';
import { loadArticleContent } from './index';
import { buildArticleHtml } from '../../utils/articleAnchors';

// Состояние загрузки статьи: 'loading' → 'ready' | 'missing' | 'error'.
// Загрузка асинхронная (динамический import), поэтому страница показывает
// заглушку, пока текст не пришёл.
const INITIAL = { status: 'loading', html: '', toc: [] };

/**
 * @param {string} lang — текущий язык интерфейса
 * @param {string} slug — идентификатор статьи
 * @returns {{ status: string, html: string, toc: string[] }}
 */
export function useArticleContent(lang, slug) {
  const [state, setState] = useState(INITIAL);

  useEffect(() => {
    if (!slug) {
      setState({ status: 'missing', html: '', toc: [] });
      return undefined;
    }

    let cancelled = false;
    setState(INITIAL);

    loadArticleContent(lang, slug)
      .then((content) => {
        if (cancelled) return;
        if (!content || !content.html) {
          setState({ status: 'missing', html: '', toc: [] });
          return;
        }
        setState({
          status: 'ready',
          // Якоря #section-N расставляются один раз при загрузке, а не на каждом рендере.
          html: buildArticleHtml(content.html, content.toc),
          toc: content.toc,
        });
      })
      .catch((error) => {
        if (cancelled) return;
        console.error('[article] failed to load:', slug, error);
        setState({ status: 'error', html: '', toc: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [lang, slug]);

  return state;
}

export default useArticleContent;
