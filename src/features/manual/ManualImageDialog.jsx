import { useEffect, useRef, useState } from 'react';

export default function ManualImageDialog({image,onClose,labels}) {
  const dialog=useRef(null);const [zoom,setZoom]=useState(1);const [failed,setFailed]=useState(false);
  useEffect(()=>{
    if(!image)return;
    const element=dialog.current;const trigger=document.activeElement;
    setZoom(1);setFailed(false);element.showModal();
    const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
    return ()=>{element.close();document.body.style.overflow=previousOverflow;trigger?.focus({preventScroll:true});};
  },[image]);
  return <dialog ref={dialog} className="manual-image-dialog" aria-labelledby="manual-image-caption" onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===dialog.current)onClose();}}>
    {image&&<div className="manual-image-dialog__inner">
      <div className="manual-image-dialog__toolbar">
        <h2 id="manual-image-caption">{image.caption}</h2>
        <button type="button" onClick={onClose} autoFocus>{labels.close}</button>
      </div>
      <div className="manual-image-dialog__controls" role="group" aria-label={labels.imageDialog}>
        <button type="button" disabled={zoom<=1} onClick={()=>setZoom(v=>Math.max(1,v-.5))} aria-label={labels.zoomOut}>−</button>
        <output aria-live="polite">{Math.round(zoom*100)}%</output>
        <button type="button" disabled={zoom>=4} onClick={()=>setZoom(v=>Math.min(4,v+.5))} aria-label={labels.zoomIn}>+</button>
        <button type="button" onClick={()=>setZoom(1)}>{labels.reset}</button>
        <a href={image.src} target="_blank" rel="noopener noreferrer">{labels.original}</a>
      </div>
      {failed&&<p role="alert">{labels.imageError}</p>}
      <div className="manual-image-dialog__viewport"><img src={image.src} alt={image.caption} style={{width:`${zoom*100}%`}} onError={()=>setFailed(true)}/></div>
    </div>}
  </dialog>;
}
