const elements = (node, tag) => node.children.filter(n => typeof n !== 'string' && (!tag || n.tag === tag));

export function layoutCalsTable(group) {
  const columns = Number(group.attrs.cols);
  if (!Number.isInteger(columns) || columns < 1 || columns > 32) throw new Error('Invalid table column count');
  const names = new Map(elements(group,'colspec').map((n,i)=>[n.attrs.colname,Number(n.attrs.colnum || i+1)-1]));
  for (let i=0;i<columns;i++) if (!names.has(String(i+1))) names.set(String(i+1),i);
  const occupied = Array(columns).fill(0);
  const rows = [];
  for (const body of elements(group).filter(n=>['thead','tbody','tfoot'].includes(n.tag))) {
    for (const row of elements(body,'row')) {
      let cursor = 0;
      const cells = [];
      for (const entry of elements(row,'entry')) {
        while (occupied[cursor] > 0 && cursor < columns) cursor++;
        const startName = entry.attrs.namest || entry.attrs.colname;
        const column = startName ? names.get(startName) : cursor;
        const end = entry.attrs.nameend ? names.get(entry.attrs.nameend) : column;
        const rowSpan = Number(entry.attrs.morerows || 0) + 1;
        if (!Number.isInteger(column) || !Number.isInteger(end) || column < cursor || end < column || end >= columns || !Number.isInteger(rowSpan) || rowSpan < 1) throw new Error('Invalid CALS cell range');
        if (occupied.slice(column,end+1).some(n=>n>0)) throw new Error('Overlapping CALS cells');
        for (let i=column;i<=end;i++) occupied[i]=rowSpan;
        cells.push({node:entry,column,colSpan:end-column+1,rowSpan});
        cursor=end+1;
      }
      rows.push({header:body.tag==='thead',cells});
      for(let i=0;i<columns;i++) occupied[i]=Math.max(0,occupied[i]-1);
    }
  }
  if (occupied.some(Boolean)) throw new Error('CALS rowspan exceeds table');
  return {columns,rows};
}

// diag type="condition": one row per action; condition and possible cause cells span their actions, as in suzuki.xsl.
export function layoutConditionDiag(diag) {
  const items = elements(diag);
  if (items.some(n=>!['condition','ps','action'].includes(n.tag)) || items[0]?.tag !== 'condition') throw new Error('Invalid condition diagnostic');
  const rows = [];
  let condition = null, ps = null, psOpen = false;
  for (const item of items) {
    if (item.tag === 'condition') { condition = {node:item,rowSpan:0,emitted:false}; ps = null; psOpen = false; continue; }
    if (item.tag === 'ps') { if (psOpen && !ps.rowSpan) throw new Error('Possible cause without action'); ps = {node:item,rowSpan:0,emitted:false}; psOpen = true; continue; }
    const row = {action:item};
    condition.rowSpan++;
    if (!condition.emitted) { row.condition = condition; condition.emitted = true; }
    if (psOpen) { ps.rowSpan++; if (!ps.emitted) { row.ps = ps; ps.emitted = true; } }
    else row.ps = {node:null,rowSpan:1};
    rows.push(row);
  }
  if (psOpen && !ps.rowSpan) throw new Error('Possible cause without action');
  return rows.map(({action,condition:c,ps:p})=>({action,condition:c&&{node:c.node,rowSpan:c.rowSpan},ps:p&&{node:p.node,rowSpan:p.rowSpan}}));
}
