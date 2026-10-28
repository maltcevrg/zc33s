import { mkdir, mkdtemp, readFile, writeFile, rename, rm, rmdir, lstat, readdir, copyFile, unlink, cp } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { openArchive, validateArchiveEntries } from './archive.mjs';
import { parseXmlStrict } from './xml.mjs';
import { MANUAL_SCOPE, NO_VARIANT, IMAGE_QUALITY } from './pilot.mjs';
import { buildTitleCatalog, convertDocument, walkNodes, semanticLabels } from './convert.mjs';
import { checkManual, sha256 } from './check.mjs';

export const IMPORTER_VERSION = 2;
export const SCHEMA_VERSION = 2;

async function removeScratch(path,parent) {
  if(dirname(resolve(path))!==resolve(parent)||!/^\.manual-(stage|backup)-/.test(basename(path)))throw new Error('Refusing unsafe scratch cleanup');
  await rm(path,{recursive:true,force:true});
}
const LOCKED=['EPERM','EBUSY','EACCES'];
async function listFiles(root,prefix='') {
  const files=[];
  for(const entry of await readdir(join(root,prefix),{withFileTypes:true})){
    const path=prefix?`${prefix}/${entry.name}`:entry.name;
    if(entry.isSymbolicLink())throw new Error(`Symbolic link in output: ${path}`);
    if(entry.isDirectory())files.push(...await listFiles(root,path));else files.push(path);
  }
  return files;
}
// Make target hold exactly the files of source, copying file by file.
async function mirrorFiles(source,target) {
  const wanted=await listFiles(source);const keep=new Set(wanted);
  for(const path of wanted){await mkdir(dirname(join(target,path)),{recursive:true});await copyFile(join(source,path),join(target,path));}
  for(const path of await listFiles(target))if(!keep.has(path))await unlink(join(target,path));
}
// A dev server watching public/ locks the directory on Windows, so a whole-directory rename may fail.
// The staged data is already verified; then fall back to a file-level swap with a full backup.
async function replaceOutput(stage,output,parent) {
  const backup=await mkdtemp(join(parent,'.manual-backup-'));await rmdir(backup);
  try{await rename(output,backup);}
  catch(error){
    if(!LOCKED.includes(error.code))throw error;
    await cp(output,backup,{recursive:true,errorOnExist:true});
    try{await mirrorFiles(stage,output);}
    catch(failure){await mirrorFiles(backup,output);throw failure;}
    await removeScratch(stage,parent);await removeScratch(backup,parent);
    return;
  }
  try{await rename(stage,output);}catch(error){await rename(backup,output);throw error;}
  await removeScratch(backup,parent);
}
const elementChildren=(node,name)=>Array.from(node.childNodes).filter(n=>n.nodeType===1&&n.nodeName===name);

// Section code (file suffix) -> source section ID and title from webdocstructure.xml, e.g. 18 -> 1H "зажигание".
export function readSections(overview) {
  const sections=new Map();
  for(const node of overview.getElementsByTagName('a')){
    const code=(node.getAttribute('f')||'').match(/^AJPHSB0P(\w{2})\.fm$/)?.[1];
    const title=elementChildren(node,'b')[0]?.getAttribute('t');
    if(code&&title)sections.set(code,{id:node.getAttribute('i'),title});
  }
  return sections;
}

// Ordered documents of one section file for the chosen variant.
export function selectSectionDocuments(sectionDom,variant) {
  const root=sectionDom.documentElement;
  const choices=elementChildren(root,'c').filter(c=>[variant,NO_VARIANT].includes(c.getAttribute('t')));
  if(choices.length!==1)throw new Error(`Expected one ${variant} variant in section ${root.getAttribute('t')}`);
  const documents=[];
  for(const group of elementChildren(choices[0],'t'))for(const doc of elementChildren(group,'s'))
    documents.push({id:doc.getAttribute('i'),title:doc.getAttribute('t'),groupId:group.getAttribute('s'),groupTitle:group.getAttribute('t')});
  return {variant:choices[0].getAttribute('t')===NO_VARIANT?null:variant,documents};
}

