import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {createPbdServer} from '../scripts/pbd-dev-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const server=await createPbdServer({env:{},port:4194});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
const result={errors:[],requests:[],normalSpeedEnded:false,pauseReplay:false,silent:false,navigation:false};
try{
 const c=await browser.newContext();
 await c.addInitScript(()=>{const Native=Audio;window.kitabMedia=[];window.Audio=function(...args){const a=new Native(...args);kitabMedia.push(a);return a;};window.Audio.prototype=Native.prototype;});
 const p=await c.newPage();p.on('pageerror',e=>result.errors.push(e.message));p.on('response',r=>{if(r.url().endsWith('/kitab-ilmu.mp3'))result.requests.push({url:r.url(),status:r.status(),type:r.headers()['content-type'],range:r.headers()['content-range']});});
 await p.goto(server.origin);await p.locator('#nickname').fill('Ujian Kitab');await p.locator('#kelas').fill('3 Audit');await p.locator('#kelas').press('Enter');await p.locator('#libraryTitle').waitFor();await p.evaluate(()=>setPref('reduce',true));
 const inventories=await p.evaluate(async()=>({app:await fetch('assets/audio/guru/manifest.json').then(r=>r.json()),library:await fetch('assets/audio/library-audio.json').then(r=>r.json())}));
 assert.equal(inventories.app.available.length,65);assert.equal(inventories.library.available.length,7);assert.equal(inventories.library.sources['kitab-ilmu'],'assets/audio/guru/perpustakaan/kitab-ilmu.mp3');
 await p.locator('.library-master-button').click();await p.locator('.library-audio-button').waitFor();assert.match(await p.locator('.library-audio-button').textContent(),/Dengar suara cikgu/);assert.equal(await p.getByText('Audio cikgu akan ditambah',{exact:true}).count(),0);
 await p.locator('.library-audio-button').click();await p.waitForFunction(()=>kitabMedia.at(-1)?.currentTime>0.05);
 const metadata=await p.evaluate(()=>{const a=kitabMedia.at(-1);window.kitabPlayed=a;window.kitabEnded=false;a.addEventListener('ended',()=>kitabEnded=true,{once:true});return {src:a.src,duration:a.duration,rate:a.playbackRate};});
 assert(metadata.src.endsWith('/assets/audio/guru/perpustakaan/kitab-ilmu.mp3'));assert.equal(metadata.rate,1);assert(metadata.duration>0);await p.waitForFunction(()=>kitabEnded,null,{timeout:45000});await p.getByText('Rakaman tamat. Boleh dengar semula.',{exact:true}).waitFor();result.normalSpeedEnded=true;result.duration=metadata.duration;
 await p.locator('.library-audio-button').click();await p.waitForFunction(()=>kitabMedia.at(-1)?.currentTime>0.05);await p.locator('.library-audio-button').click();assert(await p.evaluate(()=>kitabMedia.at(-1).paused));await p.locator('.library-audio-button').click();await p.waitForFunction(()=>!kitabMedia.at(-1).paused);result.pauseReplay=true;
 await p.evaluate(()=>setPref('silent',true));assert(await p.evaluate(()=>kitabMedia.at(-1).paused));assert(await p.locator('.library-audio-button').isDisabled());const before=await p.evaluate(()=>kitabMedia.length);await p.evaluate(()=>MagicLibrary.playAudio());await p.waitForTimeout(150);assert.equal(await p.evaluate(()=>kitabMedia.length),before);assert(await p.evaluate(()=>kitabMedia.at(-1).paused));await p.evaluate(()=>setPref('silent',false));assert(await p.evaluate(()=>kitabMedia.at(-1).paused));result.silent=true;
 await p.locator('.library-audio-button').click();await p.waitForFunction(()=>kitabMedia.at(-1)?.currentTime>0.05);await p.evaluate(()=>navTo('wheel'));assert(await p.evaluate(()=>kitabMedia.at(-1).paused));await p.waitForTimeout(150);assert(await p.evaluate(()=>kitabMedia.at(-1).paused));result.navigation=true;
 const loaded=result.requests.find(x=>[200,206].includes(x.status)&&x.type==='audio/mpeg');assert(loaded);if(loaded.status===206)assert.match(loaded.range,/^bytes \d+-\d+\/\d+$/);const full=await p.request.get(server.origin+'/assets/audio/guru/perpustakaan/kitab-ilmu.mp3');assert.equal(full.status(),200);assert.equal(full.headers()['content-type'],'audio/mpeg');assert.deepEqual(result.errors,[]);
 console.log('PASS Kitab Ilmu real UI: HTTP 200/206 audio-mpeg; explicit library source; normal-speed playback to ended; pause/replay; silent blocks/stops/no auto-resume; navigation stops; 0 pageerrors.');
}finally{await mkdir('work/audio-integration',{recursive:true});await writeFile('work/audio-integration/kitab-ilmu.json',JSON.stringify(result,null,2));await browser.close();await server.close();}
