(() => {
 'use strict';
 const root=document.documentElement, body=document.body;
 const copy=window.STUDIO_COPY, projects=window.STUDIO_PROJECTS;
 const dialog=document.querySelector('#project-dialog');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let language='en',filter='all',scene=-1,activeProject=null,motionPaused=reduced.matches;
 const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,v));
 const textLines=(el,text)=>{el.replaceChildren();String(text).split('\n').forEach((line,i)=>{if(i)el.append(document.createElement('br'));el.append(document.createTextNode(line));});};
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.10}):null;
 const observe=scope=>scope.querySelectorAll('.reveal').forEach(el=>observer?observer.observe(el):el.classList.add('visible'));
 function fillProject(project){
  const t=project[language];
  document.querySelector('#project-kind').textContent=t.kind;
  document.querySelector('#project-title').textContent=t.title;
  document.querySelector('#project-description').textContent=t.description;
  document.querySelector('#project-role').textContent=t.role;
  document.querySelector('#project-tools').textContent=project.toolsLocalized?.[language]||project.tools;
  document.querySelector('#project-link').href=project.url;
 }
 function openProject(project){activeProject=project;fillProject(project);dialog.showModal();}
 function renderWork(){
  const grid=document.querySelector('#work-grid');grid.replaceChildren();
  projects.filter(p=>filter==='all'||p.category===filter).forEach(project=>{
   const t=project[language],index=projects.indexOf(project)+1;
   const card=document.createElement('article');card.className='work-card reveal';
   const visual=document.createElement('button');visual.className='work-visual';visual.setAttribute('aria-label',t.title);visual.type='button';
   const art=document.createElement('span');art.className='project-art art-'+project.art;art.setAttribute('aria-hidden','true');
   for(let i=0;i<3;i++)art.append(document.createElement('i'));
   const number=document.createElement('span');number.className='work-visual-number';number.textContent='0'+index+' / AJ';number.setAttribute('aria-hidden','true');
   const caption=document.createElement('span');caption.className='work-visual-caption';caption.textContent=copy[language].projectBreakdown;caption.setAttribute('aria-hidden','true');
   const arrow=document.createElement('span');arrow.className='work-open';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');
   visual.append(number,art,caption,arrow);visual.addEventListener('click',()=>openProject(project));
   const content=document.createElement('div');content.className='work-card-content';
   const category=document.createElement('p');category.className='work-card-category';category.textContent=t.kind;
   const title=document.createElement('h3');const titleButton=document.createElement('button');titleButton.type='button';titleButton.className='work-title-button';titleButton.textContent=t.title;titleButton.addEventListener('click',()=>openProject(project));title.append(titleButton);
   const subtitle=document.createElement('p');subtitle.textContent=t.subtitle;content.append(category,title,subtitle);card.append(visual,content);grid.append(card);
  });
  observe(grid);
 }
 function paintScene(index,force=false){
  if(index===scene&&!force)return;scene=index;const c=copy[language];
  document.querySelector('#scene-index').textContent='0'+(index+1)+' — 03';
  textLines(document.querySelector('#scene-title'),c.sceneTitles[index]);
  document.querySelector('#scene-copy').textContent=c.sceneCopies[index];
  document.querySelector('#theatre-caption').textContent=c.sceneLabels[index];
  document.querySelector('#film-label').textContent=c.filmLabels[index];
  document.querySelectorAll('.scene-steps i').forEach((el,i)=>el.classList.toggle('active',i===index));
 }
 function paintMotionControl(){
  body.classList.toggle('motion-paused',motionPaused);
  const button=document.querySelector('#motion-control');button.setAttribute('aria-pressed',String(motionPaused));
  document.querySelector('#motion-icon').textContent=motionPaused?'▷':'Ⅱ';
  document.querySelector('#motion-label').textContent=copy[language][motionPaused?'playMotion':'pauseMotion'];
 }
 function setLanguage(value){
  if(!copy[value])value='en';language=value;const c=copy[language];root.lang=language;root.dir=language==='fa'?'rtl':'ltr';
  document.querySelector('#language').value=language;
  document.querySelector('#language').setAttribute('aria-label',c.language);
  document.querySelectorAll('[data-t]').forEach(el=>{if(c[el.dataset.t]!==undefined)textLines(el,c[el.dataset.t]);});
  document.querySelectorAll('[data-aria]').forEach(el=>{if(c[el.dataset.aria])el.setAttribute('aria-label',c[el.dataset.aria]);});
  document.querySelector('.ride-label').textContent=c.rideLabel;
  document.querySelector('.visual-edition').textContent='01 / '+c.motionStudy;
  document.title=c.title;document.querySelector('meta[name="description"]').content=c.description;
  document.querySelector('#menu-toggle').setAttribute('aria-label',c[document.querySelector('#mobile-nav').hidden?'openMenu':'closeMenu']);
  renderWork();paintScene(Math.max(scene,0),true);paintMotionControl();if(activeProject)fillProject(activeProject);
  try{localStorage.setItem('aref-language',language);const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);}catch{}
  requestUpdate();
 }
 document.querySelector('#language').addEventListener('change',e=>setLanguage(e.target.value));
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderWork();requestUpdate();}));
 document.querySelector('#dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{activeProject=null;});
 document.querySelector('#motion-control').addEventListener('click',()=>{motionPaused=!motionPaused;paintMotionControl();requestUpdate();});
 reduced.addEventListener('change',event=>{motionPaused=event.matches;paintMotionControl();requestUpdate();});
 const menu=document.querySelector('#mobile-nav'),menuButton=document.querySelector('#menu-toggle');
 function toggleMenu(open){menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',copy[language][open?'closeMenu':'openMenu']);}
 menuButton.addEventListener('click',()=>toggleMenu(menu.hidden));
 menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>toggleMenu(false)));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){toggleMenu(false);menuButton.focus();}});
 const journey=document.querySelector('#journey'),hero=document.querySelector('#home'),manifesto=document.querySelector('#manifesto');
 let frame=0,visualY=window.scrollY,previousY=window.scrollY,speed=0;
 function requestUpdate(){if(!frame)frame=requestAnimationFrame(update);}
 function update(){
  frame=0;const y=window.scrollY,delta=y-previousY;previousY=y;
  const simple=motionPaused||reduced.matches;
  visualY=simple?y:visualY+(y-visualY)*.15;
  if(Math.abs(y-visualY)<.2)visualY=y;
  speed=simple?0:speed+(Math.min(Math.abs(delta)/40,1)-speed)*.16;
  const max=Math.max(document.documentElement.scrollHeight-window.innerHeight,1),p=clamp(visualY/max);
  root.style.setProperty('--progress',p.toFixed(5));root.style.setProperty('--hero-p',clamp(visualY/hero.offsetHeight).toFixed(4));
  root.style.setProperty('--speed',speed.toFixed(3));root.style.setProperty('--bike-lean',((delta>0?1:-1)*speed*8).toFixed(2)+'deg');
  document.querySelector('#progress-value').textContent=String(Math.round(p*100)).padStart(2,'0')+'%';
  const jp=clamp((y-journey.offsetTop)/Math.max(journey.offsetHeight-window.innerHeight,1));
  root.style.setProperty('--journey-p',jp.toFixed(5));root.style.setProperty('--scene-p',((jp*3)%1).toFixed(5));
  paintScene(Math.min(Math.floor(jp*3),2));document.querySelector('#scene-progress').textContent=Math.round(jp*100)+' / 100';
  const mp=clamp((y+window.innerHeight-manifesto.offsetTop)/(window.innerHeight+manifesto.offsetHeight));root.style.setProperty('--manifesto-p',mp.toFixed(4));
  if(Math.abs(y-visualY)>.2||speed>.003)requestUpdate();
 }
 window.addEventListener('scroll',requestUpdate,{passive:true});window.addEventListener('resize',requestUpdate);
 document.querySelector('#year').textContent=String(new Date().getFullYear());
 let initial='en';try{initial=new URL(location.href).searchParams.get('lang')||localStorage.getItem('aref-language')||'en';}catch{}
 setLanguage(initial);body.classList.add('motion-ready');observe(document);requestUpdate();
 window.addEventListener('load',requestUpdate,{once:true});
})();