export async function buildManual({archive,outputDir,scope=MANUAL_SCOPE}) {
  const output=resolve(outputDir);const parent=dirname(output);
  if(basename(output)!=='manual')throw new Error('Output directory must be named manual');
  await mkdir(parent,{recursive:true});
  const stage=await mkdtemp(join(parent,'.manual-stage-'));
  const files=validateArchiveEntries(archive.list());
  const sources={};const outputFiles={};
  const read=path=>{const bytes=archive.read(path);sources[path.split('/').slice(1).join('/')]={sha256:sha256(bytes),bytes:bytes.length};return bytes;};
  const byName=new Map();
  for(const path of files){const name=path.split('/').pop().toLowerCase();byName.set(name,byName.has(name)?null:path);}
  const bySuffix=suffix=>{const matches=files.filter(p=>p.endsWith('/'+suffix));if(matches.length!==1)throw new Error(`Ambiguous or missing source: ${suffix}`);return matches[0];};
  const write=async(path,bytes)=>{await mkdir(dirname(join(stage,path)),{recursive:true});await writeFile(join(stage,path),bytes);outputFiles[path]={sha256:sha256(bytes),bytes:Buffer.byteLength(bytes)};};
  const writeJson=(path,value)=>write(path,JSON.stringify(value)+'\n');
  try{
    const entities=read(bySuffix('config8/sdatacharaents.txt')).toString('utf8');
    // Record the actual templates behind generated labels and units for later audit.
    for(const name of ['suzuki.xsl','ui.xslt'])read(bySuffix(`config8/${name}`));
    const parse=path=>parseXmlStrict(read(path).toString('utf8'),{entitySource:entities});
    const structures=files.filter(p=>/\/AJPHSB0P\/webdocstructure([_-][\w-]+)?\.xml$/.test(p));
    const titles=buildTitleCatalog(structures.map(parse));
    const sectionNames=readSections(parse(bySuffix('AJPHSB0P/webdocstructure.xml')));
    const sections=[];const entries=[];
    for(const code of scope.sectionFiles){
      const name=sectionNames.get(code);
      if(!name)throw new Error(`Unknown section file: ${code}`);
      const selected=selectSectionDocuments(parse(bySuffix(`AJPHSB0P/webdocstructure_${code}.xml`)),scope.variant);
      sections.push({id:name.id,code,title:name.title,variant:selected.variant});
      for(const doc of selected.documents)entries.push({...doc,sectionId:name.id});
    }
    const ids=entries.map(e=>e.id);
    if(new Set(ids).size!==ids.length)throw new Error('Document listed twice in scope');
    const xmlSources=new Map(ids.map(id=>[id,read(bySuffix(`AJPHSB0P/${id}.xml`)).toString('utf8')]));
    const imagePaths=new Map();const imageMeta=new Map();
    for(const xml of xmlSources.values()){
      const dom=parseXmlStrict(xml,{entitySource:entities});
      for(const graphic of dom.getElementsByTagName('graphic')){
        const name=graphic.getAttribute('graphicname');if(imagePaths.has(name))continue;
        const jpeg=name.replace(/\.swf$/i,'.jpg');
        if(!/^[\w-]+\.jpg$/i.test(jpeg))throw new Error(`Unexpected graphic filename: ${name}`);
        const path=byName.get(jpeg.toLowerCase());
        if(!path)throw new Error(`Ambiguous or missing image: ${jpeg}`);
        const source=read(path);
        const webp=await sharp(source).webp({quality:IMAGE_QUALITY,effort:6}).toBuffer();
        const meta=await sharp(webp).metadata();
        if(!meta.width||!meta.height)throw new Error(`Invalid image: ${jpeg}`);
        const target=`images/${jpeg.replace(/\.jpg$/i,'.webp')}`;
        await write(target,webp);imagePaths.set(name,target);
        imageMeta.set(target,{width:meta.width,height:meta.height,sha256:sha256(webp),sourceSha256:sha256(source),sourceBytes:source.length});
      }
    }
    const symbolPaths=new Map();
    for(const xml of xmlSources.values())for(const symbol of parseXmlStrict(xml,{entitySource:entities}).getElementsByTagName('symbol')){
      if(symbol.getAttribute('type')==='chara')continue;
      const name=symbol.getAttribute('name');
      if(symbolPaths.has(name))continue;
      if(!/^[\w-]+$/.test(name))throw new Error(`Unexpected symbol name: ${name}`);
      const bytes=read(bySuffix(`Xml/symbol/${name}.png`));
      const meta=await sharp(bytes).metadata();
      if(meta.format!=='png')throw new Error(`Invalid symbol image: ${name}`);
      await write(`symbols/${name}.png`,bytes);symbolPaths.set(name,`symbols/${name}.png`);
    }
    const context={entities,titles,availableIds:new Set(ids),imagePaths,symbolPaths};
    const counts={};const sourceCounts={};const targets={};const references=[];const docs=[];
    for(const entry of entries){
      const converted=convertDocument(xmlSources.get(entry.id),context);
      const doc={...converted,schemaVersion:SCHEMA_VERSION,sectionId:entry.sectionId,groupId:entry.groupId,groupTitle:entry.groupTitle,engine:scope.variant};
      for(const image of doc.images)Object.assign(image,imageMeta.get(image.path));
      walkNodes(doc.body,n=>{counts[n.tag]=(counts[n.tag]||0)+1;if(n.tag==='graphic')Object.assign(n.attrs,{pixelWidth:imageMeta.get(n.attrs.path).width,pixelHeight:imageMeta.get(n.attrs.path).height});});
      for(const [tag,n] of Object.entries(doc.sourceCounts))sourceCounts[tag]=(sourceCounts[tag]||0)+n;
      targets[doc.id]={title:doc.title,available:true};
      for(const ref of doc.references){if(!targets[ref.targetId])targets[ref.targetId]={title:ref.title,available:ref.available};references.push({sourceId:doc.id,...ref});}
      await writeJson(`documents/${doc.id}.json`,doc);
      docs.push(doc);
    }
    const documents=docs.map(({id,title,sectionId,groupId,groupTitle})=>({id,title,sectionId,groupId,groupTitle,path:`documents/${id}.json`}));
    await writeJson('index.json',{schemaVersion:SCHEMA_VERSION,manualId:'AJPHSB0P',scope:{id:scope.id,variant:scope.variant},sections,documents,targets,semanticLabels});
    await writeJson('search.json',docs.map(d=>({id:d.id,title:d.title,sectionId:d.sectionId,groupTitle:d.groupTitle,text:d.searchText})));
    const report={schemaVersion:SCHEMA_VERSION,importerVersion:IMPORTER_VERSION,manualId:'AJPHSB0P',scope,imageQuality:IMAGE_QUALITY,sourceArchiveSha256:archive.sha256||null,documentIds:ids,
      counts,sourceCounts,documentSourceCounts:Object.fromEntries(docs.map(d=>[d.id,d.sourceCounts])),sources,files:outputFiles,references,
      externalTargets:Object.entries(targets).filter(([,t])=>!t.available).map(([id,t])=>({id,...t})),
      imageMappings:[...imagePaths].map(([source,path])=>({source,path,...imageMeta.get(path)}))};
    await writeFile(join(stage,'report.json'),JSON.stringify(report,null,1)+'\n');
    await checkManual(stage);
    let existing;
    try{existing=await lstat(output);}catch(e){if(e.code!=='ENOENT')throw e;}
    if(existing){
      if(existing.isSymbolicLink())throw new Error('Output must not be a symlink');
      const prior=JSON.parse(await readFile(join(output,'report.json'),'utf8'));
      if(prior.manualId!=='AJPHSB0P'||![1,IMPORTER_VERSION].includes(prior.importerVersion))throw new Error('Refusing to replace unrelated output');
      await replaceOutput(stage,output,parent);
    }else await rename(stage,output);
    return report;
  }catch(error){await removeScratch(stage,parent);throw error;}
}

async function main(){
  const args=process.argv.slice(2);const options={};
  for(let i=0;i<args.length;i+=2){if(!['--archive','--unrar'].includes(args[i])||!args[i+1])throw new Error('Usage: manual:import -- --archive <path> [--unrar <path>]');options[args[i]]=args[i+1];}
  if(!options['--archive'])throw new Error('--archive is required');
  const archive=openArchive(options['--archive'],{unrarPath:options['--unrar']});
  const hash=createHash('sha256');for await(const bytes of createReadStream(options['--archive']))hash.update(bytes);archive.sha256=hash.digest('hex');
  const report=await buildManual({archive,outputDir:resolve('public/manual')});
  console.log(`Imported ${report.documentIds.length} documents and ${report.imageMappings.length} images.`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)main().catch(e=>{console.error(e.stack);process.exitCode=1;});
