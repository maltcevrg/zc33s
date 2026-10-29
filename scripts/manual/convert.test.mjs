import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { convertDocument, walkNodes, buildTitleCatalog, plainText } from './convert.mjs';
import { parseXmlStrict } from './xml.mjs';
import { layoutCalsTable, layoutConditionDiag } from '../../src/features/manual/table.js';
import { PILOT_IDS } from './pilot.mjs';
import { fixWording } from './wording.mjs';
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
  // The reader labels each torque block; search must find those words too.
  let torqueBlocks=0;walkNodes(spark.body,n=>{if(n.tag==='torque')torqueBlocks++;});
  assert(torqueBlocks>0);assert.equal((spark.searchText.match(/Момент затяжки/g)||[]).length,torqueBlocks);
  assert(spark.references.every(r => r.title));
  const torque = docs.find(d => d.id === 'AJPHSB0P1837001');
  assert(torque.searchText.includes('N·m'));
  assert(torque.references.some(r => r.targetId === spark.id && r.anchor === 'T1H303' && r.available));
  assert(torque.references.some(r => r.targetId === 'AJPHSB0P0101008' && !r.available && r.title));
  const sourceActions = [...parseXmlStrict(read('AJPHSB0P1834001.xml'), {entitySource:context.entities}).getElementsByTagName('action')].map(n=>fixWording(n.textContent).replace(/\s+/g,' ').trim());
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

const ENGINE_IDS = ['AJPHSB0P1634001','AJPHSB0P1336003','AJPHSB0P1436021','AJPHSB0P1536004'];
const engineContext = () => {
  const xml = ENGINE_IDS.map(id => read(`${id}.xml`)).join('');
  const imagePaths = new Map([...xml.matchAll(/graphicname\s*=\s*"([^"]+)"/g)].map(m => [m[1], `images/${m[1].replace(/\.(swf|jpg)$/i, '.webp')}`]));
  const symbolPaths = new Map([...xml.matchAll(/<symbol name\s*=\s*"(MA[\w-]+)"/g)].map(m => [m[1], `symbols/${m[1]}.png`]));
  return { ...context, availableIds: new Set([...PILOT_IDS, ...ENGINE_IDS]), imagePaths, symbolPaths };
};
const source = (id, tag) => parseXmlStrict(read(`${id}.xml`), {entitySource:context.entities}).getElementsByTagName(tag);

test('condition diagnostics keep every condition, possible cause and action in source order', () => {
  const doc = convertDocument(read('AJPHSB0P1634001.xml'), engineContext());
  const diags = []; walkNodes(doc.body, n => { if (n.tag === 'diag' && n.attrs.type === 'condition') diags.push(n); });
  assert.equal(diags.length, 1);
  const rows = layoutConditionDiag(diags[0]);
  const text = n => plainText(n.children).replace(/\s+/g, ' ').trim();
  // Icon-only references gain their target title after the source text.
  const actions = [...source('AJPHSB0P1634001', 'action')].map(n => n.textContent.replace(/\s+/g, ' ').trim());
  assert.equal(rows.length, actions.length);
  rows.forEach((r, i) => assert(text(r.action).startsWith(actions[i]), `action ${i}`));
  assert.equal(rows.filter(r => r.ps?.node).length, source('AJPHSB0P1634001', 'ps').length);
  assert.equal(rows.filter(r => r.condition).length, source('AJPHSB0P1634001', 'condition').length);
  assert.equal(rows.reduce((n, r) => n + (r.condition?.rowSpan || 0), 0), rows.length);
});
test('condition layout spans causes over consecutive actions and rejects orphaned causes', () => {
  const rows = layoutConditionDiag(node('diag', {type:'condition'}, [node('condition'), node('ps'), node('action'), node('action'), node('ps'), node('action'), node('condition'), node('action')]));
  assert.deepEqual(rows.map(r => [r.condition?.rowSpan ?? 0, r.ps ? (r.ps.node ? r.ps.rowSpan : 'empty') : 0]), [[3, 2], [0, 0], [0, 1], [1, 'empty']]);
  assert.throws(() => layoutConditionDiag(node('diag', {}, [node('condition'), node('ps'), node('ps'), node('action')])));
  assert.throws(() => layoutConditionDiag(node('diag', {}, [node('action')])));
});
test('bare subsection references resolve to anchors in the same document with the subsection title', () => {
  const doc = convertDocument(read('AJPHSB0P1336003.xml'), engineContext());
  const local = doc.references.filter(r => r.targetId === doc.id);
  assert(local.length >= 2);
  for (const ref of local) assert(doc.anchors.includes(ref.anchor), ref.anchor);
  const links = []; walkNodes(doc.body, n => { if (n.tag.startsWith('intxref') && n.attrs.refid.startsWith(`${doc.id}#`)) links.push(n); });
  assert(links.every(n => plainText(n.children).trim() && plainText(n.children).trim() !== doc.title));
  assert.equal(source('AJPHSB0P1336003', 'attention2').length, 1);
  assert(doc.sourceCounts.attention2 === 1);
});
test('pictograms require their source image and torque notes keep XSL punctuation sources', () => {
  assert.throws(() => convertDocument(read('AJPHSB0P1536004.xml'), { ...engineContext(), symbolPaths: new Map() }), /Missing symbol/);
  const doc = convertDocument(read('AJPHSB0P1536004.xml'), engineContext());
  const symbols = []; walkNodes(doc.body, n => { if (n.tag === 'symbol') symbols.push(n); });
  assert(symbols.length >= 3 && symbols.every(n => n.attrs.path === `symbols/${n.attrs.name}.png`));
  const torque = convertDocument(read('AJPHSB0P1436021.xml'), engineContext());
  assert(torque.searchText.includes('5.0 N·m → 7.5 N·m'));
  const tags = new Set(); walkNodes(torque.body, n => tags.add(n.tag));
  for (const tag of ['materials', 'materialitem', 'm-part', 't-part1', 't-note']) assert(tags.has(tag), tag);
});
test('definition lists keep term/definition pairs and revision marks print nothing, as in suzuki.xsl', () => {
  const withBody = body => read('AJPHSB0P1836001.xml').replace('<ptxt>', `${body} <ptxt>`);
  const doc = convertDocument(withBody('<deflist><term id="D1">A/B</term><def><ptxt>воздушная подушка</ptxt></def></deflist><p-change/><c-change/>'), context);
  const lists = []; const tags = new Set(); walkNodes(doc.body, n => { tags.add(n.tag); if (n.tag === 'deflist') lists.push(n); });
  assert.deepEqual(lists[0].children.filter(n => typeof n !== 'string').map(n => n.tag), ['term', 'def']);
  assert(doc.anchors.includes('D1') && doc.searchText.includes('воздушная подушка'));
  assert(!tags.has('p-change') && !tags.has('c-change'));
  assert.throws(() => convertDocument(withBody('<deflist><def><ptxt>x</ptxt></def></deflist>'), context), /deflist/);
  assert.throws(() => convertDocument(withBody('<deflist><term>x</term></deflist>'), context), /deflist/);
  assert.throws(() => convertDocument(withBody('<p-change>текст</p-change>'), context), /p-change/);
});
