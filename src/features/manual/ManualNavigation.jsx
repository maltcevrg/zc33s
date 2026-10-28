import { Link } from 'react-router-dom';
import { manualHref } from './model';

export default function ManualNavigation({documents,results,query,onQueryChange,selectedId,expanded,onExpandedChange,labels}) {
  const groups=Object.groupBy?Object.groupBy(documents,d=>d.groupId):documents.reduce((all,d)=>{(all[d.groupId]||=[]).push(d);return all;},{});
  const onChoose=()=>onExpandedChange(false);
  return <aside className="manual-sidebar">
    <form className="manual-search" role="search" onSubmit={e=>e.preventDefault()}>
      <label htmlFor="manual-search-input">{labels.search}</label>
      <input id="manual-search-input" type="search" value={query} onChange={e=>onQueryChange(e.target.value)} placeholder={labels.placeholder} autoComplete="off" aria-controls="manual-contents"/>
      {query&&<button type="button" className="manual-clear" onClick={()=>onQueryChange('')}>{labels.clear}</button>}
    </form>
    <button type="button" className="manual-contents-toggle" aria-expanded={expanded} aria-controls="manual-contents" onClick={()=>onExpandedChange(!expanded)}>{labels.contents}<span aria-hidden="true">{expanded?'−':'+'}</span></button>
    <nav id="manual-contents" aria-label={labels.contents} className={`manual-nav${expanded?' manual-nav--expanded':''}`}>
      {query.trim()?<>
        <p className="manual-search-count" role="status">{labels.results}: {results.length}</p>
        {!results.length&&<p className="manual-empty-search">{labels.noResults}</p>}
        <ul className="manual-results">{results.map(r=><li key={r.id}><Link to={manualHref(r.id)} onClick={onChoose} aria-current={selectedId===r.id?'page':undefined}><strong lang="ru">{r.title}</strong><span lang="ru">{r.snippet}</span></Link></li>)}</ul>
      </>:Object.entries(groups).map(([id,items])=><details key={id} open className="manual-nav-group"><summary>{labels.groupNames[id]||items[0].groupTitle}</summary><ul>{items.map(d=><li key={d.id}><Link to={manualHref(d.id)} onClick={onChoose} aria-current={selectedId===d.id?'page':undefined} lang="ru">{d.title}</Link></li>)}</ul></details>)}
    </nav>
  </aside>;
}
