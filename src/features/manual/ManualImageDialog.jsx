import { useEffect, useRef, useState } from 'react';

const MIN_ZOOM = 1;const MAX_ZOOM = 4;
const clampZoom = value => Math.min(MAX_ZOOM,Math.max(MIN_ZOOM,value));

export default function ManualImageDialog({image,onClose,labels}) {
  const dialog=useRef(null);const viewport=useRef(null);const drag=useRef(null);
  const [zoom,setZoom]=useState(1);const [failed,setFailed]=useState(false);const [dragging,setDragging]=useState(false);
  useEffect(()=>{
    if(!image)return;
    const element=dialog.current;const trigger=document.activeElement;
    setZoom(1);setFailed(false);element.showModal();
    const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
    return ()=>{element.close();document.body.style.overflow=previousOverflow;trigger?.focus({preventScroll:true});};
  },[image]);
  // Ctrl + wheel zooms the diagram instead of the page; React wheel listeners are passive, so this one is native.
  useEffect(()=>{
    const box=viewport.current;if(!image||!box)return;
    const onWheel=e=>{if(!e.ctrlKey)return;e.preventDefault();setZoom(v=>clampZoom(v+(e.deltaY<0?.5:-.5)));};
    box.addEventListener('wheel',onWheel,{passive:false});
    return ()=>box.removeEventListener('wheel',onWheel);
  },[image]);
  function onKeyDown(e) {
    if(e.ctrlKey||e.metaKey||e.altKey||e.target instanceof HTMLInputElement)return;
    if(e.key==='+'||e.key==='=')setZoom(v=>clampZoom(v+.5));
    else if(e.key==='-'||e.key==='_')setZoom(v=>clampZoom(v-.5));
    else if(e.key==='0')setZoom(1);
    else return;
    e.preventDefault();
  }
  // Touch screens already pan by scrolling; a mouse drags the enlarged diagram.
  function onPointerDown(e) {
    const box=viewport.current;
    if(e.pointerType!=='mouse'||e.button!==0||zoom<=1)return;
    drag.current={x:e.clientX,y:e.clientY,left:box.scrollLeft,top:box.scrollTop};
    box.setPointerCapture(e.pointerId);setDragging(true);e.preventDefault();
  }
  function onPointerMove(e) {
    const start=drag.current;if(!start)return;
    viewport.current.scrollLeft=start.left-(e.clientX-start.x);viewport.current.scrollTop=start.top-(e.clientY-start.y);
  }
  const endDrag=()=>{drag.current=null;setDragging(false);};
  return <dialog ref={dialog} className="manual-image-dialog" aria-labelledby="manual-image-caption" aria-describedby="manual-image-hint" onKeyDown={onKeyDown} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===dialog.current)onClose();}}>
    {image&&<div className="manual-image-dialog__inner">
      <div className="manual-image-dialog__toolbar">
        <h2 id="manual-image-caption">{image.caption}</h2>
        <button type="button" onClick={onClose} autoFocus>{labels.close}</button>
      </div>
      <div className="manual-image-dialog__controls" role="group" aria-label={labels.imageDialog}>
        <button type="button" disabled={zoom<=MIN_ZOOM} onClick={()=>setZoom(v=>clampZoom(v-.5))} aria-label={labels.zoomOut} aria-keyshortcuts="-">−</button>
        <output aria-live="polite">{Math.round(zoom*100)}%</output>
        <button type="button" disabled={zoom>=MAX_ZOOM} onClick={()=>setZoom(v=>clampZoom(v+.5))} aria-label={labels.zoomIn} aria-keyshortcuts="+">+</button>
        <button type="button" onClick={()=>setZoom(1)} aria-keyshortcuts="0">{labels.reset}</button>
        <p id="manual-image-hint" className="manual-image-dialog__hint">{labels.dragHint}</p>
        <a href={image.src} target="_blank" rel="noopener noreferrer">{labels.original}</a>
      </div>
      {failed&&<p role="alert">{labels.imageError}</p>}
      <div ref={viewport} className={`manual-image-dialog__viewport${zoom>1?' manual-image-dialog__viewport--zoomed':''}${dragging?' manual-image-dialog__viewport--dragging':''}`} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag}>
        <img src={image.src} alt={image.caption} style={{width:`${zoom*100}%`}} draggable={false} onError={()=>setFailed(true)}/>
      </div>
    </div>}
  </dialog>;
}
