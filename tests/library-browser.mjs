const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox']});
const errors=[];const page=await browser.newPage({viewport:{width:1440,height:1100}});page.on('pageerror',e=>errors.push(e.message));
const names=['Dalam Tangan','Ambil Hati','Anak Emas','Air Muka','Mandi Peluh','Cakap Besar'];
async function enter(p=page){await p.goto('http://127.0.0.1:4173');await p.waitForFunction(()=>typeof navTo==='function');await p.evaluate(()=>navTo('map'));await p.locator('#magicLibrary').waitFor();}
async function ready(p=page){await p.waitForFunction(()=>document.querySelector('#libraryDialog')?.dataset.bookPhase==='reading');}
async function closed(p=page){await p.waitForFunction(()=>!document.querySelector('#libraryDialog')?.open);}
try{
 await enter();assert.equal(await page.locator('[data-library-book]').count(),6);assert.equal(await page.locator('.library-portal').isDisabled(),false);
 await page.locator('.library-portal').click();await page.locator('#fwTitle').waitFor();await page.evaluate(()=>navTo('map'));
 // No TTS calls anywhere in this page, including missing-audio and book navigation.
 await page.evaluate(()=>{window.ttsCalls=0;speech=()=>window.ttsCalls++;});
 await page.locator('.library-master-button').click();assert.equal(await page.locator('#libraryBookTitle').textContent(),'Kitab Ilmu Utama');await page.keyboard.press('Escape');await closed();
 assert.equal(await page.locator('#libraryExploredCount').textContent(),'0 daripada 6 diteroka');
 await page.locator('[data-library-book="0"]').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('[data-library-book="1"]').evaluate(e=>e===document.activeElement),true);await page.keyboard.press('Enter');await ready();
 await page.locator('.library-audio-pending').waitFor();assert.equal(await page.locator('.library-audio-button').count(),0);assert.equal(await page.locator('.library-audio-pending').textContent(),'Audio cikgu akan ditambah');
 // Real geometry movement and a physical cover turn; shortcuts never block reading.
 await page.keyboard.press('Escape');await closed();
 await page.locator('[data-library-book="0"]').click();
 await page.waitForFunction(()=>document.querySelector('#libraryDialog').dataset.bookPhase==='floating');
 const startX=await page.locator('.library-flying-book').evaluate(e=>e.getBoundingClientRect().x);
 await page.waitForTimeout(250);
 assert(Math.abs(await page.locator('.library-flying-book').evaluate(e=>e.getBoundingClientRect().x)-startX)>10);
 await page.waitForFunction(()=>document.querySelector('#libraryDialog').dataset.bookPhase==='opening');
 assert(await page.locator('.library-flying-book').evaluate(e=>getComputedStyle(e).transform.includes('matrix3d')));
 await page.locator('#librarySkipMotion').click();await ready();
 await page.locator('.library-close').click();await page.locator('#librarySkipMotion').click();await closed();
 // Six real modal definitions, single illustration, zoom, marks and close/focus restore.
 for(let i=0;i<6;i++){
  await page.evaluate(i=>MagicLibrary.open(i),i);await ready();
  assert.equal(await page.locator('#libraryBookTitle').textContent(),names[i]);
  assert.equal(await page.locator('#libraryArt').count(),1);assert(await page.locator('#libraryArt').getAttribute('aria-label'));
  assert.equal(await page.locator('#libraryBookMeaning').textContent(),await page.evaluate(i=>IDIOMS[i].meaning,i));
  await page.locator('#libraryZoom').click();assert.equal(await page.locator('#libraryZoom').getAttribute('aria-pressed'),'true');
  assert(await page.locator('#libraryArt').evaluate(e=>e.clientWidth>e.parentElement.clientWidth));await page.locator('#libraryZoom').click();
  await page.keyboard.press('Escape');await closed();await page.waitForFunction(i=>document.querySelector(`[data-library-book="${i}"]`)===document.activeElement,i);
 }
 assert.equal(await page.locator('.library-book.is-explored').count(),6);assert.equal(await page.locator('.library-key-panel.is-unlocked').count(),1);assert.match(await page.locator('#libraryKeyMessage').textContent(),/milik kamu/);
 assert.equal(await page.evaluate(()=>window.ttsCalls),0);
 await page.reload();await page.evaluate(()=>navTo('map'));assert.equal(await page.locator('.library-book.is-explored').count(),6);
 await page.locator('[data-library-book="0"]').click();await ready();await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('#libraryBookTitle').textContent(),'Cakap Besar');await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#libraryBookTitle').textContent(),'Dalam Tangan');
 // Native modal traps focus; Tab cannot focus controls behind it.
 for(let i=0;i<8;i++)await page.keyboard.press('Tab');assert(await page.locator('#libraryDialog').evaluate(e=>e.contains(document.activeElement)));
 await page.keyboard.press('Escape');await closed();
 // A student's exploration is isolated from guest records and passport/PBD records.
 await page.evaluate(()=>navTo('home'));await page.locator('#nickname').fill('Aina');await page.locator('#kelas').fill('3 Bestari');await page.locator('#kelas').press('Enter');await page.locator('#magicLibrary').waitFor();
 assert.equal(await page.locator('.library-book.is-explored').count(),0);
 const before=await page.evaluate(()=>localStorage.getItem('simpulloka_v9_records'));
 await page.locator('[data-library-book="0"]').click();await ready();await page.keyboard.press('Escape');await closed();assert.equal(await page.evaluate(()=>localStorage.getItem('simpulloka_v9_records')),before);
 // Real-recording control behavior tested using a mock player; no generated audio file is added.
 await page.route('**/assets/audio/library-audio.json',r=>r.fulfill({json:{available:['dalam-tangan']}}));
 await page.evaluate(()=>{window.audioLog=[];window.Audio=class extends EventTarget{constructor(src){super();this.src=src;this.paused=true;this.currentTime=0;window.lastAudio=this;}play(){this.paused=false;audioLog.push(['play',this.src]);return Promise.resolve();}pause(){this.paused=true;audioLog.push(['pause',this.src]);}};navTo('map');});
 await page.locator('[data-library-book="0"]').click();await ready();await page.locator('.library-audio-button').waitFor();await page.locator('.library-audio-button').click();assert.match(await page.locator('.library-audio-button').textContent(),/Jeda/);await page.locator('.library-audio-button').click();assert.match(await page.locator('#libraryAudioStatus').textContent(),/dijeda/);
 await page.locator('.library-audio-button').click();await page.evaluate(()=>setPref('silent',true));assert(await page.locator('.library-audio-button').isDisabled());assert(await page.evaluate(()=>lastAudio.paused));
 await page.evaluate(()=>setPref('silent',false));await page.locator('.library-audio-button').click();await page.locator('#libraryNext').click();assert(await page.evaluate(()=>lastAudio.paused));await page.keyboard.press('Escape');await closed();
 await page.locator('[data-library-book="0"]').click();await ready();await page.locator('.library-audio-button').click();await page.evaluate(()=>lastAudio.dispatchEvent(new Event('error')));await page.locator('.library-audio-pending').waitFor();assert.equal(await page.locator('.library-audio-button').count(),0);await page.keyboard.press('Escape');await closed();
 // Responsive/touch/very large text + dyslexia font/contrast/focus/reduced/silent.
 const mobile=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));await enter(mobile);
 for(const width of [390,320,768,1024]){await mobile.setViewportSize({width,height:844});assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`page overflow ${width}`);await mobile.locator('[data-library-book="3"]').tap();await ready(mobile);assert(await mobile.locator('#libraryDialog').evaluate(e=>e.getBoundingClientRect().right<=innerWidth));await mobile.locator('.library-close').tap();await closed(mobile);}
 await mobile.setViewportSize({width:390,height:844});await mobile.getByRole('button',{name:'Mod Inklusif',exact:false}).first().tap();await mobile.locator('#fontFamily').selectOption('andika');assert(await mobile.evaluate(async()=>{const fonts=await document.fonts.load('16px "Andika Library"');return fonts.length>0;}));await mobile.locator('#fontSize').selectOption('extrabig');await mobile.locator('#wide').check();await mobile.locator('#focus').check();await mobile.locator('#contrast').check();await mobile.locator('#reduce').check();await mobile.locator('#silent').check();await mobile.getByRole('button',{name:'Mod Inklusif',exact:false}).first().tap();
 assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await mobile.locator('[data-library-book="2"]').tap();await ready(mobile);assert(await mobile.locator('#libraryDialog').evaluate(e=>e.scrollWidth<=e.clientWidth+2));await mobile.locator('#libraryZoom').tap();await mobile.locator('.library-close').tap();await closed(mobile);await mobile.locator('.library-portal').tap();await mobile.locator('#fwTitle').waitFor();
 await mobile.close();assert.deepEqual(errors,[]);console.log('PASS library: six books/master, modal/focus/keyboard/touch/zoom, persistence/student isolation/reward/unlocked gate, no PBD writes, missing/real-recording mocks/pause/silence/error, responsive 320–1440px and inclusive modes; 0 page errors.');
}finally{await browser.close();}
