const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox']});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4173');
await page.locator('#nickname').fill('Aina');await page.locator('#kelas').fill('3 Bestari');await page.getByRole('button',{name:'Mula Pengembaraan'}).click();
await page.getByRole('heading',{name:'Perpustakaan Ajaib'}).waitFor();
for(const dest of ['map','wheel','passport','reflection','recovery','reinforcement','teacher','home']) await page.evaluate(p=>navTo(p),dest);
await page.evaluate(()=>navTo('rush'));assert.equal(await page.evaluate(()=>page),'home');
await page.getByRole('button',{name:'Mod Inklusif'}).click();
await page.locator('#reduce').check();await page.locator('#fontSize').selectOption('bigtext');
assert(await page.locator('body').evaluate(e=>e.classList.contains('reduce')&&e.classList.contains('bigtext')));
for(let i=2;i<6;i++){
 await page.evaluate(i=>{enterLoka(i);goStage(2)},i);
 for(let j=0;j<4;j++)await page.evaluate(j=>{selectCard(j);putCard(j)},j);
 await page.getByRole('button',{name:'Semak Susunan'}).click();
 await page.evaluate(async()=>{await markSimpul();navTo('story');startTalk();await finishTalk()});
 assert.equal(await page.evaluate(i=>progress[i+1].completed,i),true);
}
// Loka 2 now uses its actual shop; Loka 3–6 retain their approved original flow.
await page.evaluate(()=>enterLoka(1));await page.locator('[data-answer="0"]').click();await page.locator('#l2NextMission').click();await page.locator('[data-gift="0"]').click();await page.getByRole('button',{name:'Saya jelaskan sebab kepada cikgu.',exact:true}).click();await page.locator('#l2StartWrap').click();
for(const [i,sel] of ['[data-box="0"]','#l2Insert','[data-ribbon="0"]','[data-greeting="0"]'].entries()){await page.locator(sel).click();if(i<3)await page.waitForFunction(n=>document.querySelector('#l2Arena')?.dataset.step===String(n),i+1);else await page.locator('[data-card]').first().waitFor();}
for(let i=0;i<4;i++){await page.locator(`[data-card="${i}"]`).click();await page.locator(`[data-slot="${i}"]>button`).click();}await page.getByRole('button',{name:'Semak Susunan',exact:true}).click();await page.locator('#l2ToStage').click();await page.locator('#l2Oral').check();await page.locator('#l2Finish').click();await page.waitForFunction(()=>progress[2]?.completed);
// Loka 1 retains its approved three-mission interaction.
await page.evaluate(()=>enterLoka(0));await page.locator('[data-answer="0"]').click();await page.locator('#l1NextMission').click();
for(let i=0;i<4;i++){if(!await page.locator('#l1Throw').isEnabled())await page.locator('#l1Refill').click();await page.locator('#l1Throw').click();if(i<3)await page.waitForFunction(n=>document.querySelectorAll('.l1-collected-strip figure').length===n,i+1);else await page.locator('[data-card]').first().waitFor();}
for(let i=0;i<4;i++){await page.locator(`[data-card="${i}"]`).click();await page.locator(`[data-slot="${i}"]>button`).click();}
await page.getByRole('button',{name:'Semak Susunan',exact:true}).click();await page.getByRole('button',{name:'Teruskan ke Pentas Cerita'}).click();await page.locator('#l1Oral').check();await page.locator('#l1Finish').click();await page.waitForFunction(()=>progress[1]?.completed);
await page.reload();await page.waitForFunction(()=>Object.keys(progress).length===6);
await page.evaluate(()=>{navTo('reflection');chooseFeeling('gembira')});await page.locator('#learning').fill('Saya belajar enam simpulan bahasa.');await page.getByRole('button',{name:'Simpan Refleksi'}).click();
for(const mode of ['recovery','reinforcement'])await page.evaluate(async mode=>{navTo(mode);for(let i=0;i<6;i++)await answerExercise(mode,i%3)},mode);
await page.evaluate(()=>navTo('rush'));await page.getByRole('button',{name:'Mula Larian'}).click();
await page.keyboard.press('ArrowLeft');assert.equal(await page.evaluate(()=>v9Rush.lane),0);await page.keyboard.press('ArrowUp');assert((await page.evaluate(()=>v9Rush.jump))>0);
await page.waitForFunction(()=>v9Rush.phase==='question',{},{timeout:20000});
for(let i=0;i<6;i++){
 // Shorten only the waiting time between gates; animation and first gate run normally.
 await page.evaluate(()=>{if(v9Rush.phase==='running')v9Rush.progress=100});
 await page.waitForFunction(()=>v9Rush.phase==='question');
 if(i===0){await page.evaluate(()=>v9Answer('A'));assert.equal(await page.evaluate(()=>v9Rush.index),0);}
 // Verify generated audio button is valid JavaScript without triggering OS speech.
 await page.evaluate(()=>{speech=()=>{}});await page.getByRole('button',{name:'Dengar soalan'}).click();
 await page.evaluate(()=>v9Answer(V9_Q[v9Rush.index].key));
}
assert.equal(await page.evaluate(()=>v9Rush.finished),true);await page.getByRole('button',{name:'Masuk Konsert Penutup'}).click();assert(await page.getByRole('heading',{name:'Konsert Jelajah SimpulLoka!'}).count());
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>navTo('home'));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
assert.deepEqual(errors,[]);console.log('PASS browser: home/navigation, inclusive mode, six Loka, persistence, reflection, recovery/reinforcement, Rush controls/gates/audio/retry, concert, mobile. 0 page errors.');await browser.close();
