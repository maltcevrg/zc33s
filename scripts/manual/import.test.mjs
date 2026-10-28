import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { buildManual, selectSectionDocuments } from './import.mjs';
import { checkManual } from './check.mjs';
import { parseXmlStrict } from './xml.mjs';
import { PILOT_IDS } from './pilot.mjs';
const fixture = name => readFile(new URL(`./fixtures/${name}`, import.meta.url));
const escapeXml = text => text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
async function archiveFixture() {
  const data = new Map();
  for (const name of [...PILOT_IDS.map(id=>`${id}.xml`),'webdocstructure_18.xml','webdocstructure.xml']) data.set(`source/Xml/AJPHSB0P/${name}`,await fixture(name));
  for(const name of ['sdatacharaents.txt','suzuki.xsl','ui.xslt'])data.set(`source/Xml/config8/${name}`,await fixture(name));
  const titles=JSON.parse(await fixture('titles.json'));
  data.set('source/Xml/AJPHSB0P/webdocstructure_00.xml',Buffer.from('<b>'+Object.entries(titles).map(([id,title])=>`<s i="${id}" t="${escapeXml(title)}"/>`).join('')+'</b>'));
  const jpg=await sharp({create:{width:8,height:8,channels:3,background:'#fff'}}).jpeg().toBuffer();
  for(const id of PILOT_IDS)for(const m of data.get(`source/Xml/AJPHSB0P/${id}.xml`).toString().matchAll(/graphicname\s*=\s*"([^"]+)"/g))data.set(`source/Xml/image/${m[1].replace(/\.swf$/,'.jpg')}`,jpg);
  return {data,list:()=>[...data.keys()],read:name=>{if(!data.has(name))throw new Error(`Missing ${name}`);return data.get(name);}};
}
const scope={id:'ignition-test',variant:'K14C',sectionFiles:['18']};
test('import generates 11 documents and rejects damaged output/resources',async()=>{
  const parent=await mkdtemp(join(tmpdir(),'manual-import-test-'));const output=join(parent,'manual');
  try{
    const archive=await archiveFixture();
    const report=await buildManual({archive,outputDir:output,scope});
    assert.equal(report.documentIds.length,11);assert.equal(report.counts.graphic,12);
    assert.equal((await checkManual(output)).counts.action,18);
    const indexBefore=await readFile(join(output,'index.json'),'utf8');
    const removed=[...archive.data.keys()].find(p=>p.endsWith('.jpg'));archive.data.delete(removed);
    await assert.rejects(buildManual({archive,outputDir:output,scope}));
    assert.equal(await readFile(join(output,'index.json'),'utf8'),indexBefore);
    const target=join(output,'documents',`${PILOT_IDS[0]}.json`);
    await writeFile(target,(await readFile(target,'utf8'))+' ');
    await assert.rejects(checkManual(output),/hash/i);
    await buildManual({archive:await archiveFixture(),outputDir:output,scope});
    const latest=JSON.parse(await readFile(join(output,'report.json'),'utf8'));
    await unlink(join(output,Object.keys(latest.files).find(p=>p.endsWith('.webp'))));
    await assert.rejects(checkManual(output));
  }finally{await rm(parent,{recursive:true,force:true});}
});
test('section selection takes the requested variant or the variant-free entry, in source order',async()=>{
  const section=parseXmlStrict((await fixture('webdocstructure_18.xml')).toString('utf8'));
  const selected=selectSectionDocuments(section,'K14C');
  assert.equal(selected.variant,'K14C');
  assert.deepEqual(selected.documents.map(d=>d.id),PILOT_IDS);
  assert.equal(selected.documents[0].groupTitle,'Схема');
  assert.throws(()=>selectSectionDocuments(section,'K16X'));
  const common=selectSectionDocuments(parseXmlStrict('<b t="x"><c i="0" t="configtype none title"><t s="0" t="Меры"><s i="AJPHSB0P1000001" t="A"/></t></c></b>'),'K14C');
  assert.equal(common.variant,null);assert.equal(common.documents[0].groupTitle,'Меры');
});
