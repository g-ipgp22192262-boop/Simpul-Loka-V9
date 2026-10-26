import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {createPbdServer} from '../scripts/pbd-dev-server.mjs';
import {meaningFour,arrangeFour} from './loka-four-helpers.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const server=await createPbdServer({env:{},port:4184});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
const errors=[];await mkdir('work/v91',{recursive:true});
try{
 for(const width of [1366,768,390]){
  const c=await browser.newContext({viewport:{width,height:900},hasTouch:width===390});const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto(server.origin);await p.locator('#nickname').fill('Ujian V91');await p.locator('#kelas').fill('3 Demo');await p.locator('#kelas').press('Enter');await p.locator('#libraryTitle').waitFor();
  assert.equal(await p.locator('#nav button').count(),6);assert(!await p.locator('#nav').textContent().then(t=>/Rush|Konsert|Pemulihan|Pengukuhan/.test(t)));
  await p.evaluate(()=>{setPref('focus',true);navTo('imbas');});await p.getByRole('heading',{name:'Imbas Kenangan',exact:true}).waitFor();assert.equal(await p.locator('.il-memory-image').count(),4);
  assert(await p.getByRole('button',{name:'Refleksi Akhir',exact:true}).isDisabled());await p.evaluate(()=>ImbasLoka.open('concert'));assert.equal(await p.locator('a[href="https://suno.com/s/Mk9omkQDxSYSdnUc"]').count(),1);
  await p.evaluate(()=>{setPref('silent',true);ImbasLoka.open('memory');enterLoka(3);});await meaningFour(p);
  assert.equal(await p.locator('[data-card]').count(),4);assert.equal(await p.locator('.photo-booth [data-slot]').count(),4);assert.equal(await p.locator('#l4Arena,#l4Guide,[data-island]').count(),0);
  await p.evaluate(()=>setPref('focus',false));await p.screenshot({path:`work/v91/photobooth-${width}.png`,fullPage:true});await p.evaluate(()=>setPref('focus',true));await p.evaluate(()=>{setPref('font','extrabig');setPref('contrast',true);});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'photobooth inclusive overflow '+width);await p.evaluate(()=>{setPref('font','normal');setPref('contrast',false);});
  // Native HTML drag/drop and click placement share the same four-slot model.
  if(width>=1000)await p.locator('[data-card="0"]').dragTo(p.locator('[data-slot="0"]'));else{await p.locator('[data-card="0"]').click();await p.locator('[data-slot="0"]>button').click();}
  assert.equal(await p.locator('[data-slot="0"] .l4-picture').count(),1);
  await p.evaluate(()=>LokaFour.resetOrder());await arrangeFour(p);
  assert.equal(await p.locator('button[id="l4Record"]').count(),1);assert.equal(await p.locator('.l2-story-strip .l4-picture').count(),4);
  await p.locator('#l4Oral').check();await p.locator('#l4Finish').click();await p.waitForFunction(()=>progress[4]?.completed===true);
  await p.evaluate(()=>{navTo('home');});await p.screenshot({path:`work/v91/home-${width}.png`,fullPage:true});
  for(const page of ['wheel','imbas','passport','teacher']){await p.evaluate(page=>navTo(page),page);await p.waitForTimeout(100);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${page} ${width}`);await p.screenshot({path:`work/v91/${page}-${width}.png`,fullPage:true});}
  // Test six real completion flags through the existing API, not a second reward store.
  await p.evaluate(async()=>{for(const i of [1,2,3,5,6])progress[i]=await call('saveProgress',session.studentId,session.token,i,1,0,true,true,true);navTo('imbas');ImbasLoka.open('reflection');});
  await p.locator('#ilStart').click();await p.locator('#il-remembered-3').check();await p.locator('input[name="ilFeeling"]').first().check();await p.locator('input[name="ilRating"]').last().check();await p.locator('#ilNext').click();await p.locator('#il-understanding-faham').check();await p.locator('#ilNext').click();await p.locator('#il-favourite-3').check();await p.locator('#ilNext').click();await p.locator('#ilFinish').click();await p.locator('#passportCertificate').waitFor();await p.locator('#passportCertificate').click();await p.locator('#l6DownloadCertificate').waitFor();assert.equal(await p.locator('.gf-certificate-art').count(),1);
  for(const i of [4,5]){await p.evaluate(i=>{const k=`simpulloka_v9_loka${i+1}_${SimpulBackend.mode}_${session.studentId}`;localStorage.setItem(k,JSON.stringify({meaning:true}));enterLoka(i);},i);await p.evaluate(i=>i===4?LokaFive.go(1):LokaSix.go(1),i);await p.screenshot({path:`work/v91/loka${i+1}-${width}.png`,fullPage:true});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow L${i+1} ${width}`);}
  await c.close();
 }
 assert.deepEqual(errors,[]);console.log('PASS V9.1: six nav entries; guest/early memories/concert; reflection gating; four-photo drag/click/print/oral/passport; six-completion certificate; responsive 390/768/1366; 0 pageerrors.');
}finally{await browser.close();await server.close();}
