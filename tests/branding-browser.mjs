import assert from 'node:assert/strict';import {mkdir,writeFile} from 'node:fs/promises';import {createPbdServer} from '../scripts/pbd-dev-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');const server=await createPbdServer({env:{},port:4202});const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
const report={screens:[],downloads:[],errors:[]};
const version=/\bv9(?:\.\d+)?\b|\b(?:version|revision|build)\s*\d/i;
try{
 const p=await browser.newPage({viewport:{width:1366,height:1000}});p.on('pageerror',e=>report.errors.push(e.message));await p.goto(server.origin);await p.locator('#nickname').waitFor();assert.equal(await p.title(),'SimpulLoka');
 async function check(label){const visible=await p.locator('body').innerText();assert(!version.test(visible),label+' contains a software version: '+visible.match(version));assert.match(await p.locator('.footer').innerText(),/^SimpulLoka •/);report.screens.push(label);}
 await check('Guest Home');await p.locator('#nickname').fill('Semakan Penjenamaan');await p.locator('#kelas').fill('3 Ujian');await p.locator('#kelas').press('Enter');await p.locator('#libraryTitle').waitFor();await check('Library');
 await p.evaluate(async()=>{setPref('reduce',true);for(let n=1;n<=6;n++)progress[n]=await call('saveProgress',session.studentId,session.token,n,1,0,true,true,true);});
 for(const name of ['home','wheel','passport','imbas','concert','certificate','reflection','recovery','reinforcement','teacher','rush']){await p.evaluate(name=>navTo(name),name);await check(name);}
 for(let n=1;n<=6;n++){await p.evaluate(n=>{enterLoka(n-1);[LokaOne,LokaTwo,LokaThree,LokaFour,LokaFive,LokaSix][n-1].go(2);},n);await p.locator(`#l${n}Oral`).waitFor();await check('Loka '+n+' Pentas Cerita');await p.evaluate(n=>[LokaOne,LokaTwo,LokaThree,LokaFour,LokaFive,LokaSix][n-1].go(0),n);await check('Loka '+n+' Teroka Makna');}
 await p.evaluate(()=>navTo('teacher'));
 for(const view of ['info','rph','differentiation','rubric','records','access','downloads','video','support','audio']){await p.evaluate(view=>SudutGuru.open(view),view);if(view==='records'||view==='access')await p.locator('#pbdCode').waitFor();if(view==='support'||view==='audio')await p.locator('#sudutGuru details').evaluateAll(ns=>ns.forEach(n=>n.open=true));await check('Sudut Guru '+view);}
 await p.evaluate(()=>SudutGuru.open('downloads'));const links=await p.locator('.sg-download-grid a').evaluateAll(ns=>ns.map(n=>n.href));assert.equal(links.length,8);
 for(const link of links){const response=await p.request.get(link);assert(response.ok());const html=await response.text();const content=await browser.newPage();await content.setContent(html);assert(!version.test(await content.locator('body').innerText()));assert.match(await content.locator('header>p').first().innerText(),/^SIMPULLOKA · BAHASA MELAYU TAHUN 3$/);report.downloads.push(link.split('/').at(-1));await content.close();}
 const captions=await p.request.get(server.origin+'/assets/video/guru/panduan-simpulloka.ms.vtt');assert(!version.test(await captions.text()));
 assert.deepEqual(report.errors,[]);console.log('PASS branding: '+report.screens.length+' rendered screens, 8 printable resources, title/footer and guide captions; no live software-version branding or page errors.');
}finally{await mkdir('work/branding',{recursive:true});await writeFile('work/branding/browser-results.json',JSON.stringify(report,null,2));await browser.close();await server.close();}
