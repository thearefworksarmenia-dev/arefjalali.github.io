const projects = window.PORTFOLIO_PROJECTS;
const grid = document.querySelector('#projects');
const dialog = document.querySelector('#detail');
function openProject(project){
 document.querySelector('#detail-category').textContent=project.kind;
 document.querySelector('#detail-title').textContent=project.title;
 document.querySelector('#detail-description').textContent=project.description;
 document.querySelector('#detail-role').textContent=project.role;
 document.querySelector('#detail-tools').textContent=project.tools;
 const link=document.querySelector('#detail-link');
 try { const u=new URL(project.url); if(u.protocol!=='https:') throw new Error(); link.href=u.href; link.hidden=false; } catch {link.hidden=true;}
 dialog.showModal();
}
function render(filter='All'){
 grid.replaceChildren();
 projects.filter(p=>filter==='All'||p.category===filter).forEach((p,i)=>{
  const card=document.createElement('article'); card.className='project';
  const art=document.createElement('div'); art.className='art '+p.art; art.setAttribute('aria-hidden','true');
  const num=document.createElement('span');num.className='project-num'; num.textContent=String(i+1).padStart(2,'0');
  const drawing=document.createElement('div');drawing.className='drawing';
  for(let j=0;j<4;j++){const line=document.createElement('i');drawing.append(line);}
  const label=document.createElement('span');label.className='art-label';label.textContent='PROJECT BREAKDOWN'; art.append(num,drawing,label);
  const kind=document.createElement('p');kind.className='eyebrow';kind.textContent=p.kind;
  const h=document.createElement('h3');const b=document.createElement('button');b.className='project-button';b.textContent=p.title+' ↗'; b.addEventListener('click',()=>openProject(p));h.append(b);
  const arrow=document.createElement('span');arrow.className='art-arrow';arrow.textContent='↗';art.append(arrow);
  art.addEventListener('click',()=>openProject(p));
  const desc=document.createElement('p');desc.textContent=p.subtitle;card.append(art,kind,h,desc);grid.append(card);
 });
}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render(b.dataset.filter);}));
document.querySelector('#close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelector('#year').textContent=new Date().getFullYear();render();
const themes=['lime','violet','cyan'];
function setTheme(theme){
 if(!themes.includes(theme))return;
 document.documentElement.dataset.theme=theme;
 document.querySelectorAll('[data-theme]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.theme===theme)));
 try{localStorage.setItem('aref-accent',theme);}catch{}
}
document.querySelectorAll('button[data-theme]').forEach(button=>button.addEventListener('click',()=>setTheme(button.dataset.theme)));
try{setTheme(localStorage.getItem('aref-accent')||'lime');}catch{setTheme('lime');}
const motionButton=document.querySelector('#motion-toggle');
motionButton.addEventListener('click',()=>{
 const paused=document.body.classList.toggle('motion-paused');
 motionButton.setAttribute('aria-pressed',String(paused));
 motionButton.setAttribute('aria-label',paused?'Play decorative animation':'Pause decorative animation');
 motionButton.textContent=paused?'▷':'Ⅱ';
});
