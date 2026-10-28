import { readFile, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PILOT_IDS } from './pilot.mjs';
import { walkNodes } from './convert.mjs';

export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export function resourcePath(root,path) {
  if (!path || /[:\\\0]/.test(path) || path.split('/').some(p=>p==='..'||p==='.'||!p)) throw new Error(`Unsafe resource path: ${path}`);
  const absolute=resolve(root,path);
  if(!absolute.startsWith(resolve(root)+sep)) throw new Error('Resource escapes root');
  return absolute;
}
export async function checkPilot(rootDirectory) {
  const root=resolve(rootDirectory);
  const json=async path=>JSON.parse(await readFile(resourcePath(root,path),'utf8'));
  const report=await json('report.json');
  if(report.manualId!=='AJPHSB0P'||report.schemaVersion!==1||JSON.stringify(report.documentIds)!==JSON.stringify(PILOT_IDS)) throw new Error('Invalid pilot manifest');
  for(const [path,record] of Object.entries(report.files)){
    const absolute=resourcePath(root,path);
    if((await lstat(absolute)).isSymbolicLink())throw new Error('Symbolic resource not allowed');
    const bytes=await readFile(absolute);
    if(sha256(bytes)!==record.sha256||bytes.length!==record.bytes)throw new Error(`Resource hash mismatch: ${path}`);
  }
  const index=await json('index.json');const search=await json('search.json');
  if(index.schemaVersion!==1||index.documents.length!==11||search.length!==11)throw new Error('Incorrect document count');
  const docs=new Map();const counts={};
  for(const entry of index.documents){
    const doc=await json(entry.path);
    if(!PILOT_IDS.includes(doc.id)||docs.has(doc.id)||doc.schemaVersion!==1)throw new Error('Invalid document');
    docs.set(doc.id,doc);
    const actualAnchors=[];
    walkNodes(doc.body,n=>{counts[n.tag]=(counts[n.tag]||0)+1;if(n.attrs.id)actualAnchors.push(n.attrs.id);});
    if(JSON.stringify(actualAnchors)!==JSON.stringify(doc.anchors))throw new Error('Anchor inventory mismatch');
    for(const image of doc.images)if(!report.files[image.path])throw new Error(`Unlisted image: ${image.path}`);
  }
  for(const doc of docs.values())for(const ref of doc.references){
    if(!ref.title||!index.targets[ref.targetId])throw new Error('Unresolved reference');
    if(ref.available){const target=docs.get(ref.targetId);if(!target||(ref.anchor&&!target.anchors.includes(ref.anchor)))throw new Error(`Missing reference anchor: ${ref.targetId}#${ref.anchor}`);}
  }
  for(const [tag,expected] of Object.entries({graphic:12,table:5,testgroup:9,result:18,action:18}))if(counts[tag]!==expected||report.counts[tag]!==expected)throw new Error(`Content count mismatch: ${tag}`);
  return report;
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  checkPilot(resolve('public/manual')).then(r=>console.log(`Manual verified: ${r.documentIds.length} documents, ${r.counts.graphic} graphics, ${r.externalTargets.length} out-of-pilot targets.`)).catch(e=>{console.error(e.message);process.exitCode=1;});
}
