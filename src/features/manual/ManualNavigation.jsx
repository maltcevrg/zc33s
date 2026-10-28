import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { manualHref } from './model';

function groupDocuments(chapters,sections,documents) {
  const bySection=new Map(sections.map(s=>[s.id,[]]));
  for(const doc of documents)bySection.get(doc.sectionId)?.push(doc);
  const tree=sections.map(section=>{
    const groups=[];
    for(const doc of bySection.get(section.id)){
      // Variant branches of one section can share a group code; the branch keeps them apart.
      const key=`${doc.variant||''}:${doc.groupId}`;const last=groups[groups.length-1];
      if(last?.key===key)last.documents.push(doc);
      else groups.push({key,title:section.variants.length>1?`${doc.groupTitle} · ${doc.variant}`:doc.groupTitle,documents:[doc]});
    }
    return {...section,groups};
  });
  return chapters.map(chapter=>({...chapter,sections:tree.filter(s=>s.chapter===chapter.number)}));
}

export default function ManualNavigation({chapters,sections,documents,results,searchReady,query,onQueryChange,selectedId,expanded,onExpandedChange,labels}) {
  const tree=useMemo(()=>groupDocuments(chapters,sections,documents),[chapters,sections,documents]);
  const sectionTitles=useMemo(()=>Object.fromEntries(sections.map(s=>[s.id,s.title])),[sections]);
  const selectedSection=documents.find(d=>d.id===selectedId)?.sectionId;
  const [open,setOpen]=useState(()=>new Set(selectedSection?[selectedSection]:[]));
  useEffect(()=>{if(selectedSection)setOpen(current=>current.has(selectedSection)?current:new Set(current).add(selectedSection));},[selectedSection]);
  const toggle=(id,isOpen)=>setOpen(current=>{const next=new Set(current);if(isOpen)next.add(id);else next.delete(id);return next;});
  const onChoose=()=>onExpandedChange(false);
  return <aside className="manual-sidebar">
    <form className="manual-search" role="search" onSubmit={e=>e.preventDefault()}>
      <label htmlFor="manual-search-input">{labels.search}</label>
      <input id="manual-search-input" type="search" value={query} onChange={e=>onQueryChange(e.target.value)} placeholder={labels.placeholder} autoComplete="off" aria-controls="manual-contents"/>
      {query&&<button type="button" className="manual-clear" onClick={()=>onQueryChange('')}>{labels.clear}</button>}
    </form>
    <button type="button" className="manual-contents-toggle" aria-expanded={expanded} aria-controls="manual-contents" onClick={()=>onExpandedChange(!expanded)}>{labels.contents}<span aria-hidden="true">{expanded?'−':'+'}</span></button>
    <nav id="manual-contents" aria-label={labels.contents} className={`manual-nav${expanded?' manual-nav--expanded':''}`}>
      {query.trim()?(!searchReady?<p className="manual-search-count" role="status">{labels.searchLoading}</p>:<>
        <p className="manual-search-count" role="status">{labels.results}: {results.length}</p>
        {!results.length&&<p className="manual-empty-search">{labels.noResults}</p>}
        <ul className="manual-results">{results.map(r=><li key={r.id}><Link to={manualHref(r.id)} onClick={onChoose} aria-current={selectedId===r.id?'page':undefined}><strong lang="ru">{r.title}</strong><small lang="ru">{sectionTitles[r.sectionId]} · {r.groupTitle}</small><span lang="ru">{r.snippet}</span></Link></li>)}</ul>
      </>):tree.map(chapter=><section key={chapter.number} className="manual-nav-chapter" aria-labelledby={`manual-chapter-${chapter.number}`}>
        <h2 className="manual-nav-chapter__title" id={`manual-chapter-${chapter.number}`}><span className="manual-nav-chapter__number">{chapter.number}</span><span lang="ru">{chapter.title}</span></h2>
        {chapter.sections.map(section=><details key={section.id} open={open.has(section.id)} onToggle={e=>{if(e.currentTarget.open!==open.has(section.id))toggle(section.id,e.currentTarget.open);}} className="manual-nav-section">
          <summary><span className="manual-nav-section__id">{section.number}</span><span className="manual-nav-section__title" lang="ru">{section.title}</span><span className="manual-nav-section__count">{section.groups.reduce((n,g)=>n+g.documents.length,0)}</span></summary>
          {section.groups.map(group=><div key={group.key} className="manual-nav-group">
            <p className="manual-nav-group__title" lang="ru">{group.title}</p>
            <ul>{group.documents.map(d=><li key={d.id}><Link to={manualHref(d.id)} onClick={onChoose} aria-current={selectedId===d.id?'page':undefined} lang="ru">{d.title}</Link></li>)}</ul>
          </div>)}
        </details>)}
      </section>)}
    </nav>
  </aside>;
}
