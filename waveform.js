(()=>{
  'use strict';
  const canvas=document.getElementById('two-grid-wave');
  if(!canvas || !canvas.getContext)return;
  const ctx=canvas.getContext('2d');
  if(!ctx)return;
  const motionButton=document.getElementById('signal-motion-toggle');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors={sl:'#edc681',ab:'#78b7a4',grid:'rgba(205,224,213,.09)',zero:'rgba(205,224,213,.24)'};
  const displayed={sl:true,ab:true};
  let width=1,height=1,dpr=1,playing=!reduced,onScreen=true,raf=null,previousTime=null,phase=0;

  function resize(){
    const rect=canvas.getBoundingClientRect();
    width=Math.max(1,Math.round(rect.width));
    height=Math.max(1,Math.round(rect.height));
    dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);
    canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    draw();
  }
  function trace(hertz,angle,stroke){
    const mid=height/2,amplitude=height*.32;
    ctx.beginPath();
    ctx.lineWidth=2.1;
    ctx.strokeStyle=stroke;
    ctx.lineJoin='round';
    ctx.lineCap='round';
    ctx.shadowColor=stroke;
    ctx.shadowBlur=7;
    // The horizontal axis represents 0–40 ms: two cycles of 50 Hz,
    // and 2.4 cycles of 60 Hz. Phase motion is intentionally slowed.
    const steps=Math.min(900,Math.max(180,Math.round(width)));
    for(let i=0;i<=steps;i++){
      const x=i/steps*width,t=i/steps*.04;
      const y=mid-Math.sin(2*Math.PI*hertz*t+angle)*amplitude;
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.stroke();ctx.shadowBlur=0;
  }
  function draw(){
    ctx.clearRect(0,0,width,height);
    ctx.lineWidth=1;
    ctx.strokeStyle=colors.grid;
    for(let i=0;i<=8;i++){
      const x=width*i/8+.5;
      ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke();
    }
    ctx.strokeStyle=colors.zero;
    ctx.beginPath();ctx.moveTo(0,height/2+.5);ctx.lineTo(width,height/2+.5);ctx.stroke();
    if(displayed.sl)trace(50,0,colors.sl);
    if(displayed.ab)trace(60,phase,colors.ab);
  }
  function updateMotion(){
    motionButton.querySelector('.signal-motion-copy').textContent=playing?'PAUSE MOTION':'PLAY MOTION';
    motionButton.querySelector('.signal-motion-icon').textContent=playing?'Ⅱ':'▶';
    motionButton.setAttribute('aria-label',playing?'Pause waveform animation':'Play waveform animation');
    if(playing&&onScreen){
      if(raf===null){previousTime=null;raf=requestAnimationFrame(tick)}
    }else{
      if(raf!==null)cancelAnimationFrame(raf);
      raf=null;previousTime=null;
      draw();
    }
  }
  function tick(timestamp){
    raf=null;
    if(!playing||!onScreen)return;
    if(previousTime!==null){
      phase=(phase+Math.min(60,timestamp-previousTime)*(2*Math.PI/9000))%(2*Math.PI);
    }
    previousTime=timestamp;
    draw();
    raf=requestAnimationFrame(tick);
  }
  motionButton.addEventListener('click',()=>{playing=!playing;updateMotion()});
  document.querySelectorAll('.signal-trace-control').forEach(button=>{
    button.addEventListener('click',()=>{
      const key=button.dataset.trace;
      displayed[key]=!displayed[key];
      button.setAttribute('aria-pressed',String(displayed[key]));
      draw();
    });
  });
  if('IntersectionObserver' in window){
    new IntersectionObserver(entries=>{
      onScreen=entries[0].isIntersecting;
      updateMotion();
    },{threshold:0}).observe(canvas);
  }
  if('ResizeObserver' in window){new ResizeObserver(resize).observe(canvas)}
  else window.addEventListener('resize',resize,{passive:true});
  resize();
  updateMotion();
})();
