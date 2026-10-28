import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../i18n/I18nContext';
import ManualContent from '../features/manual/ManualContent.jsx';
import ManualNavigation from '../features/manual/ManualNavigation';
import ManualImageDialog from '../features/manual/ManualImageDialog';
import { createDocumentLoader, documentOutline, findManual, manualHref, pushRecent, readStoredIds, toggleId, withSnippet, writeStoredIds } from '../features/manual/model';
import { fillLabel } from '../features/manual/manualContent';
import '../features/manual/manual.scss';

const SCHEMA_VERSION = 3;
const asset = path => `${import.meta.env.BASE_URL}manual/${path}`;
const RESULTS_STEP = 30;
const RECENT_KEY = 'zc33s-manual-recent';const BOOKMARKS_KEY = 'zc33s-manual-bookmarks';
const browserStorage = () => {try{return window.localStorage;}catch{return null;}};
const isTyping = target => target instanceof HTMLElement&&(target.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(target.tagName));

export default function RepairManualPage() {
  const { t, lang }=useLanguage();const labels=t('manual');
  const [params]=useSearchParams();const location=useLocation();
  const [index,setIndex]=useState(null);const [indexError,setIndexError]=useState(false);
  const [search,setSearch]=useState(null);const [searchWanted,setSearchWanted]=useState(false);
  const [retry,setRetry]=useState(0);const [query,setQuery]=useState('');const [expanded,setExpanded]=useState(false);
  const [state,setState]=useState({id:null,document:null,error:false});const [image,setImage]=useState(null);
  const [copyState,setCopyState]=useState('');const [manualCopy,setManualCopy]=useState('');
  const documentLoader=useMemo(()=>createDocumentLoader(),[]);
  const indexLoader=useMemo(()=>createDocumentLoader(),[]);const searchLoader=useMemo(()=>createDocumentLoader(),[]);
  const firstOpen=useRef(true);const titleRef=useRef(null);
  const selectedId=params.get('doc')||index?.documents[0]?.id;
  const entry=index?.documents.find(d=>d.id===selectedId);
  const current=state.id===selectedId?state.document:null;
  const error=state.id===selectedId&&state.error;
  // Typing stays responsive; the result list follows the deferred query.
  const searchQuery=useDeferredValue(query);const [shownResults,setShownResults]=useState(RESULTS_STEP);
  const matches=useMemo(()=>search?findManual(search,searchQuery):[],[search,searchQuery]);
  const results=useMemo(()=>matches.slice(0,shownResults).map(entry=>withSnippet(entry,searchQuery)),[matches,shownResults,searchQuery]);
  const storage=useMemo(browserStorage,[]);
  const [recentIds,setRecentIds]=useState(()=>readStoredIds(storage,RECENT_KEY));
  const [bookmarkIds,setBookmarkIds]=useState(()=>readStoredIds(storage,BOOKMARKS_KEY));
  const [showTop,setShowTop]=useState(false);
  const byId=useMemo(()=>new Map(index?.documents.map(d=>[d.id,d])??[]),[index]);
  const listed=ids=>ids.map(id=>byId.get(id)).filter(Boolean);
  const outline=useMemo(()=>current?documentOutline(current.body):[],[current]);
  const count=index?.documents.length??'';

  useEffect(()=>{
    setIndexError(false);
    indexLoader.load(asset('index.json')).then(catalog=>{
      if(!catalog)return;
      if(catalog.schemaVersion!==SCHEMA_VERSION||!Array.isArray(catalog.documents)||!Array.isArray(catalog.sections)||!Array.isArray(catalog.chapters))throw new Error('Unsupported manual format');
      setIndex(catalog);
    }).catch(()=>setIndexError(true));
    return ()=>indexLoader.cancel();
  },[indexLoader,retry]);

  // The full-text index is the largest file; it is fetched only once someone searches.
  useEffect(()=>{
    if(!searchWanted||search)return;
    searchLoader.load(asset('search.json')).then(entries=>{
      if(!entries)return;
      if(!Array.isArray(entries))throw new Error('Unsupported search format');
      setSearch(entries);
    }).catch(()=>setIndexError(true));
    return ()=>searchLoader.cancel();
  },[searchLoader,searchWanted,search,retry]);

  useEffect(()=>{
    setCopyState('');setManualCopy('');setImage(null);
    if(!entry){documentLoader.cancel();return;}
    setState({id:selectedId,document:null,error:false});
    documentLoader.load(asset(entry.path)).then(doc=>{
      if(!doc)return;
      if(doc.schemaVersion!==SCHEMA_VERSION||doc.id!==selectedId||!Array.isArray(doc.body))throw new Error('Invalid manual document');
      setState({id:selectedId,document:doc,error:false});
    }).catch(()=>setState({id:selectedId,document:null,error:true}));
    return ()=>documentLoader.cancel();
  },[selectedId,entry,documentLoader,retry]);

  useEffect(()=>{
    if(!current)return;
    const frame=requestAnimationFrame(()=>{
      const anchor=location.hash?decodeURIComponent(location.hash.slice(1)):'';
      const target=(anchor&&document.getElementById(anchor))||titleRef.current;
      if(anchor||!firstOpen.current){target?.scrollIntoView({block:'start'});titleRef.current?.focus({preventScroll:true});}
      firstOpen.current=false;
    });
    return ()=>cancelAnimationFrame(frame);
  },[current,location.hash]);

  useEffect(()=>{setShownResults(RESULTS_STEP);},[searchQuery]);
  useEffect(()=>{if(current)setRecentIds(ids=>pushRecent(ids,current.id));},[current]);
  useEffect(()=>{writeStoredIds(storage,RECENT_KEY,recentIds);},[storage,recentIds]);
  useEffect(()=>{writeStoredIds(storage,BOOKMARKS_KEY,bookmarkIds);},[storage,bookmarkIds]);

  useEffect(()=>{
    const onScroll=()=>setShowTop(window.scrollY>1200);
    const onKey=e=>{
      if(e.key!=='/'||e.ctrlKey||e.metaKey||e.altKey||isTyping(e.target)||document.querySelector('dialog[open]'))return;
      const input=document.getElementById('manual-search-input');if(!input)return;
      e.preventDefault();setExpanded(true);input.focus();input.select();
    };
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});document.addEventListener('keydown',onKey);
    return ()=>{window.removeEventListener('scroll',onScroll);document.removeEventListener('keydown',onKey);};
  },[]);

  useEffect(()=>{
    if(current)document.title=`${current.title} | ${labels.title} | SST`;
  },[current,labels.title,lang]);

  async function copyLink(){
    try{
      if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(window.location.href);setCopyState('copied');setManualCopy('');
    }catch{setCopyState('manual');setManualCopy(window.location.href);}
  }
  const position=index?.documents.findIndex(d=>d.id===selectedId)??-1;
  const target=index?.targets[selectedId];
  const section=current&&index.sections.find(s=>s.id===current.sectionId);
  const loading=!!entry&&!current&&!error;
  const bookmarked=!!current&&bookmarkIds.includes(current.id);
  function toTop(){titleRef.current?.scrollIntoView({block:'start'});titleRef.current?.focus({preventScroll:true});}
  return <section className="manual-page">
    <Link className="manual-page__back" to="/knowledge">{labels.back}</Link>
    <header className="manual-page__header"><div><h1>{labels.title}</h1><p>{labels.car}</p></div>{index&&<p className="manual-page__scope">{fillLabel(labels.scope,{count})}</p>}</header>
    {indexError?<div className="manual-state" role="alert"><p>{labels.error}</p><button type="button" onClick={()=>setRetry(n=>n+1)}>{labels.retry}</button></div>:!index?<p className="manual-state" role="status">{labels.loading}</p>:<div className="manual-workspace">
      <ManualNavigation chapters={index.chapters} sections={index.sections} documents={index.documents} results={results} total={matches.length} onShowMore={()=>setShownResults(n=>n+RESULTS_STEP)} recent={listed(recentIds)} bookmarks={listed(bookmarkIds)} onClearRecent={()=>setRecentIds([])} searchReady={!!search} query={query} onQueryChange={value=>{setQuery(value);if(value.trim()){setSearchWanted(true);setExpanded(true);}}} selectedId={selectedId} expanded={expanded} onExpandedChange={setExpanded} labels={labels}/>
      <div className="manual-reader" aria-busy={loading}>
        {loading?<p className="manual-state" role="status">{labels.loadingDocument}</p>:error?<div className="manual-state" role="alert"><p>{labels.error}</p><button type="button" onClick={()=>setRetry(n=>n+1)}>{labels.retry}</button></div>:current?<article>
          <header className="manual-document-header">
            <p className="manual-breadcrumb" lang="ru"><span className="manual-capitalize">{section?.title}</span> <span aria-hidden="true">/</span> {current.groupTitle}{current.variant&&<> <span aria-hidden="true">/</span> {current.variant}</>}</p>
            <h2 className="manual-document-title" tabIndex={-1} ref={titleRef} lang="ru">{current.title}</h2>
            <p className="manual-source-note">{labels.sourceNote} {fillLabel(labels.sectionNote,{section:section?.number})}{current.variant&&<>, {fillLabel(labels.variantNote,{variant:current.variant})}</>}.</p>
            <div className="manual-toolbar"><button type="button" aria-pressed={bookmarked} className="manual-bookmark" onClick={()=>setBookmarkIds(ids=>toggleId(ids,current.id))}><span aria-hidden="true">{bookmarked?'★':'☆'}</span> {bookmarked?labels.bookmarked:labels.bookmark}</button><button type="button" onClick={copyLink}>{copyState==='copied'?labels.copied:labels.copy}</button><button type="button" onClick={()=>window.print()}>{labels.print}</button><span className="manual-source-id">{current.id}</span></div>
            <span role="status" className="manual-copy-status">{copyState==='copied'?labels.copied:''}</span>
            {copyState==='manual'&&<label className="manual-copy-fallback">{labels.manualCopy}<input readOnly value={manualCopy} onFocus={e=>e.target.select()}/></label>}
          </header>
          {outline.length>=3&&<nav className="manual-outline" aria-label={labels.onThisPage}>
            <h3>{labels.onThisPage}</h3>
            <ol lang="ru">{outline.map(item=><li key={item.id} className={item.depth?'manual-outline__sub':undefined}><Link to={manualHref(current.id,item.id)} onClick={()=>{if(decodeURIComponent(location.hash.slice(1))===item.id)document.getElementById(item.id)?.scrollIntoView({block:'start'});}}><span className="manual-capitalize">{item.title}</span></Link></li>)}</ol>
          </nav>}
          <ManualContent document={current} targets={index.targets} onOpenImage={setImage} labels={labels}/>
          <nav className="manual-pagination" aria-label={labels.contents}>
            {position>0&&<Link to={manualHref(index.documents[position-1].id)}><span>{labels.previous}</span><strong lang="ru">{index.documents[position-1].title}</strong></Link>}
            {position<index.documents.length-1&&<Link to={manualHref(index.documents[position+1].id)}><span>{labels.next}</span><strong lang="ru">{index.documents[position+1].title}</strong></Link>}
          </nav>
        </article>:<div className="manual-state"><h2 lang="ru">{target?.title||labels.unknown}</h2><p>{target?labels.unavailable:labels.unknownNote}</p>{target&&<p>{fillLabel(labels.unavailableNote,{count})}</p>}<Link to={manualHref()}>{labels.return}</Link></div>}
      </div>
    </div>}
    {showTop&&current&&<button type="button" className="manual-to-top" onClick={toTop}><span aria-hidden="true">↑</span> {labels.toTop}</button>}
    <ManualImageDialog image={image} onClose={()=>setImage(null)} labels={labels}/>
  </section>;
}
