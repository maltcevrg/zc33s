import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { PILOT_IDS } from './pilot.mjs';

test('React reader renders every pilot image, table, diagnostic result and torque anchor',async()=>{
  const server=await createServer({configFile:false,base:'/zc33s/',esbuild:{jsx:'automatic'},server:{middlewareMode:true},logLevel:'silent'});
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
