import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import faqShort, { sectionIds as shortIds } from '../data/faqShort';
import faqSelfFlashing, { sectionIds as selfFlashIds } from '../data/faqSelfFlashing';
import faqFlashGuides, { sectionIds as flashIds } from '../data/faqFlashGuides';
import faqBuyGuide, { sectionIds as buyIds } from '../data/faqBuyGuide';

const faqModules = [
  { number: '01', title: 'Краткое FAQ по авто', text: 'Ответы на основные вопросы о Suzuki Swift Sport: обслуживание, надёжность, особенности эксплуатации и подготовка автомобиля.' },
  { number: '02', title: 'Прошивка авто своими руками', text: 'Пошаговый материал о подготовке автомобиля, необходимом оборудовании, мерах безопасности и порядке самостоятельной прошивки.' },
  { number: '03', title: 'Гид по прошивкам', text: 'Разбираем виды прошивок, отличия между конфигурациями, ожидаемый результат и выбор решения под конкретные задачи.' },
  { number: '04', title: 'Гайд по покупке', text: 'Практические рекомендации по выбору Suzuki Swift Sport: проверка состояния, документов, истории обслуживания и тюнинга.' },
];

const faqArticles = {
  '01': { title: 'Краткое FAQ по авто', toc: shortIds, html: faqShort },
  '02': { title: 'Прошивка авто своими руками', toc: selfFlashIds, html: faqSelfFlashing },
  '03': { title: 'Гид по прошивкам', toc: flashIds, html: faqFlashGuides },
  '04': { title: 'Гайд по покупке', toc: buyIds, html: faqBuyGuide },
};

// For each TOC entry, find its heading in HTML and insert an anchor before it
function buildHtml(rawHtml, tocEntries) {
  let processed = rawHtml;
  let cumulativeOffset = 0; // adjust for previously inserted markers
  
  for (let i = 0; i < tocEntries.length; i++) {
    const rawTitle = tocEntries[i].replace(/<[^>]+>/g, '').trim();
    if (rawTitle.length < 8 || rawTitle.length > 120) continue;
    
    // Search for exact title text starting from adjusted position
    const searchFrom = Math.max(0, processed.length - 5000);
    let searchIdx = processed.indexOf(rawTitle, searchFrom);
    
    while (searchIdx > -1) {
      // Walk back to find opening bracket '<'
      let pStart = Math.max(0, searchIdx - 500);
      while (pStart > 0 && processed[pStart] !== '<') pStart--;
      
      const beforeText = processed.slice(pStart, searchIdx).toLowerCase();
      const closePIdx = processed.indexOf('</p>', searchIdx + rawTitle.length);
      
      if (closePIdx === -1) break;
      
      const segLen = closePIdx - pStart;
      
      // Must look like <p...><strong>TITLE</strong>...</p> within reasonable segment size
      const hasMarker = /(<p|<h\d).*?<strong/i.test(beforeText);
      // Exclude non-heading segments (li, ul+ol starts, tables)
      const topSegment = processed.slice(Math.max(0, pStart - 2), pStart).toLowerCase();
      const isNonHeading = /^(<\/?li)/i.test(topSegment.replace(/\s/g, '')) 
        || /^(<ul\s*style=[^>]*list-style-type:\s*disc)/i.test(processed.slice(Math.max(0, pStart-50), pStart));
      
      if (!hasMarker || !isFinite(segLen) || segLen > 400 || isNonHeading) {
        // Try next occurrence
        searchIdx = processed.indexOf(rawTitle, searchIdx + 1);
        continue;
      }
      
      // Found a real heading — insert anchor marker BEFORE this paragraph tag
      const actualPos = pStart + cumulativeOffset;
      const marker = `<span style="display:inline;" id="section-${i + 1}">`;
      processed = processed.slice(0, actualPos) + marker + processed.slice(actualPos);
      cumulativeOffset += marker.length;
      
      break; // Move to next TOC item
    }
  }
  
  return processed;
}

function scrollToSectionByIndex(idx) {
  requestAnimationFrame(() => {
    const target = document.getElementById('section-' + idx);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    window.scrollTo({ top: Math.max(0, window.scrollY + rect.top - 76), behavior: 'smooth' });
  });
}

function FaqArticle({ article }) {
  const [html, setHtml] = useState('');
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    setHtml(buildHtml(article.html, article.toc));
  }, []);

  // Toggle floating nav visibility on scroll
  useEffect(() => {
    const onUpdate = () => setShowFloat(window.scrollY > 300);
    onUpdate();
    window.addEventListener('scroll', onUpdate, { passive: true });
    return () => window.removeEventListener('scroll', onUpdate);
  }, []);

  return (
    <section className="faq-article">
      <div className="faq-article__bar">
        <button className="faq-article__back" type="button" onClick={() => window.history.back()} aria-label="Вернуться к оглавлению разделов">← Вернуться к базе знаний</button>
      </div>

      {html ? (
        <>
          <nav className={`faq-article__toc${showFloat ? ' faq-article__toc--floating' : ''}`} aria-label="Оглавление">
            <h2>Разделы</h2>
            <ol>
              {article.toc.map((entry, idx) => (
                <li key={idx}>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToSectionByIndex(idx + 1); }} dangerouslySetInnerHTML={{ __html: `<span class="toc-num">${idx + 1}.</span> ${entry}` }} />
                </li>
              ))}
            </ol>
          </nav>
          <div className="faq-article__content" dangerouslySetInnerHTML={{ __html: html }} />
        </>
      ) : (
        <p className="faq-article__loading">Загрузка материала…</p>
      )}
    </section>
  );
}

export default function FaqPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [, forceUpdate] = useState(0);
  const validModules = Object.keys(faqArticles);
  
  let activeModule = null;
  try {
    const m = searchParams.get('module');
    if (m && validModules.includes(m)) activeModule = m;
  } catch {}
  
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    setScrolled(window.scrollY > 400);
    const handler = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const savePos = (n) => {
    try { const el = document.querySelector('[data-module="' + n + '"]'); if (el) localStorage.setItem('faq-scroll-' + n, String(el.getBoundingClientRect().top + window.scrollY)); } catch {}
  };
  const restorePos = (n) => {
    try { const p = localStorage.getItem('faq-scroll-' + n); if (p && !isNaN(+p)) window.scrollTo({ top: +p, behavior: 'smooth' }); } catch {}
  };

  return (
    <>
      <button className={`faq-back-to-top${scrolled ? ' faq-back-to-top--visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Наверх">↑</button>

      {!activeModule && (
        <section className="page faq-page">
          <h1 className="page__title">База знаний</h1>
          <div className="faq-page__grid">
            {faqModules.map((mod) => (
              <article className="faq-module" data-module={mod.number} key={mod.number}>
                <span className="faq-module__number">{mod.number}</span>
                <div className="faq-module__content">
                  <h2 className="faq-module__title">{mod.title}</h2>
                  <p className="faq-module__text">{mod.text}</p>
                  <button className="faq-module__link" type="button" onClick={() => { savePos(mod.number); setSearchParams({ module: mod.number }); forceUpdate(n => n + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Открыть раздел</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeModule && faqArticles[activeModule] ? (
        <FaqArticle article={faqArticles[activeModule]} />
      ) : null}
    </>
  );
}
