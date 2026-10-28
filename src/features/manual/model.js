export const normalizeSearch = text => String(text).toLowerCase().replaceAll('ё','е').replace(/\s+/g,' ').trim();

function snippetFor(text,tokens) {
  // Map normalized indices back to the original text, including collapsed spaces.
  let normalized='';const offsets=[];
  for(const match of text.matchAll(/\S+/gu)){
    if(normalized){normalized+=' ';offsets.push(match.index-1);}
    const word=normalizeSearch(match[0]);
    for(let i=0;i<word.length;i++){normalized+=word[i];offsets.push(match.index+i);}
  }
  const positions=tokens.map(t=>normalized.indexOf(t)).filter(n=>n>=0);
  const at=positions.length?offsets[Math.min(...positions)]:0;
  const start=Math.max(0,at-50);const end=Math.min(text.length,start+180);
  return (start?'…':'')+text.slice(start,end)+(end<text.length?'…':'');
}

export function searchManual(entries,query) {
  const tokens=normalizeSearch(query).split(' ').filter(Boolean);
  if(!tokens.length)return [];
  return entries.map((entry,index)=>{
    const title=normalizeSearch(entry.title);const text=normalizeSearch(`${entry.id} ${entry.title} ${entry.text}`);
    if(!tokens.every(t=>text.includes(t)))return null;
    const score=tokens.filter(t=>title.includes(t)).length*10+(normalizeSearch(entry.id)===normalizeSearch(query)?100:0);
    return {...entry,snippet:snippetFor(entry.text,tokens),score,index};
  }).filter(Boolean).sort((a,b)=>b.score-a.score||a.index-b.index).map(({id,title,sectionId,groupTitle,snippet})=>({id,title,sectionId,groupTitle,snippet}));
}

export function manualHref(id,anchor) {
  return '/manual/'+(id?`?doc=${encodeURIComponent(id)}`:'')+(anchor?`#${encodeURIComponent(anchor)}`:'');
}

export function createDocumentLoader(fetcher=fetch) {
  let generation=0;let controller;
  const cancel=()=>{generation++;controller?.abort();};
  return {
    cancel,
    async load(url){
      cancel();const current=generation;controller=new AbortController();
      try{
        const response=await fetcher(url,{signal:controller.signal});
        if(current!==generation)return null;
        if(!response.ok)throw new Error(`HTTP ${response.status}`);
        const data=await response.json();
        return current===generation?data:null;
      }catch(error){if(current!==generation||error.name==='AbortError')return null;throw error;}
    },
  };
}
