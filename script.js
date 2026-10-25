(()=>{
  'use strict';
  const $=(sel,root=document)=>root.querySelector(sel);
  const $$=(sel,root=document)=>[...root.querySelectorAll(sel)];
  const stageData={
    galle:{period:'2000 — THE BEGINNING',title:'Where it all started.',description:'Born and raised in Galle, Sri Lanka, I grew up curious about how things work. It’s the place that gave me my roots, my early education, and the motivation to keep learning.',coordinate:'SOUTHERN COAST / SRI LANKA'},
    moratuwa:{period:'2020–2026 — THE FOUNDATION',title:'Finding my purpose in engineering.',description:'At the University of Moratuwa, I completed my BSc in Electrical Engineering with First Class Honours, developed award-winning research, and later returned to the classroom as an instructor and lecturer.',coordinate:'UNIVERSITY OF MORATUWA / SRI LANKA'},
    edmonton:{period:'2026 — THE NEXT CHAPTER',title:'Building toward a new energy future.',description:'In September 2026, I moved to Edmonton, Canada, to pursue thesis-based MSc research in Electrical and Computer Engineering at the University of Alberta, focusing on energy systems.',coordinate:'UNIVERSITY OF ALBERTA / CANADA'}
  };
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stageButtons=$$('.journey-button');
  stageButtons.forEach(button=>button.addEventListener('click',()=>{
    const data=stageData[button.dataset.stage];if(!data)return;
    stageButtons.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
    $('#journey-period').textContent=data.period;$('#journey-title').textContent=data.title;$('#journey-description').textContent=data.description;$('#journey-coordinate').textContent=data.coordinate;
  }));
  const menu=$('#menu-toggle'),mobile=$('#mobile-nav');
  const closeMenu=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');mobile.hidden=true;document.body.classList.remove('menu-open')};
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');mobile.hidden=!open;document.body.classList.toggle('menu-open',open)});
  $$('#mobile-nav a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  $('#year').textContent=String(new Date().getFullYear());
  const progress=$('#page-progress');let scrollQueued=false;
  function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?(window.scrollY/max)*100:0)+'%';scrollQueued=false}
  window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress)}},{passive:true});updateProgress();
  const reveals=$$('.reveal');
  if(!reduced&&'IntersectionObserver' in window){const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');io.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -20px 0px'});reveals.forEach(el=>io.observe(el))}else{reveals.forEach(el=>el.classList.add('in-view'))}
  // Quiet circuitry texture: deliberately low contrast, respecting reduced-motion settings.
  const canvas=$('#energy-field');if(!canvas||reduced)return;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  let w=0,h=0,dpr=1,points=[],frame=0,visible=true;
  function resize(){dpr=Math.min(window.devicePixelRatio||1,2);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);const count=Math.min(60,Math.max(26,Math.round(w*h/21000)));points=Array.from({length:count},(_,i)=>({x:(i*97.13%101)/101*w,y:(i*53.71%101)/101*h,r:(i%5===0?1.4:.7),phase:i*.67}))}
  function render(){if(!visible)return;frame++;ctx.clearRect(0,0,w,h);const t=frame*.009;ctx.lineWidth=.6;for(let i=0;i<points.length;i++){const p=points[i],shift=Math.sin(t+p.phase)*7;ctx.beginPath();ctx.fillStyle=`rgba(237,198,129,${.055+Math.sin(t+p.phase)*.025})`;ctx.arc(p.x,p.y+shift,p.r,0,Math.PI*2);ctx.fill();if(i>0&&i%3===0){const q=points[(i*7)%points.length];const dx=p.x-q.x,dy=p.y-q.y;if(dx*dx+dy*dy<125000){ctx.beginPath();ctx.strokeStyle='rgba(237,198,129,.032)';ctx.moveTo(p.x,p.y+shift);ctx.lineTo(q.x,q.y);ctx.stroke()}}}requestAnimationFrame(render)}
  const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting||false;if(visible)requestAnimationFrame(render)},{threshold:0});observer.observe(canvas);
  window.addEventListener('resize',resize,{passive:true});resize();
})();
