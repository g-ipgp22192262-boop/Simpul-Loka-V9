'use strict';
/* Browser-native concert. Cue sheet aligned to the supplied song using local known-lyric acoustic alignment.
 * See docs/music/lyric-timing-validation.json for the recording hash and per-line evidence.
 * Singing onsets remain machine estimates; this is line-level, not word-karaoke timing.
 * Edit this single cue sheet; playback position (never chained timers) drives every visual.
 */
const SimpulLyricVideo=(()=>{
 const lines=Object.freeze([
  {start:0,end:3.96,text:'Hai, kawan-kawan!',section:'intro'},
  {start:3.96,end:6.94,text:'Selamat datang ke SimpulLoka!',section:'intro'},
  {start:6.94,end:11.52,text:'Enam permainan, enam simpulan bahasa!',section:'intro'},
  {start:11.52,end:15.12,text:'Ayuh, nyanyi bersama!',section:'intro'},
  {start:15.12,end:19.66,text:'Mari masuk taman ceria,',section:'verse1'},
  {start:19.66,end:23.62,text:'SimpulLoka penuh warna,',section:'verse1'},
  {start:23.62,end:27.36,text:'Belajar bahasa sambil bermain,',section:'verse1'},
  {start:27.36,end:30.6,text:'Maksud tersirat kita fahamkan!',section:'verse1'},
  {start:30.6,end:33.58,text:'Dalam tangan, pasti berjaya,',section:'verse1',idiom:0},
  {start:33.58,end:37.64,text:'Sesuatu sudah kita kuasai,',section:'verse1',idiom:0},
  {start:37.64,end:41.26,text:'Ambil hati, buat orang suka,',section:'verse1',idiom:1},
  {start:41.26,end:45.9,text:'Dengan kebaikan dan kata mesra!',section:'verse1',idiom:1},
  {start:45.9,end:48.42,text:'Simpul! Simpul! SimpulLoka!',section:'chorus'},
  {start:48.42,end:52.44,text:'Belajar bahasa, hati gembira!',section:'chorus'},
  {start:52.44,end:55.8,text:'Enam cop, enam gula kapas,',section:'chorus'},
  {start:55.8,end:60.18,text:'Ilmu bermakna takkan terlepas!',section:'chorus'},
  {start:60.18,end:62.92,text:'Simpul! Simpul! SimpulLoka!',section:'chorus'},
  {start:62.92,end:66.46,text:'Ayuh sebut bersama-sama!',section:'chorus'},
  {start:66.46,end:70.06,text:'Dengar, faham, cuba dan cerita,',section:'chorus'},
  {start:70.06,end:74.26,text:'Simpulan bahasa hebat semuanya!',section:'chorus'},
  {start:74.26,end:78.16,text:'Anak emas, paling disayang,',section:'verse2',idiom:2},
  {start:78.16,end:82.16,text:'Diberi perhatian, penuh kasih sayang,',section:'verse2',idiom:2},
  {start:82.16,end:85.36,text:'Air muka, wajah seseorang,',section:'verse2',idiom:3},
  {start:85.36,end:89.12,text:'Menunjukkan perasaan yang datang!',section:'verse2',idiom:3},
  {start:89.12,end:92.62,text:'Mandi peluh, berpeluh banyak,',section:'verse2',idiom:4},
  {start:92.62,end:96.2,text:'Bekerja kuat, tak mudah penat,',section:'verse2',idiom:4},
  {start:96.2,end:99.8,text:'Cakap besar, suka membangga,',section:'verse2',idiom:5},
  {start:99.8,end:104.16,text:'Jangan berlagak, rendahkan suara!',section:'verse2',idiom:5},
  {start:104.16,end:107.96,text:'Dalam tangan? — Sudah dikuasai!',section:'bridge',idiom:0},
  {start:107.96,end:111.56,text:'Ambil hati? — Buat orang sukai!',section:'bridge',idiom:1},
  {start:111.56,end:115.06,text:'Anak emas? — Yang paling disayang!',section:'bridge',idiom:2},
  {start:115.06,end:118.58,text:'Air muka? — Raut wajah seseorang!',section:'bridge',idiom:3},
  {start:118.58,end:122.22,text:'Mandi peluh? — Berpeluh banyak!',section:'bridge',idiom:4},
  {start:122.22,end:126.56,text:'Cakap besar? — Suka bercakap megah!',section:'bridge',idiom:5},
  {start:126.56,end:128.8,text:'Simpul! Simpul! SimpulLoka!',section:'final'},
  {start:128.8,end:132.72,text:'Belajar bahasa, hati gembira!',section:'final'},
  {start:132.72,end:135.88,text:'Enam cop, enam gula kapas,',section:'final'},
  {start:135.88,end:140.64,text:'Misi selesai, kita pun puas!',section:'final'},
  {start:140.64,end:142.86,text:'Simpul! Simpul! SimpulLoka!',section:'final'},
  {start:142.86,end:146.38,text:'Ilmu baharu dibawa pulang!',section:'final'},
  {start:146.38,end:151.48,text:'Terima kasih, jumpa lagi,',section:'final'},
  {start:151.48,end:156.6,text:'SimpulLoka dalam hati!',section:'final'},
  {start:156.6,end:160.22,text:'Tahniah, Penjelajah SimpulLoka!',section:'outro'},
  {start:160.22,end:162.4,text:'Kamu memang hebat!',section:'outro'},
  {start:162.4,end:169.992,text:'Yeayyy!',section:'outro'}
 ].map(Object.freeze));
 const source='assets/audio/jelajahi-simpulloka.mp3',durationHint=169.992;
 const idioms=['Dalam Tangan','Ambil Hati','Anak Emas','Air Muka','Mandi Peluh','Cakap Besar'];
 const sections={intro:'Selamat datang!',verse1:'Jom teroka!',chorus:'Nyanyi bersama!',verse2:'Kenali simpulan bahasa',bridge:'Cikgu tanya, kita jawab!',final:'Raikan pengembaraan!',outro:'Terima kasih, penjelajah!'};
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let root=null,audio=null,events=null,removal=null,frame=0,last=-1,failed=false;
 const node=selector=>root?.querySelector(selector);
 function cueAt(time){const t=Math.max(0,Number(time)||0);const i=lines.findIndex(c=>t>=c.start&&t<c.end);return i<0?lines.length-1:i;}
 // Decorative song badges only. Never read/write pupil progress, PBD or reward receipts.
 const finalStart=lines.find(c=>c.section==='final').start,finalEnd=lines.find(c=>c.section==='outro').start,missionStart=lines.find(c=>c.text==='Misi selesai, kita pun puas!').start;
 function celebrationAt(time){return time<finalStart?0:Math.min(6,1+Math.floor((time-finalStart)/((finalEnd-finalStart)/6)));}
 function highlight(text){const match=idioms.find(x=>text.toLocaleLowerCase('ms').includes(x.toLocaleLowerCase('ms')));if(!match)return escape(text);const start=text.toLocaleLowerCase('ms').indexOf(match.toLocaleLowerCase('ms'));return escape(text.slice(0,start))+'<mark>'+escape(text.slice(start,start+match.length))+'</mark>'+escape(text.slice(start+match.length));}
 function html({embedded=false}={}){const heading=embedded?'h2':'h1',title=embedded?'ilStepTitle':'concertTitle';return `<section class="panel concert-page" data-lyric-concert aria-labelledby="${title}"><div class="concert-heading"><span class="eyebrow">PENTAS SIMPULLOKA</span><${heading} id="${title}" tabindex="-1">🎶 Video Muzik SimpulLoka</${heading}><p>Satu lagu, enam simpulan bahasa. Jom nyanyi bersama!</p></div><div class="lyric-stage" id="lyricStage" data-mode="intro"><div class="lyric-notes" aria-hidden="true"><span>♪</span><span>✦</span><span>♫</span><span>✧</span><span>♪</span><span>✦</span></div><div class="lyric-avatar left" aria-hidden="true"></div><div class="lyric-center"><span class="lyric-kicker" id="lyricSection">Selamat datang!</span><div id="activeLyric" class="active-lyric">Hai, kawan-kawan!</div><p class="next-lyric"><small>SELEPAS INI</small><span id="nextLyric">Selamat datang ke SimpulLoka!</span></p><aside id="idiomMeaning" class="idiom-meaning" hidden></aside><div id="concertFinale" class="concert-finale" hidden><div class="final-stamps" aria-label="Enam lencana perayaan lagu">${idioms.map((name,i)=>`<span class="lyric-stamp" data-stamp="${i}" data-revealed="false"><b aria-hidden="true">${i+1}</b><small>${name}</small></span>`).join('')}</div><strong id="lyricMission" hidden>MISI SELESAI!</strong><p id="lyricCongratulations" hidden>Tahniah, Penjelajah SimpulLoka!</p></div><span class="lyric-outro-cheer" hidden aria-hidden="true">🎉</span></div><div class="lyric-avatar right" aria-hidden="true"></div></div><audio id="simpullokaSong" src="${source}" preload="none" aria-label="Lagu Jelajahi SimpulLoka"></audio><div class="concert-controls" aria-label="Kawalan lagu"><button type="button" class="lyric-play" data-lyric-action="play" aria-controls="simpullokaSong">▶ Main lagu</button><button type="button" data-lyric-action="restart">↺ Mula semula</button><label class="lyric-seek">Kedudukan lagu<input id="lyricSeek" type="range" min="0" max="${durationHint}" step="0.1" value="0" aria-controls="simpullokaSong"><output id="lyricTime" for="lyricSeek">0:00 / 2:50</output></label><label class="lyric-volume">Kelantangan<input id="lyricVolume" type="range" min="0" max="1" step="0.05" value="0.85" aria-controls="simpullokaSong"></label></div><p id="lyricStatus" class="lyric-status" role="status">Tekan Main lagu apabila bersedia. Audio tidak dimainkan secara automatik.</p><details class="lyric-transcript"><summary>Baca semua lirik</summary><p>Lagu menyebut wajah atau raut wajah. Dalam Loka 4, <strong>menjaga air muka</strong> bermaksud menjaga maruah atau harga diri seseorang. Cakap besar merujuk kepada bermegah-megah, bukan kelantangan suara.</p>${Object.entries(sections).map(([section,label])=>`<section><h3>${label}</h3>${lines.filter(c=>c.section===section).map(c=>`<p>${escape(c.text)}</p>`).join('')}</section>`).join('')}</details>${embedded?'':'<div class="btnrow"><button type="button" onclick="navTo(\'passport\')">📔 Kembali ke Pasport</button></div>'}</section>`;}
 function status(text){const n=node('#lyricStatus');if(n&&n.textContent!==text)n.textContent=text;}
 const silent=()=>typeof pref!=='undefined'&&!!pref.silent;
 const recording=()=>typeof TeacherAudio!=='undefined'&&TeacherAudio.isRecording();
 function motion(on){node('#lyricStage')?.classList.toggle('playing',on);const b=node('[data-lyric-action="play"]');if(b){b.textContent=on?'Ⅱ Jeda':failed?'↻ Cuba main lagi':'▶ Main lagu';b.setAttribute('aria-pressed',String(on));}}
 function format(time){const t=Math.max(0,Math.round(Number(time)||0));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0');}
 function update(ended=false){if(!audio||!root?.isConnected)return;const t=audio.currentTime,i=ended?lines.length-1:cueAt(t),cue=lines[i];
  const stage=node('#lyricStage');stage.dataset.mode=cue.section;stage.classList.toggle('responding',cue.section==='bridge'&&t-cue.start>=(cue.end-cue.start)*.35);
  if(i!==last){last=i;const active=node('#activeLyric');if(cue.section==='bridge'){const [call,response]=cue.text.split(' — ');active.innerHTML=`<span class="lyric-call">${highlight(call)}</span><span class="lyric-response">— ${escape(response)}</span>`;}else active.innerHTML=highlight(cue.text);active.classList.remove('lyric-pop');void active.offsetWidth;active.classList.add('lyric-pop');node('#nextLyric').textContent=lines[i+1]?.text||'Terima kasih kerana menyanyi bersama!';node('#lyricSection').textContent=sections[cue.section];
   const meaning=node('#idiomMeaning');meaning.hidden=cue.idiom===undefined;if(cue.idiom!==undefined){const definition=IDIOMS[cue.idiom];meaning.innerHTML=`<b>${escape(definition.name)}</b><span>${escape(definition.meaning)}</span>${cue.idiom===3?'<small>Dalam Loka 4: menjaga air muka seseorang.</small>':''}`;}
  }
  const count=ended?6:celebrationAt(t);node('#concertFinale').hidden=count===0;node('#lyricMission').hidden=!(count&&t>=missionStart||ended);node('#lyricCongratulations').hidden=cue.section!=='outro';node('.lyric-outro-cheer').hidden=!(cue.section==='outro'&&i===lines.length-1);
  root.querySelectorAll('[data-stamp]').forEach((stamp,n)=>{stamp.dataset.revealed=String(n<count);stamp.setAttribute('aria-label',idioms[n]+(n<count?' — diraikan':' — menanti giliran'));});
  const duration=Number.isFinite(audio.duration)&&audio.duration>0?audio.duration:durationHint,seek=node('#lyricSeek');seek.max=String(duration);seek.value=String(Math.min(t,duration));seek.setAttribute('aria-valuetext',format(t)+' daripada '+format(duration));node('#lyricTime').textContent=format(t)+' / '+format(duration);
 }
 function tick(){if(!audio||!root?.isConnected){unmount();return;}update();if(!audio.paused&&!audio.ended)frame=requestAnimationFrame(tick);else frame=0;}
 function unavailable(){failed=true;motion(false);cancelAnimationFrame(frame);frame=0;status('Lagu belum tersedia atau tidak dapat dimuatkan. Kamu masih boleh membaca semua lirik. Cuba main lagi selepas fail lagu tersedia.');}
 async function play(){if(!audio)return;if(silent()||recording()){preferencesChanged();status(silent()?'Mod Senyap aktif. Matikan Mod Senyap untuk mendengar lagu.':'Selesaikan rakaman cerita dahulu sebelum memainkan lagu.');return;}const current=audio;try{if(failed){failed=false;current.load();}status('Memuatkan lagu…');await current.play();if(current!==audio){current.pause();return;}if(!root?.isConnected){unmount();return;}}catch(error){if(current!==audio||!root?.isConnected)return;if(error.name==='NotAllowedError')status('Tekan Main lagu sekali lagi untuk membenarkan audio.');else if(error.name!=='AbortError')unavailable();}}
 function restart(){if(!audio)return;audio.pause();audio.currentTime=0;last=-1;update();status('Lagu dikembalikan ke permulaan. Tekan Main lagu apabila bersedia.');}
 function preferencesChanged(){if(!audio)return;audio.muted=silent();node('[data-lyric-action="play"]').disabled=silent()||recording();if(silent()){audio.pause();motion(false);status('Mod Senyap aktif. Lirik masih boleh dibaca.');}}
 function mount(scope=document){const host=scope.querySelector('[data-lyric-concert]');if(!host)return;if(host===root&&audio)return;unmount();root=host;audio=node('#simpullokaSong');events=new AbortController();failed=false;last=-1;const on=(target,type,fn)=>target.addEventListener(type,fn,{signal:events.signal});audio.volume=.85;
  on(root,'click',e=>{const action=e.target.closest('[data-lyric-action]')?.dataset.lyricAction;if(action==='play'){if(audio.paused)void play();else audio.pause();}else if(action==='restart')restart();});
  on(node('#lyricSeek'),'input',e=>{if(!audio)return;try{audio.currentTime=Number(e.target.value);update();}catch{status('Mainkan lagu dahulu sebelum memilih kedudukan.');}});
  on(node('#lyricVolume'),'input',e=>{audio.volume=Number(e.target.value);});
  on(audio,'play',()=>{if(silent()||recording()){audio.pause();preferencesChanged();return;}TeacherAudio.stop();document.querySelectorAll('audio,video').forEach(other=>{if(other!==audio)other.pause();});motion(true);update();cancelAnimationFrame(frame);frame=requestAnimationFrame(tick);});
  on(audio,'playing',()=>{if(audio.paused||silent()||recording())return;motion(true);status('Jom nyanyi bersama!');});on(audio,'waiting',()=>{motion(false);status('Lagu sedang dimuatkan…');});
  on(audio,'pause',()=>{motion(false);cancelAnimationFrame(frame);frame=0;if(!failed&&!silent())status('Lagu dijeda. Tekan Main lagu untuk menyambung.');});
  on(audio,'ended',()=>{motion(false);update(true);status('Tahniah! Nyanyian SimpulLoka selesai. 🎉');});on(audio,'error',unavailable);
  for(const event of ['timeupdate','seeking','seeked','loadedmetadata','durationchange'])on(audio,event,()=>update());
  on(document,'teacher-audio:playing',()=>{audio.pause();motion(false);});
  removal=new MutationObserver(()=>{if(root&&!root.isConnected)unmount();});removal.observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
  preferencesChanged();update();
 }
 function unmount(){removal?.disconnect();removal=null;events?.abort();events=null;cancelAnimationFrame(frame);frame=0;if(audio){audio.pause();audio.removeAttribute('src');audio.load();}audio=null;root=null;last=-1;failed=false;}
 return{html,mount,unmount,preferencesChanged,lines,cueAt,celebrationAt};
})();
