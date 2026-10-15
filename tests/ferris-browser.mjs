const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox']});
const errors=[];
const page=await browser.newPage({viewport:{width:1440,height:1100}});page.on('pageerror',e=>errors.push(e.message));
const waitLoka=async(i,p=page)=>p.waitForFunction(i=>page==='loka'&&loka===i,i,{timeout:6500});
async function wheel(i='panda',mode='normal'){
 await page.evaluate(({i,mode})=>{
  pref.focus=mode==='focus';pref.reduce=mode==='reduce';pref.silent=false;pref.font='normal';pref.wide=false;
  if(session)session.avatar=i;navTo('wheel');
 },{i,mode});
 await page.locator('#fwCabin0').waitFor();
}
try{
 await page.goto('http://127.0.0.1:4173');await page.locator('#nickname').waitFor();
 await wheel();await page.locator('#fwCabin0').click();await page.locator('#nickname').waitFor();
 assert.equal(await page.evaluate(()=>page),'home');
 await page.locator('#nickname').fill('Mira');await page.locator('#kelas').fill('3 Bestari');await page.locator('#kelas').press('Enter');await page.waitForFunction(()=>page==='map');
 const records=await page.evaluate(()=>localStorage.getItem('simpulloka_v9_records'));
 // All six real normal animations, using all four selected ticket animals.
 for(let i=0;i<6;i++){
  await wheel(['panda','harimau','kucing','ulat'][i%4]);
  await page.evaluate(()=>{window.ferrisPhases=[];new MutationObserver(()=>{window.ferrisPhases.push(document.getElementById('ferrisExperience')?.dataset.phase);}).observe(document.getElementById('ferrisExperience'),{attributes:true,attributeFilter:['data-phase']});});
  const started=Date.now();await page.locator('#fwCabin'+i).click();
  await page.waitForFunction(()=>document.getElementById('ferrisExperience')?.dataset.phase==='walk');
  assert.equal(await page.locator('.fw-cabin:not(.is-selected) .fw-cabin-label').evaluateAll(es=>es.every(e=>getComputedStyle(e).visibility==='hidden')),true);
  assert.equal(await page.locator('[data-destination]').count(),6);
  const boarding=await page.locator('#fwCabin'+i).evaluate(e=>({x:parseFloat(e.style.left)*10,y:parseFloat(e.style.top)*8.4}));
  assert(Math.abs(boarding.x-500)<.001);assert(Math.abs(boarding.y-554)<.001);
  await page.waitForFunction(()=>document.getElementById('ferrisExperience')?.dataset.phase==='ride');
  assert(await page.locator('#fwAvatar').evaluate(e=>e.hidden));
  assert(await page.locator(`#fwCabin${i} .fw-passenger`).evaluate(e=>!e.hidden));
  assert((await page.locator(`#fwCabin${i} .fw-passenger`).getAttribute('src')).endsWith('avatar-'+['panda','harimau','kucing','ulat'][i%4]+'.svg'));
  await waitLoka(i);const elapsed=Date.now()-started;assert(elapsed>=3900&&elapsed<6000,elapsed);
  const phases=await page.evaluate(()=>ferrisPhases.filter(Boolean));
  assert.deepEqual(phases,['align','walk','open','board','sit','close','ride','zoom','reveal']);
  console.log('PASS normal gondola',i+1,elapsed+'ms');
 }
 assert.equal(await page.evaluate(()=>localStorage.getItem('simpulloka_v9_records')),records,'boarding must not change progress/PBD');
 // Repeat taps are ignored. Keyboard skip always opens the initial choice once.
 await wheel();await page.locator('#fwCabin4').click();await page.evaluate(()=>Ferris.choose(1));await page.locator('#fwSkip').press('Enter');await waitLoka(4);
 // Keyboard arrow navigation and Enter select an actual cabin.
 await wheel();await page.locator('#fwCabin0').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>document.activeElement.id),'fwCabin1');await page.keyboard.press('Enter');await page.keyboard.press('Escape');await waitLoka(1);
 // No-motion and focus show a seated passenger directly, then open the selected Loka.
 for(const mode of ['focus','reduce']){await wheel('ulat',mode);await page.locator('[data-destination="5"]').click();await waitLoka(5);}
 await page.emulateMedia({reducedMotion:'reduce'});await wheel('kucing');await page.locator('#fwCabin2').click();await waitLoka(2);await page.emulateMedia({reducedMotion:'no-preference'});
 // Switching preference during movement immediately completes access safely.
 await wheel();await page.locator('#fwCabin3').click();await page.evaluate(()=>setPref('reduce',true));await waitLoka(3);
 // Silence disables TTS, persists, and syncs both settings controls.
 await wheel();await page.locator('#fwSilent').check();assert.equal(await page.locator('#silent').isChecked(),true);
 assert(await page.evaluate(()=>JSON.parse(localStorage.getItem('simpulloka_pref')).silent));
 assert.equal(await page.evaluate(()=>{let count=0;const old=speechSynthesis.speak;speechSynthesis.speak=()=>count++;speech('Ujian');speechSynthesis.speak=old;return count;}),0);
 // Leaving during motion cancels every pending animation/navigation callback.
 await wheel();await page.locator('#fwCabin5').click();await page.evaluate(()=>navTo('passport'));await page.waitForTimeout(5100);assert.equal(await page.evaluate(()=>page),'passport');
 // Watchdog navigates even with no animation frames delivered.
 await wheel();await page.evaluate(()=>{window.originalRAF=requestAnimationFrame;window.requestAnimationFrame=()=>999999;Ferris.choose(0);});await waitLoka(0);await page.evaluate(()=>window.requestAnimationFrame=window.originalRAF);
 // Completed cabins remain selectable; no extra mark is written by boarding.
 await page.evaluate(async()=>{progress[1]=await call('saveProgress',session.studentId,session.token,1,1,0,true,true,true);});await wheel();assert(await page.locator('#fwCabin0').evaluate(e=>e.classList.contains('is-complete')));assert.match(await page.locator('#fwCabin0').getAttribute('aria-label'),/Cop pasport diperoleh/);await page.locator('#fwCabin0').click();await page.locator('#fwSkip').click();await waitLoka(0);assert(await page.evaluate(()=>correct&&simpul&&storyDone));
 // Broken illustration assets do not block the native controls/navigation.
 await page.route('**/ferris-prototype/*.svg',r=>r.abort());await wheel();await page.locator('[data-destination="2"]').click();await page.locator('#fwSkip').click();await waitLoka(2);await page.unroute('**/ferris-prototype/*.svg');
 // Mobile touch, large text, menu and empty progress; native hit targets >=44px.
 const mobile=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto('http://127.0.0.1:4173');await mobile.locator('#nickname').fill('Ali');await mobile.locator('#kelas').fill('3 Aman');await mobile.getByRole('button',{name:'Mula Pengembaraan'}).tap();await mobile.waitForFunction(()=>page==='map');await mobile.evaluate(()=>navTo('wheel'));
 for(const width of [390,320,768]){
  await mobile.setViewportSize({width,height:844});assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const box=await mobile.locator('#fwCabin0').boundingBox();assert(box.width>=44&&box.height>=44);
 }
 await mobile.setViewportSize({width:390,height:844});await mobile.getByRole('button',{name:'Teroka taman'}).tap();assert(await mobile.locator('#nav').isVisible());await mobile.getByRole('button',{name:'Teroka taman'}).tap();
 await mobile.getByRole('button',{name:'Mod Inklusif',exact:false}).first().tap();await mobile.locator('#fontSize').selectOption('extrabig');await mobile.locator('#wide').check();assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await mobile.getByRole('button',{name:'Mod Inklusif',exact:false}).first().tap();await mobile.locator('#fwCabin3').tap();await mobile.locator('#fwSkip').tap();await waitLoka(3,mobile);
 await mobile.close();assert.deepEqual(errors,[]);console.log('PASS Ferris: six full animations/four animals, geometry, keyboard/touch, skip/cancel/watchdog, quiet/focus/reduced/OS motion, completed replay, missing assets, responsive/large text; zero page errors.');
}finally{await browser.close();}
