import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { layoutCalsTable } from './table';
import { manualHref } from './model';
import { manualContent } from './manualContent';

const technical = {attention1:'ПРЕДУПРЕЖДЕНИЕ:',attention3:'ПРИМЕЧАНИЕ:',attention4:'УВЕДОМЛЕНИЕ:'};
const textOf = nodes => nodes.map(n=>typeof n==='string'?n:textOf(n.children)).join('').trim();

function Illustration({node,title,labels,onOpenImage}) {
  const [failed,setFailed]=useState(false);
  const src=`${import.meta.env.BASE_URL}manual/${node.attrs.path}`;
  const caption=`${title} — ${node.attrs.graphicname.replace(/\.[^.]+$/,'')}`;
  return <span className="manual-illustration" data-source-tag="graphic">
    <button type="button" className="manual-illustration__open" onClick={()=>onOpenImage({src,caption})} aria-label={`${labels.openImage}: ${caption}`}>
      <img src={src} alt={caption} width={node.attrs.pixelWidth} height={node.attrs.pixelHeight} loading="lazy" onError={()=>setFailed(true)} />
      <span className="manual-illustration__caption">{labels.openImage}</span>
    </button>
    {failed&&<span role="status">{labels.imageError}</span>}
  </span>;
}

export default function ManualContent({document,targets,onOpenImage,labels=manualContent.ru}) {
  const renderNodes=(nodes,level=2)=>{
    const output=[];
    for(let i=0;i<nodes.length;i++){
      const node=nodes[i];
      if(typeof node==='string'){output.push(node);continue;}
      if(node.tag==='s1'||node.tag==='s2'){
        const steps=[node];let j=i+1;
        for(;j<nodes.length;j++){
          if(typeof nodes[j]==='string'&&!nodes[j].trim())continue;
          if(nodes[j].tag===node.tag)steps.push(nodes[j]);else break;
        }
        output.push(<ol className="manual-steps" key={`steps-${i}`}>{steps.map((s,k)=><li key={s.attrs.id||k} id={s.attrs.id}>{renderNodes(s.children,level)}</li>)}</ol>);i=j-1;continue;
      }
      if(node.tag==='result'){
        let j=i+1;while(typeof nodes[j]==='string'&&!nodes[j].trim())j++;
        const action=nodes[j]?.tag==='action'?nodes[j]:null;
        output.push(<div key={i} className="manual-outcome"><strong data-source-tag="result">{node.attrs.type==='yes'?'Да':'Нет'}</strong>{action&&<div data-source-tag="action">{renderNodes(action.children,level)}</div>}</div>);
        if(action)i=j;continue;
      }
      output.push(<Fragment key={node.attrs.id||i}>{renderNode(node,level)}</Fragment>);
    }
    return output;
  };
  const renderNode=(node,level)=>{
    const {tag,attrs,children}=node;
    const rendered=()=>renderNodes(children,level);
    if(tag==='title'){const H=`h${Math.min(level,5)}`;return <H id={attrs.id}>{rendered()}</H>;}
    if(tag==='ptxt')return <p>{rendered()}</p>;
    if(tag==='emph')return attrs.etype==='bold'?<strong>{rendered()}</strong>:<em>{rendered()}</em>;
    if(tag==='servinfosub')return <section id={attrs.id}>{rendered()}</section>;
    if(technical[tag])return <aside className={`manual-attention manual-attention--${tag}`}><strong>{technical[tag]}</strong>{rendered()}</aside>;
    if(tag==='list1')return <ul>{rendered()}</ul>;
    if(tag==='item')return <li>{rendered()}</li>;
    if(tag==='figure')return <figure>{rendered()}</figure>;
    if(tag==='graphic')return <Illustration node={node} title={document.title} labels={labels} onOpenImage={onOpenImage}/>;
    if(tag==='callout')return <div className="manual-callout">{rendered()}</div>;
    if(tag==='table'){
      const group=children.find(n=>n.tag==='tgroup');const table=layoutCalsTable(group);
      return <div className="manual-table-scroll" role="region" aria-label={document.title} tabIndex={0}><table><tbody>{table.rows.map((row,i)=><tr key={i}>{row.cells.map(({node:cell,column,colSpan,rowSpan})=>{
        const Cell=row.header?'th':'td';
        return <Cell key={column} colSpan={colSpan} rowSpan={rowSpan} scope={row.header?'col':undefined} style={['center','right','left'].includes(cell.attrs.align)?{textAlign:cell.attrs.align}:undefined}>{renderNodes(cell.children,level)}</Cell>;
      })}</tr>)}</tbody></table></div>;
    }
    if(tag==='diag')return <ol className="manual-diagnostic">{rendered()}</ol>;
    if(tag==='testgroup')return <li id={attrs.id}>{renderNodes(children,3)}</li>;
    if(tag==='question')return <p className="manual-question">{rendered()}</p>;
    if(tag==='test1'||tag==='action')return <div id={attrs.id}>{rendered()}</div>;
    if(tag.startsWith('intxref')){
      const [id,anchor]=attrs.refid.split('#');
      return <Link className={`manual-reference${targets[id]?.available?'':' manual-reference--outside'}`} to={manualHref(id,anchor)}>{rendered()}</Link>;
    }
    if(tag==='torque')return <div className="manual-value"><strong>Момент затяжки</strong>{rendered()}</div>;
    if(tag==='torqueitem'||tag==='servicetoolitem')return <div id={attrs.id}>{rendered()}</div>;
    if(tag==='servicetool')return <div className="manual-value"><strong>Специальный инструмент</strong>{rendered()}</div>;
    if(tag==='spec-sdm')return <div className="manual-value">{rendered()}</div>;
    if(tag==='sdm-title')return <strong>{rendered()}</strong>;
    if(tag==='sdm1')return <div>{rendered()}</div>;
    if(['t-part','s-part','s-number','sdm-part','sdm-condition'].includes(tag))return <span>{rendered()}{' '}</span>;
    if(tag==='t-value1'||tag==='sdm-value')return <strong className="manual-numeric">{rendered()}</strong>;
    if(tag==='button')return <span className="manual-scan-reference" title="Справка по активному тесту не включена в пробный раздел">[Suzuki SDT-II: {attrs.code}]</span>;
    if(tag==='symbol')return <span>{{star:'★',squf:'■',utrif:'▲',dtrif:'▼',utri:'△',dtri:'▽',rtrif:'▶'}[attrs.name]||attrs.name}</span>;
    throw new Error(`Unsupported manual display node: ${tag} ${textOf(children)}`);
  };
  return <div className="manual-content" lang="ru">{renderNodes(document.body)}</div>;
}
