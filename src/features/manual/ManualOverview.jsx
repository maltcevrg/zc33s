import { useState } from 'react';
import { Link } from 'react-router-dom';
import { manualHref } from './model';

// Section lists repeat a title per section, so a link is named by its section (and branch, where a section has two).
const capitalize = text => text.charAt(0).toUpperCase()+text.slice(1);
const sectionLabel = d => `${d.section.number} · ${capitalize(d.section.title)}${d.section.variants.length>1&&d.variant?` · ${d.variant}`:''}`;
// Long lists start folded on phones, where they would push the chapters several screens down.
const wideScreen = () => typeof window==='undefined'||!window.matchMedia||window.matchMedia('(min-width: 768px)').matches;

function QuickCard({title,note,documents,label,collapsible}) {
  const [open,setOpen]=useState(wideScreen);
  if(!documents.length)return null;
  const list=<>{note&&<p>{note}</p>}<ul>{documents.map(d=><li key={d.id}><Link to={manualHref(d.id)} lang="ru"><span className="manual-capitalize">{label(d)}</span></Link></li>)}</ul></>;
  if(!collapsible)return <section className="manual-overview__card"><h4>{title}</h4>{list}</section>;
  return <details className="manual-overview__card" open={open} onToggle={e=>setOpen(e.currentTarget.open)}>
    <summary><h4>{title}</h4><span className="manual-overview__count">{documents.length}</span></summary>{list}
  </details>;
}

export default function ManualOverview({overview,recent,labels}) {
  const last=recent[0];
  return <div className="manual-overview">
    <header className="manual-overview__intro">
      <h2 className="manual-document-title">{labels.overviewTitle}</h2>
      <p>{labels.overviewIntro}<span className="manual-overview__shortcut"> {labels.searchShortcut}.</span></p>
      {last&&<Link className="manual-overview__continue" to={manualHref(last.id)}><span>{labels.continueReading}</span><strong lang="ru">{last.title}</strong></Link>}
    </header>
    <section aria-labelledby="manual-overview-quick">
      <h3 className="manual-overview__heading" id="manual-overview-quick">{labels.quickAccess}</h3>
      <div className="manual-overview__cards">
        <QuickCard title={labels.referenceTitle} documents={overview.reference} label={d=>d.title}/>
        <QuickCard collapsible title={labels.dtcTitle} note={labels.dtcNote} documents={overview.dtc} label={sectionLabel}/>
        <QuickCard collapsible title={labels.torqueTitle} note={labels.torqueNote} documents={overview.torque} label={sectionLabel}/>
      </div>
    </section>
    <section aria-labelledby="manual-overview-chapters">
      <h3 className="manual-overview__heading" id="manual-overview-chapters">{labels.chaptersTitle}</h3>
      <div className="manual-overview__chapters">
        {overview.chapters.map(chapter=><section key={chapter.number} className="manual-overview__chapter">
          <h4><span className="manual-overview__number">{chapter.number}</span><span lang="ru">{chapter.title}</span></h4>
          <ul>{chapter.sections.map(s=><li key={s.id}><Link to={manualHref(s.firstId)}><span className="manual-overview__number">{s.number}</span><span className="manual-overview__section" lang="ru">{s.title}</span><span className="manual-overview__count">{s.count}</span></Link></li>)}</ul>
        </section>)}
      </div>
    </section>
  </div>;
}
