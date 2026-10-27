import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {createPbdServer} from '../scripts/pbd-dev-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const server=await createPbdServer({env:{},port:4191});const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});const errors=[];
try{
 const p=await browser.newPage({viewport:{width:1440,height:1000}});p.on('pageerror',e=>errors.push(e.message));await p.goto(server.origin);await p.evaluate(()=>{navTo('teacher');SudutGuru.open('video');});const video=p.locator('#sgGuideVideo');await p.waitForFunction(()=>document.querySelector('#sgGuideVideo').src.endsWith('/panduan-simpulloka.mp4'));
 assert(await video.evaluate(v=>v.paused&&!v.autoplay&&v.controls));assert.equal(await p.locator('#sgGuideVideo track').count(),1);assert.match(await p.locator('#sgVideoStatus').textContent(),/4 minit 40 saat/);assert(!/Video panduan akan disediakan/.test(await p.locator('#sgVideoStatus').textContent()));
 await video.evaluate(v=>v.play());await p.waitForFunction(()=>document.querySelector('#sgGuideVideo').currentTime>.7);assert(Math.abs(await video.evaluate(v=>v.duration)-280)<.3);assert.equal(await video.evaluate(v=>v.videoWidth),1920);assert.equal(await video.evaluate(v=>v.videoHeight),1080);
 await video.evaluate(v=>v.pause());assert(await video.evaluate(v=>v.paused));await video.evaluate(v=>{v.currentTime=130;});await p.waitForFunction(()=>Math.abs(document.querySelector('#sgGuideVideo').currentTime-130)<.5&&!document.querySelector('#sgGuideVideo').seeking);
 await video.evaluate(v=>{v.textTracks[0].mode='showing';});await p.waitForFunction(()=>document.querySelector('#sgGuideVideo').textTracks[0].cues?.length>20);await video.evaluate(v=>{v.textTracks[0].mode='disabled';v.currentTime=0;});await video.evaluate(v=>v.play());await p.waitForFunction(()=>document.querySelector('#sgGuideVideo').currentTime>.1);await video.evaluate(v=>v.pause());
 await mkdir('work/teacher-guide/player',{recursive:true});await p.screenshot({path:'work/teacher-guide/player/desktop.png',fullPage:true});await p.setViewportSize({width:390,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:'work/teacher-guide/player/mobile.png',fullPage:true});assert.deepEqual(errors,[]);
 console.log('PASS actual local MP4: metadata 1920x1080/280s; no autoplay; play/pause/seek/replay; real VTT cues; desktop/mobile; 0 JS errors.');
}finally{await browser.close();await server.close();}
