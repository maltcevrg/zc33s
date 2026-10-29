import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { PILOT_IDS } from './pilot.mjs';
// react-router 7 ships CommonJS and ESM builds; Vite must load the same ESM build as this file (module-sync), or the router context is lost.

test('React reader renders every pilot image, table, diagnostic result and torque anchor',async()=>{
  const server=await createServer({configFile:false,base:'/zc33s/',esbuild:{jsx:'automatic'},server:{middlewareMode:true},ssr:{resolve:{externalConditions:['module-sync']}},logLevel:'silent'});
  try{
    const page = await server.ssrLoadModule('/src/pages/RepairManualPage.jsx');
    assert.equal(typeof page.default, 'function');
    const { default:ManualContent }=await server.ssrLoadModule('/src/features/manual/ManualContent.jsx');
    const index=JSON.parse(readFileSync('public/manual/index.json'));
    let html='';
    for(const id of PILOT_IDS){
      const document=JSON.parse(readFileSync(`public/manual/documents/${id}.json`));
      html+=renderToStaticMarkup(React.createElement(StaticRouter,{basename:'/zc33s',location:'/zc33s/manual/'},React.createElement(ManualContent,{document,targets:index.targets,onOpenImage:()=>{}})));
    }
    assert.equal((html.match(/data-source-tag="graphic"/g)||[]).length,12);
    assert.equal((html.match(/<table/g)||[]).length,5);
    assert.equal((html.match(/data-source-tag="result"/g)||[]).length,18);
    assert.equal((html.match(/data-source-tag="action"/g)||[]).length,18);
    assert(html.includes('id="T1H303"'));
    assert(html.includes('18'));assert(html.includes('Нм'));
    assert(html.includes('/zc33s/manual/?doc=AJPHSB0P1836001#T1H303'));
    assert(html.includes('rowspan="3"'));
    assert(!html.includes('<object'));assert(!html.includes('<script'));
  }finally{await server.close();}
});

test('React reader renders every published document with all source images, actions and causes',async()=>{
  const server=await createServer({configFile:false,base:'/zc33s/',esbuild:{jsx:'automatic'},server:{middlewareMode:true},ssr:{resolve:{externalConditions:['module-sync']}},logLevel:'silent'});
  try{
    const { default:ManualContent }=await server.ssrLoadModule('/src/features/manual/ManualContent.jsx');
    const index=JSON.parse(readFileSync('public/manual/index.json'));
    const report=JSON.parse(readFileSync('public/manual/report.json'));
    const count=(html,pattern)=>(html.match(pattern)||[]).length;
    let symbols=0;let terms=0;let termRows=0;
    for(const entry of index.documents){
      const document=JSON.parse(readFileSync(`public/manual/${entry.path}`));
      const countTerms=nodes=>nodes.reduce((n,node)=>typeof node==='string'?n:n+(node.tag==='term')+countTerms(node.children),0);
      terms+=countTerms(document.body);
      const html=renderToStaticMarkup(React.createElement(StaticRouter,{basename:'/zc33s',location:'/zc33s/manual/'},React.createElement(ManualContent,{document,targets:index.targets,onOpenImage:()=>{}})));
      const expected=report.documentSourceCounts[entry.id];
      assert.equal(count(html,/data-source-tag="graphic"/g),expected.graphic||0,`${entry.id} graphic`);
      assert.equal(count(html,/data-source-tag="action"/g),expected.action||0,`${entry.id} action`);
      assert.equal(count(html,/data-source-tag="ps"/g),expected.ps||0,`${entry.id} ps`);
      assert.equal(count(html,/data-source-tag="condition"/g),expected.condition||0,`${entry.id} condition`);
      assert(!/<(object|script|embed)/.test(html),entry.id);
      symbols+=count(html,/class="manual-symbol"/g);termRows+=count(html,/<th scope="row"/g);
    }
    assert(symbols>0);
    assert(terms>0);assert.equal(termRows,terms);
  }finally{await server.close();}
});

