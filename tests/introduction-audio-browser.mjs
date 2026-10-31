import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {createPbdServer} from '../scripts/pbd-dev-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const server=await createPbdServer({env:{},port:4198});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
const report={introductions:[],errors:[],consoleErrors:[],resourceWarnings:[],tts:[],missingAssetFallback:false};
const owners=['One','Two','Three','Four','Five','Six'];
try{
 const context=await browser.newContext();
 await context.addInitScript(()=>{
  window.introMedia=[];window.introTts=[];
  const Native=Audio;window.Audio=function(...args){const media=new Native(...args);introMedia.push(media);return media;};window.Audio.prototype=Native.prototype;
  speechSynthesis.speak=u=>introTts.push(u.text);
 });
 const p=await context.newPage();p.on('pageerror',e=>report.errors.push(e.message));p.on('console',e=>{if(e.type()!=='error')return;const url=e.location().url||'';const knownResource=e.text().startsWith('Failed to load resource:')&&(url.startsWith('https://fonts.googleapis.com/')||url===server.origin+'/favicon.ico');if(knownResource)report.resourceWarnings.push({url,message:e.text()});else report.consoleErrors.push({url,message:e.text()});});
 async function playing(id){await p.waitForFunction(id=>TeacherAudio.state().id===id&&TeacherAudio.state().time>.03,id);assert(await p.evaluate(id=>introMedia.at(-1).src.endsWith('/'+id+'.mp3'),id));assert.equal(await p.evaluate(()=>introMedia.filter(a=>!a.paused&&!a.ended).length),1);}
 async function enter(n){await p.locator(`[data-loka-link="${n-1}"]`).click();await p.locator(`[data-loka-intro="${n}"] button`).waitFor();}
 await p.goto(server.origin);await p.locator('#nickname').fill('Ujian Audio Pengenalan');await p.locator('#kelas').fill('3 Ujian');await p.locator('#kelas').press('Enter');await p.locator('#libraryTitle').waitFor();await p.evaluate(()=>navTo('wheel'));
 for(let n=1;n<=6;n++){
  const id=`loka${n}-pengenalan`,normal=n===5?'loka5-misi1-1':`loka${n}-misi1`;
  await enter(n);const button=p.locator(`[data-loka-intro="${n}"] button`);assert.equal(await button.getAttribute('data-audio-clip'),id);
  await button.click();await playing(id);
  await p.evaluate(()=>{window.introCurrent=introMedia.at(-1);window.introEnded=false;introCurrent.addEventListener('ended',()=>introEnded=true,{once:true});});
  assert.equal(await p.evaluate(()=>introCurrent.playbackRate),1);
  // Do not accelerate or seek: the actual UI clip must reach its natural end.
  await p.waitForFunction(()=>introEnded,null,{timeout:45000});assert(await p.evaluate(()=>introCurrent.ended));assert.equal(await p.evaluate(()=>TeacherAudio.state().playing),false);
  const duration=await p.evaluate(()=>introCurrent.duration);console.log(`PASS Loka ${n}: introduction played to natural end at 1× (${duration.toFixed(2)}s)`);
  // Switching pages stops a new playback immediately.
  await button.click();await playing(id);await p.evaluate(()=>{window.introLeaving=introMedia.at(-1);navTo('wheel');});assert(await p.evaluate(()=>introLeaving.paused));assert.equal(await p.evaluate(()=>TeacherAudio.state().playing),false);
  // Silence stops playback, disables the actual button, and does not auto-resume.
  await enter(n);await button.click();await playing(id);await p.evaluate(()=>{window.introSilent=introMedia.at(-1);setPref('silent',true);});assert(await p.evaluate(()=>introSilent.paused));assert(await button.isDisabled());assert.equal(await p.evaluate(id=>TeacherAudio.play(id),id),false);
  await p.evaluate(()=>setPref('silent',false));assert(await button.isEnabled());assert.equal(await p.evaluate(()=>TeacherAudio.state().playing),false);
  // Existing Teroka Makna instruction retains its original exact ID/path.
  await button.click();await playing(id);await p.evaluate(()=>window.introBeforeMission=introMedia.at(-1));
  if(n>=3)await p.locator(`#l${n}Enter`).click();
  const instruction=p.locator(`#loka${owners[n-1]} .l2-audio`).filter({hasText:/^Dengar Arahan$/}).first();await instruction.click();await playing(normal);assert(await p.evaluate(()=>introBeforeMission.paused));
  await p.evaluate(()=>navTo('wheel'));assert.equal(await p.evaluate(()=>introMedia.filter(a=>!a.paused&&!a.ended).length),0);
  report.introductions.push({loka:n,id,path:`assets/audio/guru/${id}.mp3`,duration,endedAtNormalSpeed:true,navigationStop:true,silent:true,noOverlap:true,normalInstruction:normal});
 }
 // Simulate missing inventory to retain the honest unavailable state; never substitute an old clip/TTS.
 report.tts.push(...await p.evaluate(()=>introTts));assert.deepEqual(report.tts,[]);
 await p.route('**/assets/audio/guru/manifest.json',async route=>{const response=await route.fetch();const manifest=await response.json();manifest.available=manifest.available.filter(path=>!/-pengenalan\.mp3$/.test(path));await route.fulfill({json:manifest});});
 await p.reload();await p.waitForFunction(()=>session&&document.querySelector('#app')?.childElementCount);await p.evaluate(()=>navTo('wheel'));await enter(1);await p.evaluate(()=>TeacherAudio.ready);const before=await p.evaluate(()=>introMedia.length);await p.locator('[data-loka-intro="1"] button').click();assert.match(await p.locator('#toast').textContent(),/Audio pengenalan belum tersedia/);assert.equal(await p.evaluate(()=>introMedia.length),before);report.missingAssetFallback=true;
 report.tts.push(...await p.evaluate(()=>introTts));assert.deepEqual(report.tts,[]);assert.deepEqual(report.errors,[]);assert.deepEqual(report.consoleErrors,[]);
 console.log('PASS 6 UI introduction mappings, natural-end playback, navigation stop, silence, unchanged regular instructions, no overlap/TTS/page or application console errors; missing-inventory fallback remains honest. Optional Google Fonts/favicon resource warnings are recorded separately.');
}finally{await mkdir('work/intro-audio',{recursive:true});await writeFile('work/intro-audio/browser-results.json',JSON.stringify(report,null,2));await browser.close();await server.close();}
