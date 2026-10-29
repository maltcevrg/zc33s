import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSearch, stemWord, searchManual, findManual, markMatches, manualOverview, documentOutline, manualHref, createDocumentLoader, readStoredIds, writeStoredIds, pushRecent, toggleId } from './model.js';
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
  assert.deepEqual(findManual(entries,'зажигания').map(e=>e.id),[entries[0].id]);
  assert.equal(searchManual(entries,'а',1).length,1);
});
test('matches are marked with ё folded and overlapping tokens merged',()=>{
  assert.deepEqual(markMatches('Осмотрите разъём',' РАЗЪЕМ '),[{text:'Осмотрите ',match:false},{text:'разъём',match:true}]);
  assert.deepEqual(markMatches('свеча свечей','свеч свеча'),[{text:'свеча',match:true},{text:' ',match:false},{text:'свечей',match:true}]);
  assert.deepEqual(markMatches('Снять свечу (M12)','снятие m1'),[{text:'Снять',match:true},{text:' свечу (',match:false},{text:'M12',match:true},{text:')',match:false}]);
  assert.deepEqual(markMatches('текст',''),[{text:'текст',match:false}]);
});
test('search finds other forms of Russian words but keeps codes and short words exact',()=>{
  assert.equal(stemWord('свечи'),'свеч');assert.equal(stemWord('снятие'),'снят');assert.equal(stemWord('затяжки'),'затяжк');
  assert.equal(stemWord('объем'),'объем');assert.equal(stemWord('вал'),'вал');assert.equal(stemWord('p0301'),'p0301');assert.equal(stemWord('снятие/установка'),'снятие/установка');
  assert.deepEqual(findManual(entries,'свечи зажигания').map(e=>e.id),[entries[0].id]);
  assert.deepEqual(findManual(entries,'снятие свечи').map(e=>e.id),[entries[0].id]);
  assert.deepEqual(findManual(entries,'катушка').map(e=>e.id),[entries[1].id]);
  const exact={...entries[1],id:'EXACT',title:'Свечи'};
  assert.equal(findManual([entries[0],exact],'свечи')[0].id,'EXACT');
});
test('overview gathers reference lists and sections by chapter in manual order',()=>{
  const index={chapters:[{number:'0',title:'Общие'},{number:'1',title:'Двигатель'}],
    sections:[{id:'02',number:'0B',chapter:'0',title:'ТО'},{id:'11',number:'1A',chapter:'1',title:'управление'},{id:'13',number:'1C',chapter:'1',title:'механика'}],
    documents:[{id:'AJPHSB0P0205001',sectionId:'02',title:'Перечень методов проверки и обслуживания'},{id:'X1',sectionId:'11',title:'Обзор'},{id:'X2',sectionId:'11',title:'Список кодов неисправностей'},
      {id:'X3',sectionId:'11',title:'Список моментов затяжки'},{id:'X4',sectionId:'13',title:'Список моментов затяжки'}]};
  const overview=manualOverview(index);
  assert.deepEqual(overview.reference.map(d=>d.id),['AJPHSB0P0205001']);
  assert.deepEqual(overview.dtc.map(d=>[d.id,d.section.number]),[['X2','1A']]);
  assert.deepEqual(overview.torque.map(d=>[d.id,d.section.number]),[['X3','1A'],['X4','1C']]);
  assert.deepEqual(overview.chapters.map(c=>c.sections.map(s=>[s.number,s.count,s.firstId])),[[['0B',1,'AJPHSB0P0205001']],[['1A',3,'X1'],['1C',1,'X4']]]);
});
test('document outline lists titled sections and their topics only',()=>{
  const title=text=>({tag:'title',attrs:{},children:['\n',text,'\n']});
  const body=['\n',{tag:'servinfosub',attrs:{id:'A'},children:[title('Удаление'),{tag:'topic',attrs:{id:'A1'},children:[title('Разъём  «E01»'),{tag:'subtopic',attrs:{id:'A11'},children:[title('глубже')]}]},{tag:'table',attrs:{},children:[title('Таблица')]}]},
    {tag:'servinfosub',attrs:{id:'B'},children:[{tag:'ptxt',attrs:{},children:['без заголовка']}]},{tag:'topic',attrs:{id:'C'},children:[title('Тема вне раздела')]}];
  assert.deepEqual(documentOutline(body),[{id:'A',title:'Удаление',depth:0},{id:'A1',title:'Разъём «E01»',depth:1}]);
});
test('stored reading lists survive broken storage and keep order',()=>{
  const data=new Map();const storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};
  assert.deepEqual(readStoredIds(storage,'k'),[]);
  writeStoredIds(storage,'k',['A','B']);assert.deepEqual(readStoredIds(storage,'k'),['A','B']);
  data.set('k','{bad');assert.deepEqual(readStoredIds(storage,'k'),[]);
  data.set('k','[1,"A",null]');assert.deepEqual(readStoredIds(storage,'k'),['A']);
  const throwing={getItem(){throw new Error('denied');},setItem(){throw new Error('denied');}};
  assert.deepEqual(readStoredIds(throwing,'k'),[]);assert.doesNotThrow(()=>writeStoredIds(throwing,'k',['A']));
  assert.deepEqual(pushRecent(['A','B','C'],'B'),['B','A','C']);assert.deepEqual(pushRecent(['A','B'],'C',2),['C','A']);
  assert.deepEqual(toggleId(['A'],'B'),['B','A']);assert.deepEqual(toggleId(['B','A'],'B'),['A']);
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
