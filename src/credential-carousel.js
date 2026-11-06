/** Native horizontal scrolling works without autoplay; return SPA cleanup. */
export function bindCredentialCarousel(root=document) {
  const section=root.querySelector('.credential-gallery');
  if(!section)return ()=>{};
  const viewport=section.querySelector('.credential-viewport'),track=section.querySelector('.credential-track');
  const originals=[...track.children],controls=section.querySelector('.credential-controls'),toggle=section.querySelector('[data-credentials-toggle]');
  const motion=matchMedia('(prefers-reduced-motion: reduce)'),events=new AbortController();
  let frame=0,lastTime=0,position=0,lastWritten=0,band=0,visible=false,overflow=false;
  let userPaused=false,hovered=false,focused=false,drag=null,held=false,resumeAfter=0;
  const on=(el,name,fn,options={})=>el.addEventListener(name,fn,{...options,signal:events.signal});
  const write=value=>{position=value;viewport.scrollLeft=value;lastWritten=viewport.scrollLeft;};
  const updateButton=()=>{
    const paused=userPaused||motion.matches;
    toggle.setAttribute('aria-label',paused?toggle.dataset.playLabel:toggle.dataset.pauseLabel);
    toggle.setAttribute('aria-pressed',String(!paused));
    toggle.firstElementChild.textContent=paused?'▶':'Ⅱ';toggle.hidden=motion.matches;
  };
  const stop=()=>{cancelAnimationFrame(frame);frame=0;lastTime=0;};
  const canRun=()=>overflow&&visible&&!document.hidden&&!motion.matches&&!userPaused&&!hovered&&!focused&&!held;
  const normalize=value=>band?band+((value-band)%band+band)%band:value;
  function tick(time){
    frame=0;if(!canRun())return;
    if(Math.abs(viewport.scrollLeft-lastWritten)>2)position=viewport.scrollLeft;
    if(lastTime&&time>=resumeAfter)write(normalize(position+Math.min(time-lastTime,50)*.024));
    lastTime=time;frame=requestAnimationFrame(tick);
  }
  const sync=()=>{stop();if(canRun())frame=requestAnimationFrame(tick);};
  function setup(){
    stop();track.querySelectorAll('[data-credential-clone]').forEach(el=>el.remove());
    band=0;write(0);overflow=viewport.scrollWidth>viewport.clientWidth+1;
    controls.hidden=!overflow;viewport.tabIndex=overflow?0:-1;
    if(overflow&&!motion.matches){
      const copies=()=>{const fragment=document.createDocumentFragment();originals.forEach(el=>{const copy=el.cloneNode(true);copy.dataset.credentialClone='';copy.setAttribute('aria-hidden','true');copy.inert=true;fragment.append(copy);});return fragment;};
      track.prepend(copies());track.append(copies());
      band=originals[0].offsetLeft-track.firstElementChild.offsetLeft;write(band);
    }
    updateButton();sync();
  }
  const pauseBriefly=()=>{resumeAfter=performance.now()+5000;};
  const step=direction=>{pauseBriefly();write(normalize(viewport.scrollLeft+direction*(originals[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap))));};
  on(toggle,'click',()=>{userPaused=!userPaused;updateButton();sync();});
  section.querySelectorAll('[data-credentials-step]').forEach(button=>on(button,'click',()=>step(Number(button.dataset.credentialsStep))));
  on(viewport,'keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();pauseBriefly();
    if(event.key==='Home')write(band);
    else if(event.key==='End')write(band?band*2-viewport.clientWidth:viewport.scrollWidth-viewport.clientWidth);
    else step(event.key==='ArrowRight'?1:-1);
  });
  on(section,'pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;sync();}});
  on(section,'pointerleave',()=>{hovered=false;sync();});
  on(section,'focusin',()=>{focused=true;sync();});
  on(section,'focusout',event=>{focused=section.contains(event.relatedTarget);sync();});
  on(viewport,'pointerdown',event=>{
    if(event.button!==0||!overflow)return;
    held=true;pauseBriefly();stop();
    if(event.pointerType==='mouse'){drag={id:event.pointerId,x:event.clientX,left:viewport.scrollLeft};viewport.setPointerCapture(event.pointerId);viewport.classList.add('is-dragging');}
  });
  on(viewport,'pointermove',event=>{if(drag&&event.pointerId===drag.id){event.preventDefault();write(drag.left+drag.x-event.clientX);}});
  const release=()=>{
    if(!held)return;
    held=false;drag=null;viewport.classList.remove('is-dragging');position=viewport.scrollLeft;lastWritten=position;pauseBriefly();sync();
  };
  on(window,'pointerup',release);on(window,'pointercancel',release);
  on(viewport,'wheel',pauseBriefly,{passive:true});
  on(document,'visibilitychange',sync);on(motion,'change',setup);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.15});
  intersection.observe(section);
  const resize=new ResizeObserver(setup);resize.observe(viewport);setup();
  return ()=>{stop();events.abort();intersection.disconnect();resize.disconnect();};
}
