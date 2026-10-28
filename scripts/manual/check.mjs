import { readFile, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PILOT_IDS, PILOT_COUNTS } from './pilot.mjs';
import { walkNodes, COUNTED_TAGS } from './convert.mjs';

const SCHEMA_VERSION = 2;
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export function resourcePath(root,path) {
  if (!path || /[:\\\0]/.test(path) || path.split('/').some(p=>p==='..'||p==='.'||!p)) throw new Error(`Unsafe resource path: ${path}`);
  const absolute=resolve(root,path);
  if(!absolute.startsWith(resolve(root)+sep)) throw new Error('Resource escapes root');
  return absolute;
}
export async function checkManual(rootDirectory) {
  const root=resolve(rootDirectory);
  const json=async path=>JSON.parse(await readFile(resourcePath(root,path),'utf8'));
  const report=await json('report.json');
  if(report.manualId!=='AJPHSB0P'||report.schemaVersion!==SCHEMA_VERSION||!Array.isArray(report.documentIds)||!report.documentIds.length) throw new Error('Invalid manual report');
  for(const [path,record] of Object.entries(report.files)){
    const absolute=resourcePath(root,path);
    if((await lstat(absolute)).isSymbolicLink())throw new Error('Symbolic resource not allowed');
    const bytes=await readFile(absolute);
    if(sha256(bytes)!==record.sha256||bytes.length!==record.bytes)throw new Error(`Resource hash mismatch: ${path}`);
  }
  const index=await json('index.json');const search=await json('search.json');
  const ids=report.documentIds;
  if(index.schemaVersion!==SCHEMA_VERSION||JSON.stringify(index.documents.map(d=>d.id))!==JSON.stringify(ids)||JSON.stringify(search.map(s=>s.id))!==JSON.stringify(ids))throw new Error('Index, search and report disagree on documents');
  const sectionIds=new Set(index.sections.map(s=>s.id));
  const docs=new Map();const counts={};
  for(const entry of index.documents){
    if(!sectionIds.has(entry.sectionId)||!entry.groupTitle)throw new Error(`Document outside known section: ${entry.id}`);
    const doc=await json(entry.path);
    if(doc.id!==entry.id||doc.schemaVersion!==SCHEMA_VERSION||doc.sectionId!==entry.sectionId)throw new Error(`Invalid document: ${entry.id}`);
    docs.set(doc.id,doc);
    const actualAnchors=[];const own={};
    walkNodes(doc.body,n=>{
      counts[n.tag]=(counts[n.tag]||0)+1;own[n.tag]=(own[n.tag]||0)+1;if(n.attrs.id)actualAnchors.push(n.attrs.id);
      if((n.tag==='graphic'||n.tag==='symbol')&&n.attrs.path&&!report.files[n.attrs.path])throw new Error(`Unlisted resource: ${n.attrs.path}`);
      if(n.tag==='symbol'&&n.attrs.type!=='chara'&&!n.attrs.path)throw new Error(`Symbol without image in ${doc.id}`);
    });
    if(JSON.stringify(actualAnchors)!==JSON.stringify(doc.anchors))throw new Error(`Anchor inventory mismatch: ${doc.id}`);
    // Every counted element found in the source XML must survive conversion.
    const expected=report.documentSourceCounts[doc.id]||{};
    for(const tag of COUNTED_TAGS)if((own[tag]||0)!==(expected[tag]||0))throw new Error(`Content count mismatch in ${doc.id}: ${tag}`);
    for(const image of doc.images)if(!report.files[image.path])throw new Error(`Unlisted image: ${image.path}`);
  }
  for(const doc of docs.values())for(const ref of doc.references){
    if(!ref.title||!index.targets[ref.targetId])throw new Error('Unresolved reference');
    if(ref.available){const target=docs.get(ref.targetId);if(!target||(ref.anchor&&!target.anchors.includes(ref.anchor)))throw new Error(`Missing reference anchor: ${ref.targetId}#${ref.anchor}`);}
  }
  for(const [tag,n] of Object.entries(counts))if(report.counts[tag]!==n)throw new Error(`Report count mismatch: ${tag}`);
  // The ignition pilot keeps its manually verified totals whenever it is part of the scope.
  if(PILOT_IDS.every(id=>docs.has(id))){
    const pilot={};
    for(const id of PILOT_IDS)walkNodes(docs.get(id).body,n=>{pilot[n.tag]=(pilot[n.tag]||0)+1;});
    for(const [tag,expected] of Object.entries(PILOT_COUNTS))if(pilot[tag]!==expected)throw new Error(`Pilot count mismatch: ${tag}`);
  }
  return report;
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  checkManual(resolve('public/manual')).then(r=>console.log(`Manual verified: ${r.documentIds.length} documents, ${r.counts.graphic} graphics, ${r.imageMappings.length} images, ${r.externalTargets.length} targets outside the published scope.`)).catch(e=>{console.error(e.message);process.exitCode=1;});
}
