import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { buildPilot } from './import.mjs';
import { checkPilot } from './check.mjs';
import { PILOT_IDS } from './pilot.mjs';
const fixture = name => readFile(new URL(`./fixtures/${name}`, import.meta.url));
const escapeXml = text => text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
async function archiveFixture() {
  const data = new Map();
  for (const name of [...PILOT_IDS.map(id=>`${id}.xml`),'webdocstructure_18.xml']) data.set(`source/Xml/AJPHSB0P/${name}`,await fixture(name));
  for(const name of ['sdatacharaents.txt','suzuki.xsl','ui.xslt'])data.set(`source/Xml/config8/${name}`,await fixture(name));
  const titles=JSON.parse(await fixture('titles.json'));
  data.set('source/Xml/AJPHSB0P/webdocstructure_00.xml',Buffer.from('<b>'+Object.entries(titles).map(([id,title])=>`<s i="${id}" t="${escapeXml(title)}"/>`).join('')+'</b>'));
  const jpg=await sharp({create:{width:8,height:8,channels:3,background:'#fff'}}).jpeg().toBuffer();
  for(const id of PILOT_IDS)for(const m of data.get(`source/Xml/AJPHSB0P/${id}.xml`).toString().matchAll(/graphicname\s*=\s*"([^"]+)"/g))data.set(`source/Xml/image/${m[1].replace(/\.swf$/,'.jpg')}`,jpg);
  return {data,list:()=>[...data.keys()],read:name=>{if(!data.has(name))throw new Error(`Missing ${name}`);return data.get(name);}};
}
test('import generates 11 documents and rejects damaged output/resources',async()=>{
  const parent=await mkdtemp(join(tmpdir(),'manual-import-test-'));const output=join(parent,'manual');
  try{
    const archive=await archiveFixture();
    const report=await buildPilot({archive,outputDir:output});
    assert.equal(report.documentIds.length,11);assert.equal(report.counts.graphic,12);
    assert.equal((await checkPilot(output)).counts.action,18);
    const indexBefore=await readFile(join(output,'index.json'),'utf8');
    const removed=[...archive.data.keys()].find(p=>p.endsWith('.jpg'));archive.data.delete(removed);
    await assert.rejects(buildPilot({archive,outputDir:output}));
    assert.equal(await readFile(join(output,'index.json'),'utf8'),indexBefore);
    const target=join(output,'documents',`${PILOT_IDS[0]}.json`);
    await writeFile(target,(await readFile(target,'utf8'))+' ');
    await assert.rejects(checkPilot(output),/hash/i);
    await buildPilot({archive:await archiveFixture(),outputDir:output});
    const latest=JSON.parse(await readFile(join(output,'report.json'),'utf8'));
    await unlink(join(output,Object.keys(latest.files).find(p=>p.endsWith('.jpg'))));
    await assert.rejects(checkPilot(output));
  }finally{await rm(parent,{recursive:true,force:true});}
});
