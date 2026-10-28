export const normalizeSearch = text => String(text).toLowerCase().replaceAll('ё','е').replace(/\s+/g,' ').trim();
const searchTokens = query => normalizeSearch(query).split(' ').filter(Boolean);

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

// Normalizing ~6 MB of text on every keystroke is the slow part of search, so it is done once per index.
const prepared=new WeakMap();
function prepare(entries) {
  if(!prepared.has(entries))prepared.set(entries,entries.map((entry,index)=>({entry,index,id:normalizeSearch(entry.id),title:normalizeSearch(entry.title),text:normalizeSearch(`${entry.id} ${entry.title} ${entry.text}`)})));
  return prepared.get(entries);
}

// Ranked matches without snippets; snippets are built only for the results that are shown.
export function findManual(entries,query) {
  const tokens=searchTokens(query);
  if(!tokens.length)return [];
  const exact=normalizeSearch(query);
  return prepare(entries).filter(p=>tokens.every(t=>p.text.includes(t)))
    .map(p=>({...p,score:tokens.filter(t=>p.title.includes(t)).length*10+(p.id===exact?100:0)}))
    .sort((a,b)=>b.score-a.score||a.index-b.index).map(p=>p.entry);
}

export const withSnippet = (entry,query) => ({id:entry.id,title:entry.title,sectionId:entry.sectionId,groupTitle:entry.groupTitle,snippet:snippetFor(entry.text,searchTokens(query))});

export function searchManual(entries,query,limit=Infinity) {
  return findManual(entries,query).slice(0,limit).map(entry=>withSnippet(entry,query));
}

// Splits text into plain and matched parts for highlighting; ё and е match each other as in search.
export function markMatches(text,query) {
  const tokens=searchTokens(query);const lower=text.toLowerCase().replaceAll('ё','е');
  if(!tokens.length||lower.length!==text.length)return [{text,match:false}];
  const marked=new Array(text.length).fill(false);
  for(const token of tokens)for(let at=lower.indexOf(token);at>=0;at=lower.indexOf(token,at+1))marked.fill(true,at,at+token.length);
  const parts=[];
  for(let i=0;i<text.length;i++){
    const last=parts[parts.length-1];
    if(last?.match===marked[i])last.text+=text[i];else parts.push({text:text[i],match:marked[i]});
  }
  return parts;
}

const plainText = nodes => nodes.map(n=>typeof n==='string'?n:plainText(n.children)).join('').replace(/\s+/g,' ').trim();

// Titled sections of a document and the topics inside them, for the in-document contents.
export function documentOutline(body) {
  const outline=[];
  const walk=(nodes,depth)=>{
    for(const node of nodes){
      if(typeof node==='string')continue;
      const isPart=node.tag==='servinfosub'||(depth>0&&node.tag==='topic');
      const title=isPart&&node.attrs.id&&node.children.find(n=>n.tag==='title');
      if(title){const text=plainText(title.children);if(text)outline.push({id:node.attrs.id,title:text,depth:Math.min(depth,1)});}
      if(depth<2)walk(node.children,isPart?depth+1:depth);
    }
  };
  walk(body,0);
  return outline;
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

// Reading history and bookmarks live in this browser only; storage may be unavailable or hold anything.
export function readStoredIds(storage,key) {
  try{const value=JSON.parse(storage?.getItem(key)??'[]');return Array.isArray(value)?value.filter(id=>typeof id==='string'):[];}
  catch{return [];}
}
export function writeStoredIds(storage,key,ids) {
  try{storage?.setItem(key,JSON.stringify(ids));}catch{/* private mode or full storage: keep the in-memory list */}
}
export const pushRecent = (ids,id,limit=8) => [id,...ids.filter(x=>x!==id)].slice(0,limit);
export const toggleId = (ids,id) => ids.includes(id)?ids.filter(x=>x!==id):[id,...ids];
