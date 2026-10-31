import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createPbdServer} from '../scripts/pbd-dev-server.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const server=await createPbdServer({env:{},port:4193});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream']});
const results={playback:[],mapping:[],recorders:[],errors:[]};
await mkdir('work/audio-integration',{recursive:true});
const c=await browser.newContext({permissions:['microphone'],acceptDownloads:true});
await c.addInitScript(()=>{const Native=window.Audio;window.audioAuditMedia=[];window.Audio=function(...args){const a=new Native(...args);audioAuditMedia.push(a);return a;};window.Audio.prototype=Native.prototype;});
const p=await c.newPage();p.on('pageerror',e=>results.errors.push(e.message));
async function mapped(owner,id){
 await p.locator(`#loka${owner} .l2-audio`).filter({hasText:/^Dengar Arahan$/}).first().click();
 await p.waitForFunction(id=>TeacherAudio.state().id===id&&TeacherAudio.state().time>0.02,id);
 results.mapping.push(id);await writeFile('work/audio-integration/playback.json',JSON.stringify(results,null,2));await p.evaluate(()=>TeacherAudio.stop());
}
async function direct(id){const b=p.locator(`[data-audio-clip="${id}"]`).first();await b.click();await p.waitForFunction(id=>TeacherAudio.state().id===id&&TeacherAudio.state().time>0.02,id);results.mapping.push(id);await writeFile('work/audio-integration/playback.json',JSON.stringify(results,null,2));await p.evaluate(()=>TeacherAudio.stop());}
async function arrange(prefix){for(let i=0;i<4;i++){await p.locator(`[data-card="${i}"]`).click();await p.locator(`[data-slot="${i}"]>button`).click();}await p.getByRole('button',{name:'Semak Susunan',exact:true}).click();}
try{
 await p.goto(server.origin);await p.evaluate(()=>TeacherAudio.ready);
 const manifest=await p.evaluate(async()=>({app:await fetch('assets/audio/guru/manifest.json').then(r=>r.json()),video:await fetch('assets/audio/guru/video-panduan/manifest.json').then(r=>r.json())}));
 assert.equal(manifest.app.available.length,71);assert.equal(manifest.video.available.length,8);assert(manifest.video.videoOnly);assert(!manifest.app.available.some(x=>x.includes('video-panduan')));
 const catalog=await p.evaluate(()=>TeacherAudioCatalog.filter(x=>!x.legacy));
 if(process.argv.includes('--ui-only')){results.playback=JSON.parse(await readFile('work/audio-integration/playback.json','utf8')).playback;assert.equal(results.playback.length,79);assert.deepEqual(results.playback.map(x=>x.path).sort(),[...manifest.app.available,...manifest.video.available].sort());}
 for(const path of process.argv.includes('--ui-only')?[]:[...manifest.app.available,...manifest.video.available]){
  const entry=catalog.find(x=>x.path===path);
  const output=await p.evaluate(async({path,id})=>{
   const bytes=await fetch(path).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.arrayBuffer();});
   const ctx=new AudioContext();const decoded=await ctx.decodeAudioData(bytes);const duration=decoded.duration;await ctx.close();
   let a;if(id){if(!await TeacherAudio.play(id))throw Error('Teacher play rejected '+id);a=audioAuditMedia.at(-1);}else{a=new Audio(path);await a.play();}
   await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('Playback did not complete '+path)),12000);a.addEventListener('ended',()=>{clearTimeout(t);resolve();},{once:true});a.addEventListener('error',()=>{clearTimeout(t);reject(Error('Media decode failed '+path));},{once:true});a.playbackRate=16;});
   if(id)TeacherAudio.stop();return {path,duration,decoded:true,playedToEnd:true,videoOnly:!id};
  },{path,id:entry?.id});
  results.playback.push(output);await writeFile('work/audio-integration/playback.json',JSON.stringify(results,null,2));
 }
 console.log('PASS: all 79 real MP3s fully decoded and played to ended (accelerated); video excluded from app manifest.');
 await direct('gerbang-selamat-datang');
 await p.locator('#nickname').fill('Audio Audit');await p.locator('#kelas').fill('3 Audit');await p.locator('#kelas').press('Enter');await p.locator('#libraryTitle').waitFor();
 await direct('perpustakaan-pengenalan');
 // Real library player: six idiom books and the supplied Kitab Ilmu recording.
 for(let i=0;i<6;i++){
  await p.evaluate(i=>{setPref('reduce',true);MagicLibrary.open(i);},i);await p.locator('.library-audio-button').waitFor();await p.locator('.library-audio-button').click();
  await p.waitForFunction(()=>audioAuditMedia.at(-1)?.currentTime>0.02);results.mapping.push(['dalam-tangan','ambil-hati','anak-emas','air-muka','mandi-peluh','cakap-besar'][i]);await p.evaluate(()=>MagicLibrary.close());
 }
 await p.locator('.library-master-button').click();await p.locator('.library-audio-button').waitFor();await p.locator('.library-audio-button').click();await p.waitForFunction(()=>audioAuditMedia.at(-1)?.currentTime>0.02);assert(await p.evaluate(()=>audioAuditMedia.at(-1).src.endsWith('/assets/audio/guru/perpustakaan/kitab-ilmu.mp3')));results.mapping.push('kitab-ilmu');await p.evaluate(()=>{MagicLibrary.close();navTo('wheel');});await direct('ferris-arahan');
 for(let n=1;n<=6;n++){await p.locator(`[data-loka-link="${n-1}"]`).click();await direct(`loka${n}-pengenalan`);}
 await p.evaluate(()=>{setPref('focus',true);setPref('reduce',true);enterLoka(0);});await mapped('One','loka1-misi1');
 await p.locator('[data-answer="0"]').click();await p.locator('#l1NextMission').click();await mapped('One','loka1-misi2');
 for(let i=0;i<4;i++){await p.evaluate(()=>LokaOne.assist());if(i<3)await p.waitForFunction(n=>document.querySelectorAll('.l1-collected-strip figure').length===n,i+1);else await p.locator('[data-card]').first().waitFor();}
 await mapped('One','loka1-susun');await arrange('l1');await p.getByRole('button',{name:'Teruskan ke Pentas Cerita',exact:false}).click();await mapped('One','loka1-misi3');
 await p.evaluate(()=>enterLoka(1));await mapped('Two','loka2-misi1');await p.locator('[data-answer="0"]').click();await p.locator('#l2NextMission').click();await mapped('Two','loka2-perasaan');await p.locator('[data-gift="1"]').click();await p.getByRole('button',{name:'Saya jelaskan sebab kepada cikgu.',exact:true}).click();await direct('loka2-sokongan');await p.locator('#l2StartWrap').click();
 for(const [id,sel] of [['loka2-kotak','[data-box="2"]'],['loka2-hadiah','#l2Insert'],['loka2-reben','[data-ribbon="1"]'],['loka2-ucapan','[data-greeting="0"]']]){await mapped('Two',id);await p.locator(sel).click();if(id!=='loka2-ucapan')await p.waitForFunction(id=>document.querySelector('#l2Arena')?.dataset.step===String({'loka2-kotak':1,'loka2-hadiah':2,'loka2-reben':3}[id]),id);}
 await p.locator('[data-card]').first().waitFor();await mapped('Two','loka2-susun');await direct('bersama-gambar-diperoleh');await direct('bersama-cuba-lagi');await arrange('l2');await p.locator('#l2ToStage').click();await mapped('Two','loka2-misi3');
 await p.evaluate(()=>enterLoka(2));await p.locator('#l3Enter').click();await mapped('Three','loka3-misi1');await p.locator('[data-answer="0"]').click();await direct('loka3-penjelasan');await p.locator('#l3NextMission').click();await mapped('Three','loka3-panah');
 const {arrange:arrangeThree}=await import('./loka-three-helpers.mjs');for(let i=0;i<4;i++){if(await p.locator('#l3Refill').isVisible())await p.locator('#l3Refill').click();await p.locator('#l3Aim').click();await p.locator('#l3Fire').click();if(i<3)await p.waitForFunction(n=>document.querySelectorAll('.l2-prizes button').length===n,i+1);else await p.locator('[data-card]').first().waitFor();}await mapped('Three','loka3-susun');await arrangeThree(p);await mapped('Three','loka3-misi3');
 await p.evaluate(()=>enterLoka(3));await p.locator('#l4Enter').click();await mapped('Four','loka4-misi1');await p.locator('[data-answer="0"]').click();await p.locator('[data-answer="0"]').click();await p.locator('#l4NextMission').click();await mapped('Four','loka4-susun');await arrange('l4');await p.locator('.photo-language button').first().waitFor();await mapped('Four','loka4-semak-tindakan');await p.evaluate(()=>LokaFour.photoAnswer(2));await mapped('Four','loka4-semak-ayat');await p.evaluate(()=>LokaFour.photoAnswer(0));await p.locator('#l4ToStage').click();await mapped('Four','loka4-misi3');
 await p.evaluate(()=>enterLoka(4));await p.locator('#l5Enter').click();for(let n=1;n<=3;n++){await mapped('Five','loka5-misi1-'+n);await p.locator('[data-answer="0"]').click();}await p.locator('#l5NextMission').click();await mapped('Five','loka5-tenaga');await p.locator('#l5Begin').click();await p.locator('#l5Auto').click();await p.locator('[data-leaf]').first().waitFor();await mapped('Five','loka5-stesen1');
 for(let i=0;i<4;i++){await p.locator(`[data-leaf="${i}"]`).click();if(i<3)await p.waitForFunction(n=>document.querySelectorAll('[data-leaf]:not([hidden])').length===n,3-i);else await p.locator('#l5NextStation').waitFor();}await p.locator('#l5NextStation').click();await p.locator('[data-pot]').first().waitFor();await mapped('Five','loka5-stesen2');
 for(let i=0;i<3;i++){await p.locator(`[data-pot="${i}"]`).click();await p.locator(`[data-pot-slot="${i}"]`).click();if(i<2)await p.waitForFunction(n=>document.querySelectorAll('[data-pot]').length===n,2-i);else await p.locator('#l5NextStation').waitFor();}await p.locator('#l5NextStation').click();await p.locator('[data-station-answer="0"]').waitFor();await mapped('Five','loka5-stesen3');await p.locator('[data-station-answer="0"]').click();await p.locator('#l5NextStation').click();await p.locator('[data-station-answer="0"]').waitFor();await mapped('Five','loka5-stesen4');await p.locator('[data-station-answer="0"]').click();await p.locator('#l5NextStation').click();await p.locator('[data-card]').first().waitFor();await mapped('Five','loka5-susun');await arrange('l5');await p.locator('#l5ToStage').click();await mapped('Five','loka5-misi3');
 await p.evaluate(()=>enterLoka(5));await p.locator('#l6Enter').click();await mapped('Six','loka6-misi1');await p.locator('#l6NextMission').click();await mapped('Six','loka6-kapal');await p.locator('#l6Begin').click();
 for(let n=0;n<4;n++){await p.locator('#l6Auto').click();await p.locator('#l6StationTitle').waitFor();await mapped('Six','loka6-stesen'+(n+1));if(n===1){for(let i=0;i<4;i++){await p.locator('#l6ToyHelp').click();if(i<3)await p.waitForFunction(i=>+getComputedStyle(document.querySelector('#l6Toy')).getPropertyValue('--step')===i,i+1);else await p.locator('#l6NextStation').waitFor();}}else await p.locator('[data-station-answer="0"]').click();await p.locator('#l6NextStation').click();}
 await p.locator('[data-card]').first().waitFor();await mapped('Six','loka6-susun');await arrange('l6');await p.locator('#l6ToStage').click();await mapped('Six','loka6-misi3');
 console.log('PASS: real UI routes select all six Loka mission/item/station recordings, including Studio Foto and optional explanations.');
 // Isolate recorder coordination on each existing stage, without redoing unrelated games.
 for(let n=1;n<=6;n++){
  await p.evaluate(n=>{localStorage.setItem(`simpulloka_v9_loka${n}_${SimpulBackend.mode}_${session.studentId}`,JSON.stringify({meaning:true,ordered:true,photoPrinted:true,photoCheck:2,collected:[0,1,2,3],order:[0,1,2,3]}));enterLoka(n-1);[LokaOne,LokaTwo,LokaThree,LokaFour,LokaFive,LokaSix][n-1].go(2);},n);
  const guide=n===4?'pentas-kawalan-loka4':n<=2?'pentas-kawalan-loka12':'pentas-kawalan-loka356';await direct(guide);
  assert(await p.evaluate(async n=>TeacherAudio.play('loka'+n+'-misi3'),n));await p.locator(`#l${n}Record`).click();await p.waitForFunction(n=>document.querySelector(`#l${n}RecordStatus`).textContent.includes('0:01'),n);
  assert(await p.evaluate(()=>TeacherAudio.isRecording()&&!TeacherAudio.state().playing));assert.equal(await p.evaluate(n=>TeacherAudio.play('loka'+n+'-misi3'),n),false);
  assert(await p.locator('[data-teacher-audio],.l2-audio').evaluateAll(bs=>bs.every(b=>b.disabled)));
  await p.evaluate(()=>setPref('font','bigtext'));assert(await p.locator('[data-teacher-audio],.l2-audio').evaluateAll(bs=>bs.every(b=>b.disabled)));
  await p.locator(`#l${n}Stop`).click();await p.waitForFunction(n=>document.querySelector(`#l${n}Playback`).src.startsWith('blob:'),n);
  await p.locator(`#l${n}Listen`).click();await p.waitForFunction(n=>document.querySelector(`#l${n}Playback`).currentTime>0,n);
  await p.evaluate(n=>TeacherAudio.play('loka'+n+'-misi3'),n);assert(await p.locator(`#l${n}Playback`).evaluate(a=>a.paused));
  await p.locator(`#l${n}Again`).click();await p.waitForFunction(()=>TeacherAudio.isRecording());assert(!await p.evaluate(()=>TeacherAudio.state().playing));await p.waitForFunction(n=>document.querySelector(`#l${n}RecordStatus`).textContent.includes('0:01'),n);await p.locator(`#l${n}Stop`).click();await p.waitForFunction(()=>!TeacherAudio.isRecording());
  await p.evaluate(()=>setPref('silent',true));assert.equal(await p.evaluate(n=>TeacherAudio.play('loka'+n+'-misi3'),n),false);await p.evaluate(()=>{setPref('silent',false);setPref('font','normal');});
  await p.locator(`#l${n}Oral`).check();await p.locator(`#l${n}Finish`).click();await p.waitForFunction(n=>progress[n]?.completed===true,n);
  assert(await p.evaluate(()=>!Object.values(localStorage).some(v=>/blob:|data:audio/.test(v))));results.recorders.push(n);
 }
 await p.evaluate(()=>navTo('passport'));await direct('pasport-panduan');await direct('grand-finale-tahniah');
 await p.evaluate(()=>navTo('imbas'));await direct('imbas-pengenalan');await p.evaluate(()=>ImbasLoka.open('concert'));await direct('konsert-panduan');await p.evaluate(()=>ImbasLoka.open('reflection'));await p.locator('#ilStart').click();
 await p.evaluate(()=>ImbasLoka.instructions());await p.waitForFunction(()=>TeacherAudio.state().id==='imbas-soalan1'&&TeacherAudio.state().time>0.02);results.mapping.push('imbas-soalan1');await direct('imbas-pengalaman');
 await p.locator('#il-remembered-3').check();await p.locator('input[name="ilFeeling"]').first().check();await p.locator('input[name="ilRating"]').last().check();await p.locator('#ilNext').click();await p.evaluate(()=>ImbasLoka.instructions());await p.waitForFunction(()=>TeacherAudio.state().id==='imbas-soalan2'&&TeacherAudio.state().time>0.02);results.mapping.push('imbas-soalan2');await p.locator('#il-understanding-faham').check();await p.locator('#ilNext').click();await p.evaluate(()=>ImbasLoka.instructions());await p.waitForFunction(()=>TeacherAudio.state().id==='imbas-soalan3'&&TeacherAudio.state().time>0.02);results.mapping.push('imbas-soalan3');
 await p.evaluate(()=>toggleAccess());await direct('mod-inklusif-panduan');
 // Cancellation, denied and delayed permission must release the audio lock.
 await p.evaluate(()=>{enterLoka(3);LokaFour.go(2);window.audioOriginalMic=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=()=>new Promise(resolve=>window.audioResolveMic=resolve);});await p.locator('#l4Record').click();assert(await p.evaluate(()=>TeacherAudio.isRecording()));assert.equal(await p.evaluate(()=>TeacherAudio.play('loka4-misi3')),false);
 await p.evaluate(()=>{window.audioStopped=0;navTo('wheel');audioResolveMic({getTracks:()=>[{stop:()=>audioStopped++}]});});await p.waitForFunction(()=>audioStopped===1&&!TeacherAudio.isRecording());
 await p.evaluate(()=>{enterLoka(3);LokaFour.go(2);navigator.mediaDevices.getUserMedia=async()=>{throw new DOMException('Test denial','NotAllowedError');};});await p.locator('#l4Record').click();await p.waitForFunction(()=>!TeacherAudio.isRecording());await p.getByText('Izin mikrofon ditolak. Kamu masih boleh bercerita secara lisan bersama cikgu.',{exact:true}).waitFor();assert(await p.evaluate(()=>TeacherAudio.play('loka4-misi3')));await p.evaluate(()=>navTo('home'));assert(!await p.evaluate(()=>TeacherAudio.state().playing));
 // Missing/failed media stays honest; pending play cannot resurrect after navigation/silence.
 assert.equal(await p.evaluate(()=>TeacherAudio.play('audio-tidak-wujud')),false);assert.equal(await p.evaluate(()=>TeacherAudio.play('babak-01-pengenalan')),false);
 await p.evaluate(()=>{TeacherAudio.play('loka1-misi1');navTo('wheel');});await p.waitForTimeout(150);assert(!await p.evaluate(()=>TeacherAudio.state().playing));
 await p.route('**/loka1-misi1.mp3',r=>r.abort());await p.evaluate(()=>TeacherAudio.play('loka1-misi1'));await p.waitForTimeout(150);assert(!await p.evaluate(()=>TeacherAudio.state().playing));await p.unroute('**/loka1-misi1.mp3');
 const missing=catalog.filter(x=>manifest.app.available.includes(x.path)&&!results.mapping.includes(x.id));assert.deepEqual(missing.map(x=>x.id),[],'Every app clip must have a tested UI route');assert.deepEqual(results.errors,[]);
 console.log('PASS: all 71 supplied app clips have verified UI mappings; 6 record/re-record/replay/oral flows; silent/navigation/pending/denied/error guards; 0 pageerrors.');
}finally{await writeFile('work/audio-integration/playback.json',JSON.stringify(results,null,2));await browser.close();await server.close();}
