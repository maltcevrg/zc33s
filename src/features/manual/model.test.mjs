import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSearch, searchManual, manualHref, createDocumentLoader } from './model.js';
const entries=[
  {id:'AJPHSB0P1836001',title:'Снятие/установка свечей зажигания',groupTitle:'Обслуживание',text:'Свеча зажигания 18 Нм'},
  {id:'AJPHSB0P1834002',title:'Проверка искры',groupTitle:'Диагностика',text:'Осмотрите   разъём катушки IG.'},
];
test('search normalizes Russian and finds titles, body, IDs and empty states',()=>{
  assert.equal(normalizeSearch('  ЁЖ  K14C '),'еж k14c');
  assert.equal(searchManual(entries,'свеча 18')[0].id,entries[0].id);
  assert.equal(searchManual(entries,'разъем')[0].snippet,'Осмотрите   разъём катушки IG.');
  assert.equal(searchManual(entries,entries[1].id)[0].id,entries[1].id);
  assert.deepEqual(searchManual(entries,''),[]);assert.deepEqual(searchManual(entries,'absent text'),[]);
  const bodyMatch={...entries[1],id:'BODY',text:'Свечей'};
  assert.equal(searchManual([bodyMatch,entries[0]],'свечей')[0].id,entries[0].id);
});
test('router URLs preserve document and anchor without duplicating host base',()=>{
  assert.equal(manualHref('AJPHSB0P1836001','T1H303'),'/manual/?doc=AJPHSB0P1836001#T1H303');
  assert.equal(manualHref(),'/manual/');
});
test('late response never replaces the latest document, cancel is independent',async()=>{
  const responses=new Map();
  const loader=createDocumentLoader(url=>new Promise(resolve=>responses.set(url,resolve)));
  const a=loader.load('A');const b=loader.load('B');
  responses.get('B')({ok:true,json:async()=>({id:'B'})});
  assert.deepEqual(await b,{id:'B'});
  responses.get('A')({ok:true,json:async()=>({id:'A'})});assert.equal(await a,null);
  const c=loader.load('C');loader.cancel();responses.get('C')({ok:true,json:async()=>({id:'C'})});assert.equal(await c,null);
});
test('current errors reject and retry succeeds',async()=>{
  let ok=false;const loader=createDocumentLoader(async()=>({ok,status:503,json:async()=>({id:'retry'})}));
  await assert.rejects(loader.load('page'),/503/);ok=true;
  assert.deepEqual(await loader.load('page'),{id:'retry'});
});
