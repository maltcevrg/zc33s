import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { convertDocument, walkNodes, buildTitleCatalog, plainText } from './convert.mjs';
import { parseXmlStrict } from './xml.mjs';
import { layoutCalsTable } from '../../src/features/manual/table.js';
import { PILOT_IDS } from './pilot.mjs';
const read = name => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');
const images = new Map([...PILOT_IDS.map(id => read(`${id}.xml`)).join('').matchAll(/graphicname\s*=\s*"([^"]+)"/g)].map(m => [m[1], `images/${m[1].replace(/\.swf$/, '.jpg')}`]));
const context = { entities: read('sdatacharaents.txt'), titles: new Map(Object.entries(JSON.parse(read('titles.json')))), availableIds: new Set(PILOT_IDS), imagePaths: images };
const node = (tag, attrs = {}, children = []) => ({ tag, attrs, children });

test('real pilot preserves counts, diagnostic actions, references and units', () => {
  const docs = PILOT_IDS.map(id => convertDocument(read(`${id}.xml`), context));
  const counts = {};
  for (const doc of docs) walkNodes(doc.body, n => { counts[n.tag] = (counts[n.tag] || 0) + 1; });
  assert.deepEqual(['graphic','table','testgroup','result','action'].map(t => counts[t]), [12,5,9,18,18]);
  const spark = docs.find(d => d.id === 'AJPHSB0P1836001');
  assert(spark.anchors.includes('T1H303'));
  assert(spark.searchText.includes('18 Нм'));
  assert(spark.references.every(r => r.title));
  const torque = docs.find(d => d.id === 'AJPHSB0P1837001');
  assert(torque.searchText.includes('N·m'));
  assert(torque.references.some(r => r.targetId === spark.id && r.anchor === 'T1H303' && r.available));
  assert(torque.references.some(r => r.targetId === 'AJPHSB0P0101008' && !r.available && r.title));
  const sourceActions = [...parseXmlStrict(read('AJPHSB0P1834001.xml'), {entitySource:context.entities}).getElementsByTagName('action')].map(n=>n.textContent.replace(/\s+/g,' ').trim());
  const convertedActions=[];
  walkNodes(docs.find(d=>d.id==='AJPHSB0P1834001').body,n=>{if(n.tag==='action')convertedActions.push(plainText(n.children).replace(/\s+/g,' ').trim());});
  assert.equal(sourceActions.length,18);
  for(let i=0;i<sourceActions.length;i++)assert(convertedActions[i].includes(sourceActions[i]),`action ${i}`);
});
test('catalog rejects conflicting titles and resolves real pilot names',()=>{
  const catalog=buildTitleCatalog([parseXmlStrict(read('webdocstructure_18.xml'))]);
  assert.equal(catalog.get(PILOT_IDS[0]),'Схема системы зажигания');
  assert.throws(()=>buildTitleCatalog([parseXmlStrict('<b><s i="AJPHSB0P1" t="A"/><s i="AJPHSB0P1" t="B"/></b>')]));
});
test('unknown significant tags and absent image mappings fail instead of dropping content', () => {
  assert.throws(() => convertDocument(read('AJPHSB0P1836001.xml').replace('<ptxt>', '<unexpected/> <ptxt>'), context));
  assert.throws(() => convertDocument(read('AJPHSB0P1834001.xml'), { ...context, imagePaths: new Map() }));
});
test('CALS spans skip cells occupied by previous rowspans and reject overlap', () => {
  const group = node('tgroup', {cols:'3'}, [
    ...[1,2,3].map(i=>node('colspec',{colname:String(i),colnum:String(i)})),
    node('tbody',{},[
      node('row',{},[node('entry',{colname:'1',morerows:'1'}),node('entry',{namest:'2',nameend:'3'})]),
      node('row',{},[node('entry',{colname:'2'}),node('entry',{colname:'3'})]),
    ]),
  ]);
  const table = layoutCalsTable(group);
  assert.equal(table.rows[0].cells[0].rowSpan,2);
  assert.equal(table.rows[0].cells[1].colSpan,2);
  assert.equal(table.rows[1].cells[0].column,1);
  assert.throws(()=>layoutCalsTable(node('tgroup',{cols:'1'},[node('tbody',{},[node('row',{},[node('entry',{morerows:'1'})]),node('row',{},[node('entry',{colname:'1'})])])])));
});