test('navigation groups sections by chapter and labels variant branches',async()=>{
  const server=await createServer({configFile:false,base:'/zc33s/',esbuild:{jsx:'automatic'},server:{middlewareMode:true},ssr:{resolve:{externalConditions:['module-sync']}},logLevel:'silent'});
  try{
    const { default:ManualNavigation }=await server.ssrLoadModule('/src/features/manual/ManualNavigation.jsx');
    const { manualContent }=await server.ssrLoadModule('/src/features/manual/manualContent.js');
    const index=JSON.parse(readFileSync('public/manual/index.json'));
    const multi=index.sections.find(s=>s.variants.length>1);
    const selected=index.documents.find(d=>d.sectionId===multi.id);
    const render=props=>renderToStaticMarkup(React.createElement(StaticRouter,{basename:'/zc33s',location:'/zc33s/manual/'},React.createElement(ManualNavigation,{
      chapters:index.chapters,sections:index.sections,documents:index.documents,results:[],total:0,searchReady:false,query:'',onQueryChange:()=>{},onShowMore:()=>{},
      selectedId:selected.id,expanded:false,onExpandedChange:()=>{},recent:[],bookmarks:[],onClearRecent:()=>{},labels:manualContent.ru,...props})));
    const html=render();
    assert.equal((html.match(/class="manual-nav-chapter"/g)||[]).length,index.chapters.length);
    assert.equal((html.match(/class="manual-nav-section"/g)||[]).length,index.sections.length);
    assert.equal((html.match(/aria-current="page"/g)||[]).length,1);
    assert(!html.includes('manual-reading'));
    for(const variant of multi.variants)assert(html.includes(` · ${variant}</p>`),variant);
    const lists=render({recent:[selected,index.documents[0]],bookmarks:[index.documents[1]]});
    assert.equal((lists.match(/class="manual-reading-list"/g)||[]).length,2);
    assert(lists.includes(manualContent.ru.savedLocally));
    const found=render({query:'свеча',searchReady:true,total:45,results:[{id:selected.id,title:'Свеча зажигания',sectionId:multi.id,groupTitle:'Группа',snippet:'Проверьте свечу и свечи'}]});
    assert(found.includes('<mark>Свеча</mark> зажигания'));assert(found.includes(`${multi.number} · ${multi.title}`));
    assert(found.includes('Показано 1 из 45'));assert(found.includes('Показать ещё 30'));
  }finally{await server.close();}
});

test('overview links every section, reference list and continue-reading entry of the published manual',async()=>{
  const server=await createServer({configFile:false,base:'/zc33s/',esbuild:{jsx:'automatic'},server:{middlewareMode:true},ssr:{resolve:{externalConditions:['module-sync']}},logLevel:'silent'});
  try{
    const { default:ManualOverview }=await server.ssrLoadModule('/src/features/manual/ManualOverview.jsx');
    const { manualOverview }=await server.ssrLoadModule('/src/features/manual/model.js');
    const { manualContent }=await server.ssrLoadModule('/src/features/manual/manualContent.js');
    const index=JSON.parse(readFileSync('public/manual/index.json'));
    const overview=manualOverview(index);
    const render=recent=>renderToStaticMarkup(React.createElement(StaticRouter,{basename:'/zc33s',location:'/zc33s/manual/'},React.createElement(ManualOverview,{overview,recent,labels:manualContent.ru})));
    const html=render([]);
    assert.equal(overview.reference.length,3);assert(overview.dtc.length>=9);assert(overview.torque.length>=30);
    assert.equal(overview.chapters.reduce((n,c)=>n+c.sections.length,0),index.sections.length);
    assert.equal(overview.chapters.reduce((n,c)=>n+c.sections.reduce((m,s)=>m+s.count,0),0),index.documents.length);
    assert.equal((html.match(/class="manual-overview__chapter"/g)||[]).length,index.chapters.length);
    assert.equal((html.match(/href="\/zc33s\/manual\/\?doc=/g)||[]).length,index.sections.length+overview.reference.length+overview.dtc.length+overview.torque.length);
    // Sections with two branches name the branch, so both SRS torque lists stay distinguishable.
    const branched=overview.torque.filter(d=>d.section.variants.length>1);
    for(const d of branched)assert(html.includes(` · ${d.variant}</span>`),d.variant);
    assert(!html.includes('manual-overview__continue'));
    assert(render([index.documents[5]]).includes(index.documents[5].title));
  }finally{await server.close();}
});

test('English reader localizes generated diagnostic, warning and image labels',async()=>{
  const server=await createServer({configFile:false,base:'/zc33s/',esbuild:{jsx:'automatic'},server:{middlewareMode:true},ssr:{resolve:{externalConditions:['module-sync']}},logLevel:'silent'});
  try{
    const { default:ManualContent }=await server.ssrLoadModule('/src/features/manual/ManualContent.jsx');
    const { manualContent }=await server.ssrLoadModule('/src/features/manual/manualContent.js');
    const node=(tag,children=[],attrs={})=>({tag,children,attrs});
    const document={title:'Inspection',body:[
      node('attention1',[node('ptxt',['Disconnect the battery.'])]),
      node('torque',[node('t-value1',['18 N·m'])]),
      node('servicetool',[node('s-number',['09930-99320'])]),
      node('result',[],{type:'yes'}),node('action',['Replace the part.']),
      node('symbol',[],{path:'symbols/MATORQUE-A.png',name:'MATORQUE-A'}),
    ]};
    const html=renderToStaticMarkup(React.createElement(StaticRouter,{basename:'/zc33s',location:'/zc33s/manual/'},React.createElement(ManualContent,{document,targets:{},onOpenImage:()=>{},labels:manualContent.en})));
    assert.match(html,/lang="en"/);
    assert.match(html,/WARNING:/);
    assert.match(html,/Tightening torque/);
    assert.match(html,/Special tool/);
    assert.match(html,/>Yes</);
    assert.doesNotMatch(html,/[А-Яа-яЁё]/);
    assert.match(html,/18 N·m/);
    assert.match(html,/09930-99320/);
  }finally{await server.close();}
});
