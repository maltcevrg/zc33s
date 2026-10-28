import { createHash } from 'node:crypto';
import { parseXmlStrict } from './xml.mjs';
import { layoutCalsTable } from '../../src/features/manual/table.js';

const TAGS = new Set('title ptxt emph servinfosub attention1 attention3 attention4 s1 s2 list1 item figure graphic callout table tgroup colspec thead tbody row entry diag testgroup question result action test1 intxref intxrefpoff intxreftitleoff1 intxreftitleoff torque torqueitem t-part t-value1 servicetool servicetoolitem s-part s-number spec-sdm sdm-title sdm-part sdm1 sdm-condition sdm-value button symbol'.split(' '));
const ATTRS = new Set('id etype type refid graphicname width height cols colnum colname colwidth morerows namest nameend align valign num code name'.split(' '));
const GROUPS = {2:'Схема',3:'Схема расположения компонентов',4:'Диагностика',6:'Обслуживание',7:'Технические данные',8:'Указанные материалы/специальные инструменты'};
export const semanticLabels = Object.freeze({ attention1:'ПРЕДУПРЕЖДЕНИЕ:', attention3:'ПРИМЕЧАНИЕ:', attention4:'УВЕДОМЛЕНИЕ:', torque:'Момент затяжки', torqueUnit:'Нм' });

export function walkNodes(nodes, visit) {
  for (const node of nodes) if (typeof node !== 'string') { visit(node); walkNodes(node.children,visit); }
}
export function plainText(nodes) {
  return nodes.map(n=>typeof n==='string'?n:plainText(n.children)+(n.tag==='ptxt'||n.tag==='title'?'\n':'')).join('');
}
export function buildTitleCatalog(docs) {
  const titles = new Map();
  for (const doc of docs) {
    for(const node of doc.getElementsByTagName('s')) {
      const id=node.getAttribute('i');const title=node.getAttribute('t');
      if(!id?.startsWith('AJPHSB0P')||!title) continue;
      if(titles.has(id)&&titles.get(id)!==title) throw new Error(`Conflicting title: ${id}`);
      titles.set(id,title);
    }
  }
  return titles;
}

export function convertDocument(xml,{entities,titles,availableIds,imagePaths}) {
  const dom=parseXmlStrict(xml,{entitySource:entities});
  const info=dom.getElementsByTagName('servinfo')[0];
  if(!info) throw new Error('No servinfo');
  const id=info.getAttribute('servinfosgmlid');
  const engine=dom.getElementsByTagName('configtype')[0]?.getAttribute('typenbr');
  if(!availableIds.has(id)||engine!=='3') throw new Error(`Unexpected pilot document: ${id}`);
  const title=info.getElementsByTagName('title')[0].textContent.trim();
  const groupId=dom.getElementsByTagName('servinfotype')[0].getAttribute('sitcode');
  const anchors=[];const references=[];const images=[];
  const convert = original => {
    if(original.nodeType===3||original.nodeType===4) return original.data;
    if(original.nodeType===8) return null;
    if(original.nodeType!==1) throw new Error(`Unsupported XML node: ${original.nodeName}`);
    const tag=original.nodeName;
    if(tag==='img') {
      if(!original.parentNode.nodeName.startsWith('intxref')) throw new Error('Unexpected source img');
      return null;
    }
    if(!TAGS.has(tag)) throw new Error(`Unknown significant element: ${tag}`);
    const attrs={};
    for(const attr of original.attributes) if(ATTRS.has(attr.name)) attrs[attr.name]=attr.value;
    if(attrs.id) {if(anchors.includes(attrs.id))throw new Error(`Duplicate anchor: ${attrs.id}`);anchors.push(attrs.id);}
    const children=Array.from(original.childNodes).map(convert).filter(n=>n!==null);
    if(tag==='t-value1') children.push(' '+semanticLabels.torqueUnit);
    if(tag==='graphic') {
      const path=imagePaths.get(attrs.graphicname);
      if(!path) throw new Error(`Missing image: ${attrs.graphicname}`);
      attrs.path=path;
      images.push({sourceName:attrs.graphicname,path,width:attrs.width,height:attrs.height});
    }
    if(tag.startsWith('intxref')) {
      const parts=(attrs.refid||'').split('#');
      if(parts.length>2||!titles.has(parts[0])) throw new Error(`Unresolved reference: ${attrs.refid}`);
      const reference={targetId:parts[0],anchor:parts[1]||'',title:titles.get(parts[0]),available:availableIds.has(parts[0])};
      references.push(reference);
      attrs.targetTitle=reference.title;attrs.available=reference.available;
      if(!plainText(children).trim())children.push(reference.title);
    }
    const node={tag,attrs,children};
    if(tag==='tgroup')layoutCalsTable(node);
    return node;
  };
  const body=Array.from(info.childNodes).filter(n=>n!==info.getElementsByTagName('title')[0]).map(convert).filter(n=>n!==null);
  return {schemaVersion:1,id,title,section:'1H',engine:'K14C',groupId,groupTitle:GROUPS[groupId],body,anchors,images,references,searchText:plainText(body).replace(/\s+/g,' ').trim(),sourceSha256:createHash('sha256').update(xml).digest('hex')};
}
