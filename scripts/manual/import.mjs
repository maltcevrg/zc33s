import { mkdir, mkdtemp, readFile, writeFile, rename, rm, rmdir, lstat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { openArchive, validateArchiveEntries } from './archive.mjs';
import { parseXmlStrict } from './xml.mjs';
import { PILOT_IDS, PILOT_LABEL } from './pilot.mjs';
import { buildTitleCatalog, convertDocument, walkNodes, semanticLabels } from './convert.mjs';
import { checkPilot, sha256 } from './check.mjs';

async function removeScratch(path,parent) {
  if(dirname(resolve(path))!==resolve(parent)||!/^\.manual-(stage|backup)-/.test(basename(path)))throw new Error('Refusing unsafe scratch cleanup');
  await rm(path,{recursive:true,force:true});
}
export async function buildPilot({archive,outputDir}) {
  const output=resolve(outputDir);const parent=dirname(output);
  if(basename(output)!=='manual')throw new Error('Output directory must be named manual');
  await mkdir(parent,{recursive:true});
  const stage=await mkdtemp(join(parent,'.manual-stage-'));
  const files=validateArchiveEntries(archive.list());
  const sources={};const outputFiles={};
  const read=path=>{const bytes=archive.read(path);sources[path.split('/').slice(1).join('/')]={sha256:sha256(bytes),bytes:bytes.length};return bytes;};
  const bySuffix=suffix=>{const matches=files.filter(p=>p.endsWith('/'+suffix));if(matches.length!==1)throw new Error(`Ambiguous or missing source: ${suffix}`);return matches[0];};
  const write=async(path,bytes)=>{await mkdir(dirname(join(stage,path)),{recursive:true});await writeFile(join(stage,path),bytes);outputFiles[path]={sha256:sha256(bytes),bytes:Buffer.byteLength(bytes)};};
  const writeJson=(path,value)=>write(path,JSON.stringify(value,null,2)+'\n');
  try{
    const entities=read(bySuffix('config8/sdatacharaents.txt')).toString('utf8');
    // Record the actual templates behind generated labels and units for later audit.
    for(const name of ['suzuki.xsl','ui.xslt'])read(bySuffix(`config8/${name}`));
    const structures=files.filter(p=>/\/webdocstructure_[A-F0-9]{2}\.xml$/.test(p));
    const titles=buildTitleCatalog(structures.map(p=>parseXmlStrict(read(p).toString('utf8'),{entitySource:entities})));
    const branch=parseXmlStrict(read(bySuffix('AJPHSB0P/webdocstructure_18.xml')).toString('utf8'));
    const k14c=[...branch.getElementsByTagName('c')].find(n=>n.getAttribute('t')==='K14C');
    const sourceOrder=[...k14c.getElementsByTagName('s')].map(n=>n.getAttribute('i'));
    if(JSON.stringify(sourceOrder)!==JSON.stringify(PILOT_IDS))throw new Error('Pilot branch changed; review source');
    const xmlSources=new Map(PILOT_IDS.map(id=>[id,read(bySuffix(`AJPHSB0P/${id}.xml`)).toString('utf8')]));
    const imagePaths=new Map();const imageMeta=new Map();
    for(const xml of xmlSources.values()){
      const dom=parseXmlStrict(xml,{entitySource:entities});
      for(const graphic of dom.getElementsByTagName('graphic')){
        const name=graphic.getAttribute('graphicname');if(imagePaths.has(name))continue;
        const jpeg=name.replace(/\.swf$/i,'.jpg');
        if(!/^[\w-]+\.jpg$/i.test(jpeg))throw new Error('Unexpected graphic filename');
        const path=bySuffix(jpeg);const bytes=read(path);const meta=await sharp(bytes).metadata();
        if(!meta.width||!meta.height)throw new Error('Invalid image');
        const target=`images/${jpeg}`;
        await write(target,bytes);imagePaths.set(name,target);imageMeta.set(target,{width:meta.width,height:meta.height,sha256:sha256(bytes)});
      }
    }
    const context={entities,titles,availableIds:new Set(PILOT_IDS),imagePaths};
    const docs=PILOT_IDS.map(id=>convertDocument(xmlSources.get(id),context));
    const counts={};const targets={};const references=[];
    for(const doc of docs){
      for(const image of doc.images)Object.assign(image,imageMeta.get(image.path));
      walkNodes(doc.body,n=>{counts[n.tag]=(counts[n.tag]||0)+1;if(n.tag==='graphic')Object.assign(n.attrs,{pixelWidth:imageMeta.get(n.attrs.path).width,pixelHeight:imageMeta.get(n.attrs.path).height});});
      targets[doc.id]={title:doc.title,available:true};
      for(const ref of doc.references){targets[ref.targetId]={title:ref.title,available:ref.available};references.push({sourceId:doc.id,...ref});}
      await writeJson(`documents/${doc.id}.json`,doc);
    }
    const documents=docs.map(({id,title,groupId,groupTitle})=>({id,title,groupId,groupTitle,path:`documents/${id}.json`}));
    await writeJson('index.json',{schemaVersion:1,manualId:'AJPHSB0P',pilotLabel:PILOT_LABEL,documents,targets,semanticLabels});
    await writeJson('search.json',docs.map(d=>({id:d.id,title:d.title,groupTitle:d.groupTitle,text:d.searchText})));
    const report={schemaVersion:1,importerVersion:1,manualId:'AJPHSB0P',sourceArchiveSha256:archive.sha256||null,documentIds:PILOT_IDS,counts,sources,files:outputFiles,references,externalTargets:Object.entries(targets).filter(([,t])=>!t.available).map(([id,t])=>({id,...t})),imageMappings:[...imagePaths].map(([source,path])=>({source,path,...imageMeta.get(path)}))};
    await writeFile(join(stage,'report.json'),JSON.stringify(report,null,2)+'\n');
    await checkPilot(stage);
    let existing;
    try{existing=await lstat(output);}catch(e){if(e.code!=='ENOENT')throw e;}
    if(existing){
      if(existing.isSymbolicLink())throw new Error('Output must not be a symlink');
      const prior=JSON.parse(await readFile(join(output,'report.json'),'utf8'));
      if(prior.manualId!=='AJPHSB0P'||prior.importerVersion!==1)throw new Error('Refusing to replace unrelated output');
      const backup=await mkdtemp(join(parent,'.manual-backup-'));await rmdir(backup);
      await rename(output,backup);
      try{await rename(stage,output);}catch(error){await rename(backup,output);throw error;}
      await removeScratch(backup,parent);
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
  const report=await buildPilot({archive,outputDir:resolve('public/manual')});
  console.log(`Imported ${report.documentIds.length} documents and ${report.imageMappings.length} images.`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)main().catch(e=>{console.error(e.stack);process.exitCode=1;});
