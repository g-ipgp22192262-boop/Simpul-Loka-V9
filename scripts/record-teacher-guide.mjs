/* Production UI recording only. No real Google credentials, pupil data or source UI changes.
 * Requires Playwright + Chromium. Rehearsal: GUIDE_REHEARSAL=1 node ...
 */
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {createPbdServer} from './pbd-dev-server.mjs';
import {createAppsScriptSimulator} from '../tests/helpers/apps-script-simulator.mjs';
import {hashPasscode} from '../backend/server/teacher-gateway.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const rehearsal=process.env.GUIDE_REHEARSAL==='1',folder=rehearsal?'work/teacher-guide/rehearsal':'work/teacher-guide/capture';
await mkdir(folder,{recursive:true});
const sim=await createAppsScriptSimulator(),demoCode=randomUUID();
const server=await createPbdServer({port:4190,simulator:sim,env:{PBD_GATEWAY_ENABLED:'true',PBD_PASSCODE_HASH:await hashPasscode(demoCode),PBD_FINGERPRINT_SECRET:randomUUID()}});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream']});
const context=await browser.newContext({viewport:{width:1920,height:948},recordVideo:{dir:folder,size:{width:1920,height:948}},permissions:['microphone']});
const page=await context.newPage(),errors=[],chapters=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(12000);
await page.addInitScript(()=>{document.addEventListener('click',e=>{const ring=document.createElement('span');ring.style.cssText=`position:fixed;left:${e.clientX-19}px;top:${e.clientY-19}px;width:38px;height:38px;border:3px solid #f4d58c;border-radius:50%;background:#3f245833;pointer-events:none;z-index:2147483647`;const host=e.target.closest('dialog')||document.body;host.append(ring);ring.animate([{opacity:1,transform:'scale(.6)'},{opacity:0,transform:'scale(1.6)'}],{duration:650}).finished.finally(()=>ring.remove());},true);});
const video=page.video();let zero=0;
const hold=ms=>page.waitForTimeout(ms);
async function click(selector){const n=page.locator(selector).first();await n.waitFor({state:'visible'});await n.scrollIntoViewIfNeeded();const b=await n.boundingBox();await page.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:12});await n.click();}
async function nav(name){if(!await page.locator('#nav').isVisible())await click('.home-menu-toggle');await click(`#nav button[onclick="navTo('${name}')"]`);await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));}
async function chapter(title,start,end,actions){const began=Date.now();console.log(`Recording ${start}s–${end}s: ${title}`);const at=async(sec,fn)=>{if(!rehearsal)await hold(Math.max(0,sec*1000-(Date.now()-began)));await fn();};await actions(at);if(!rehearsal){if(Date.now()-began>(end-start)*1000+1500)throw Error('Chapter overrun: '+title);await hold(Math.max(0,(end-start)*1000-(Date.now()-began)));}chapters.push({title,start,end,actualStart:(began-zero)/1000,actualEnd:(Date.now()-zero)/1000});}
try{
 await page.goto(server.origin);await page.locator('#parkTitle').waitFor();await page.evaluate(()=>document.fonts.ready);await hold(700);zero=Date.now();
 await chapter('Pengenalan',0,30,async at=>{
  await at(8,async()=>{await page.locator('#nickname').fill('Murid Demo');await page.locator('#kelas').fill('3 Demonstrasi');});
  await at(16,async()=>{await page.locator('#animal').selectOption('kucing');});
  await at(25,async()=>{await click('.park-start');await page.locator('#libraryTitle').waitFor();});
 });
 await chapter('Peta Ilmu',30,60,async at=>{
  await at(1,()=>click('.library-master-button'));
  await at(7,async()=>{await click('.library-close');});
  await at(9,async()=>{await click('[data-library-book="3"]');await page.waitForFunction(()=>document.querySelector('#libraryMotionToolbar')?.hidden===true);});
  await at(18,async()=>{await click('#libraryZoom');});
  await at(22,async()=>{await click('#libraryZoom');await click('.library-close');});
  await at(26,async()=>{await click('[data-library-book="4"]');});
  await at(28,async()=>{await click('.library-close');});
 });
 await chapter('Roda Ferris',60,85,async at=>{
  await at(0,()=>nav('wheel'));
  await at(9,async()=>{await click('#fwCabin3');await page.locator('#l4Enter').waitFor();});
 });
 await chapter('Tiga Misi',85,140,async at=>{
  await at(0,()=>click('#l4Enter'));
  await at(3,()=>click('[data-answer="0"]'));
  await at(6,()=>click('[data-answer="0"]'));
  await at(10,()=>click('#l4NextMission'));
  for(const [i,sec] of [12,15,18,21].entries())await at(sec,async()=>{await click(`[data-card="${i}"]`);await click(`[data-slot="${i}"]>button`);});
  await at(24,async()=>{await page.getByRole('button',{name:'Semak Susunan',exact:true}).click();await page.locator('.photo-language button').first().waitFor();});
  await at(31,()=>click('.photo-language button:nth-of-type(3)'));
  await at(34,()=>click('.photo-language button:nth-of-type(1)'));
  await at(37,()=>click('#l4ToStage'));
  await at(43,async()=>{await click('#l4Record');await page.waitForFunction(()=>document.querySelector('#l4RecordStatus').textContent.includes('Sedang merakam'));});
  await at(46,async()=>{await click('#l4Stop');await page.locator('#l4Listen').waitFor();});
  await at(48,()=>click('#l4Listen'));
  await at(51,async()=>{await page.locator('.l1-privacy-help summary').click();});
  await at(54,async()=>{await page.locator('#l4Oral').check();await click('#l4Finish');await page.waitForFunction(()=>progress[4]?.completed&&PbdEvidence.pending===0);});
 });
 await chapter('Sokongan Inklusif',140,170,async at=>{
  await at(0,()=>nav('wheel'));
  await at(3,()=>click('.access'));
  await at(6,async()=>{await page.locator('#fontSize').selectOption('bigtext');await page.locator('#fontFamily').selectOption('andika');});
  await at(12,async()=>{await page.locator('#contrast').check();});
  await at(18,async()=>{await page.locator('#focus').check();await page.locator('#reduce').check();});
  await at(23,async()=>{await page.locator('#silent').check();});
  await at(27,async()=>{await page.locator('#fontSize').selectOption('normal');await page.locator('#fontFamily').selectOption('normal');await page.locator('#contrast').uncheck();await page.locator('#focus').uncheck();await page.locator('#reduce').uncheck();await page.locator('#silent').uncheck();await click('.access');});
 });
 await chapter('Imbas, Pasport, Sijil',170,205,async at=>{
  await at(0,()=>nav('imbas'));
  await at(3,async()=>{await click('.il-memory-tabs button:nth-child(4)');});
  await at(10,()=>click('.il-sections button:nth-child(2)'));
  await at(17,async()=>{await page.evaluate(async()=>{for(const i of [1,2,3,5,6])progress[i]=await call('saveProgress',session.studentId,session.token,i,1,0,true,true,true);});await page.waitForFunction(()=>PbdEvidence.pending===0);await nav('passport');});
  await at(25,async()=>{await click('#passportCertificate');await page.locator('#l6DownloadCertificate').waitFor();});
 });
 await chapter('Sudut Guru dan PBD',205,255,async at=>{
  await at(0,async()=>{await page.evaluate(()=>navTo('teacher'));await page.locator('#sgTitle').waitFor();});
  await at(3,()=>click('[data-sg-card="info"]'));
  await at(8,async()=>{await click('#sgBack');await click('[data-sg-card="rph"]');});
  await at(13,async()=>{await click('#sgBack');await click('[data-sg-card="rubric"]');});
  await at(20,async()=>{await click('#sgBack');await click('[data-sg-card="records"]');await page.locator('#pbdCode').waitFor();});
  await at(23,async()=>{await page.locator('#pbdCode').fill(demoCode);await click('#pbdLogin');await page.locator('#pbdRows button').first().waitFor();});
  await at(29,async()=>{await click('#pbdRows button');await click('[data-loka="4"]');await page.locator('#pbdAssessmentForm').scrollIntoViewIfNeeded();});
  await at(38,async()=>{await page.locator('#pbdObj2').selectOption('Capai');await page.locator('#pbdObserved').check();for(let i=0;i<5;i++)await page.locator('#pbdAspect'+i).selectOption('4');await page.locator('#pbdOral').selectOption('4');await page.locator('#pbdNote').fill('Contoh demonstrasi sahaja: cerita santun dan simpulan bahasa sesuai.');});
  await at(45,async()=>{await click('#pbdSave');await page.getByText('Penilaian disimpan dalam simulasi setempat sahaja — bukan Google Sheets.',{exact:true}).waitFor();});
 });
 await chapter('Penutup',255,280,async at=>{await at(0,()=>nav('home'));await at(12,async()=>{await page.mouse.move(1840,900,{steps:15});});});
 if(errors.length)throw Error(JSON.stringify(errors));
 await page.screenshot({path:folder+'/ending.png'});
 await context.close();await video.saveAs(folder+'/raw.webm');
 await writeFile(folder+'/capture-report.json',JSON.stringify({rehearsal,chapters,pageErrors:errors,simulation:true,microphone:'browser test device',rawFile:folder+'/raw.webm'},null,2));
 console.log('Recording complete. Raw media saved; not yet a rendered MP4.');
}catch(e){await page.screenshot({path:folder+'/failure.png'}).catch(()=>{});throw e;}finally{await context.close().catch(()=>{});await browser.close();await server.close();}
