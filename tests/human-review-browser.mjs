import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createPbdServer} from '../scripts/pbd-dev-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const server=await createPbdServer({env:{},port:4197});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
const result={guides:[],downloads:[],errors:[],introductionRequests:[]};
try{
 const page=await browser.newPage({viewport:{width:1366,height:900}});
 page.on('pageerror',e=>result.errors.push(e.message));
 page.on('request',r=>{if(/loka[1-6]-pengenalan\.mp3/.test(r.url()))result.introductionRequests.push(r.url());});
 await page.addInitScript(()=>{window.ttsCalls=[];speechSynthesis.speak=u=>ttsCalls.push(u.text);});
 await page.goto(server.origin);await page.locator('#nickname').fill('Semakan Cerita');await page.locator('#kelas').fill('3 Ujian');await page.locator('#kelas').press('Enter');await page.locator('#libraryTitle').waitFor();
 const contexts=['Amir','kucing','Vanessa','Sofia','Danish','Hakim'];
 for(let n=1;n<=6;n++){
  await page.evaluate(n=>{setPref('reduce',true);localStorage.setItem(`simpulloka_v9_loka${n}_${SimpulBackend.mode}_${session.studentId}`,JSON.stringify({meaning:true,ordered:true,photoPrinted:true,photoCheck:2,collected:[0,1,2,3],order:[0,1,2,3],gift:1,reason:true,packStep:4}));enterLoka(n-1);},n);
  await page.locator(`[data-loka-intro="${n}"] button`).click();await page.waitForFunction(n=>TeacherAudio.state().id===`loka${n}-pengenalan`&&TeacherAudio.state().time>.02,n);
  await page.evaluate(n=>[LokaOne,LokaTwo,LokaThree,LokaFour,LokaFive,LokaSix][n-1].go(2),n);
  const guide=page.locator('details').filter({has:page.locator('summary',{hasText:'Soalan panduan cerita'})});
  assert.equal(await guide.count(),1);assert.equal(await guide.locator('li').count(),4);assert.match(await guide.textContent(),new RegExp(contexts[n-1]));assert(await guide.locator('li').first().isVisible());
  assert(await page.locator(`#l${n}Record`).isVisible());assert(await page.locator(`#l${n}Oral`).isVisible());
  await page.evaluate(()=>{TeacherAudio.say('Tidak boleh menggunakan TTS');});
  result.guides.push(n);
 }
 assert.equal(new Set(result.introductionRequests).size,6);assert.deepEqual(await page.evaluate(()=>ttsCalls),[]);
 await page.evaluate(()=>{navTo('teacher');SudutGuru.open('downloads');});
 assert.equal(await page.locator('.sg-download-grid section').count(),8);
 for(let i=0;i<8;i++){
  const card=page.locator('.sg-download-grid section').nth(i),title=await card.locator('h3').textContent(),href=await card.locator('a').getAttribute('href');
  const response=await page.request.get(server.origin+'/'+href);assert.equal(response.status(),200);const html=await response.text();assert.match(html,/window.print\(\)/);
  await card.getByRole('button',{name:'Pratonton'}).click();assert.equal(await page.locator('#sgBack').textContent(),'← Bahan Muat Turun');assert.equal(await page.locator('#sgDetailTitle').textContent(),title);
  if(i>=6){for(const word of ['Dalam Tangan','Ambil Hati','Anak Emas','Air Muka','Mandi Peluh','Cakap Besar'])assert(html.toLowerCase().includes(word.toLowerCase()));
   const offline=await browser.newContext({offline:true});const print=await offline.newPage();await print.setContent(html);await print.emulateMedia({media:'print'});const pdf=await print.pdf({format:'A4'});assert(pdf.length>10000);await offline.close();
  }
  await page.locator('#sgBack').click();assert.equal(await page.locator('.sg-download-grid section').count(),8);result.downloads.push(title);
 }
 await page.evaluate(()=>SudutGuru.open('video'));await page.waitForFunction(()=>document.querySelector('#sgGuideVideo')?.src.endsWith('.mp4'));assert.equal(await page.locator('#sgGuideVideo track').count(),1);assert(!/Lapan narasi|diselaraskan mengikut babak/.test(await page.locator('#sgVideoDescription').textContent()));
 await page.evaluate(()=>{navTo('imbas');ImbasLoka.open('concert');});assert.equal(await page.locator('a[href="https://suno.com/s/Mk9omkQDxSYSdnUc"]').count(),1);assert(await page.getByRole('heading',{name:'Video Muzik SimpulLoka',exact:true}).isVisible());assert.equal(await page.locator('.il-mv video').count(),0);
 for(const width of [320,390,768,1366]){await page.setViewportSize({width,height:900});await page.evaluate(()=>{navTo('teacher');SudutGuru.open('downloads');SudutGuru.open('recovery');setPref('font','extrabig');});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'worksheet overflow '+width);}
 assert.deepEqual(result.errors,[]);console.log('PASS human review: 6 context-specific story guides; 6 dedicated introduction audio requests and no TTS; 8 material previews/back links; 2 offline printable PDF worksheets; video CC retained; Suno unchanged and honest MV slot; inclusive widths 320–1366px.');
}finally{await mkdir('work/human-review',{recursive:true});await writeFile('work/human-review/results.json',JSON.stringify(result,null,2));await browser.close();await server.close();}
