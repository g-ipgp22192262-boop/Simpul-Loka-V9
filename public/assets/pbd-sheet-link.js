/* Teacher-only Google Sheets shortcut. */
(()=>{
 let checking=false,pending=false;
 async function addLink(){
  const panel=document.querySelector('#pbdPanel'),banner=panel?.querySelector('.sg-demo-banner');
  if(!banner||banner.querySelector('[data-pbd-sheet]'))return;
  if(checking){pending=true;return;}
  checking=true;
  try{
   const response=await fetch('/.netlify/functions/teacher-records',{credentials:'same-origin',cache:'no-store'});
   if(!response.ok)return;
   const data=await response.json();
   if(!data.authenticated||data.source!=='google-sheets'||typeof data.sheetUrl!=='string')return;
   const url=new URL(data.sheetUrl);
   if(url.protocol!=='https:'||url.hostname!=='docs.google.com'||!url.pathname.startsWith('/spreadsheets/d/'))return;
   const link=document.createElement('a');
   link.className='sg-button';
   link.setAttribute('data-pbd-sheet','');
   link.setAttribute('target','_blank');
   link.setAttribute('rel','noopener noreferrer');
   link.setAttribute('href',url.href);
   link.textContent='📊 Buka Google Sheets';
   const logout=banner.querySelector('[data-pbd="logout"]');
   logout?banner.insertBefore(link,logout):banner.append(link);
  }catch{}finally{
   checking=false;
   if(pending){pending=false;queueMicrotask(addLink);}
  }
 }
 const observer=new MutationObserver(()=>{void addLink();});
 function start(){observer.observe(document.body,{childList:true,subtree:true});void addLink();}
 document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start,{once:true}):start();
})();
