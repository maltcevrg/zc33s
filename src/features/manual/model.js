export const normalizeSearch = text => String(text).toLowerCase().replaceAll('ё','е').replace(/\s+/g,' ').trim();

// Light Russian stemming: a query word also finds its other forms ("свечи" → "свеча", "свечей").
// Codes, numbers and words with punctuation stay exact; a stem keeps at least four letters.
const ENDINGS=['иями','ями','ами','ого','его','ому','ему','ыми','ими','ией','ия','ие','ий','ой','ей','ый','ая','яя','ое','ее','ые','ых','их','ую','юю','ом','ем','ам','ям','ах','ях','ов','ев','ть','а','я','о','е','ы','и','у','ю','ь','й'].sort((a,b)=>b.length-a.length);
export function stemWord(word) {
  if(!/^[а-я]{5,}$/.test(word))return word;
  const ending=ENDINGS.find(e=>word.endsWith(e)&&word.length-e.length>=4);
  return ending?word.slice(0,-ending.length):word;
}
const queryWords = query => normalizeSearch(query).split(' ').filter(Boolean);
const searchTokens = query => queryWords(query).map(stemWord);

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
  const exact=normalizeSearch(query);const words=queryWords(query);
  // Title hits weigh most; the exact typed form of a word ranks above its other forms.
  return prepare(entries).filter(p=>tokens.every(t=>p.text.includes(t)))
    .map(p=>({...p,score:tokens.filter(t=>p.title.includes(t)).length*10+words.filter(w=>p.title.includes(w)).length*5+(p.id===exact?100:0)}))
    .sort((a,b)=>b.score-a.score||a.index-b.index).map(p=>p.entry);
}

export const withSnippet = (entry,query) => ({id:entry.id,title:entry.title,sectionId:entry.sectionId,groupTitle:entry.groupTitle,snippet:snippetFor(entry.text,searchTokens(query))});

export function searchManual(entries,query,limit=Infinity) {
  return findManual(entries,query).slice(0,limit).map(entry=>withSnippet(entry,query));
}

const isWordChar = ch => /[\p{L}\p{N}]/u.test(ch);

// Splits text into plain and matched parts for highlighting; ё and е match each other as in search.
// A match runs to the end of its word, so a stem highlights the whole word form.
export function markMatches(text,query) {
  const tokens=searchTokens(query);const lower=text.toLowerCase().replaceAll('ё','е');
  if(!tokens.length||lower.length!==text.length)return [{text,match:false}];
  const marked=new Array(text.length).fill(false);
  for(const token of tokens)for(let at=lower.indexOf(token);at>=0;at=lower.indexOf(token,at+1)){
    let end=at+token.length;while(end<text.length&&isWordChar(text[end]))end++;
    marked.fill(true,at,end);
  }
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

// Start page of the manual: reference documents, per-section DTC and torque lists, sections by chapter.
const REFERENCE_IDS=['AJPHSB0P0205001','AJPHSB0P0201002','AJPHSB0P0101003'];
export function manualOverview({chapters,sections,documents}) {
  const byId=new Map(documents.map(d=>[d.id,d]));const sectionById=new Map(sections.map(s=>[s.id,s]));
  const titled=(title,kind)=>documents.filter(d=>d.referenceKind===kind||(!d.referenceKind&&d.title===title)).map(d=>({...d,section:sectionById.get(d.sectionId)}));
  const counts=new Map();
  for(const d of documents){const entry=counts.get(d.sectionId);if(entry)entry.count++;else counts.set(d.sectionId,{count:1,firstId:d.id});}
  return {
    reference:REFERENCE_IDS.map(id=>byId.get(id)).filter(Boolean),
    dtc:titled('Список кодов неисправностей','dtc'),torque:titled('Список моментов затяжки','torque'),
    chapters:chapters.map(chapter=>({...chapter,sections:sections.filter(s=>s.chapter===chapter.number&&counts.has(s.id)).map(s=>({...s,...counts.get(s.id)}))})),
  };
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
