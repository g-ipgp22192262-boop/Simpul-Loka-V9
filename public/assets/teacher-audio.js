/* Explicit V9.1 clips. Student permission/recording owns audio priority. */
const TeacherAudio=(()=>{
 let available=new Set(),audio=null,generation=0,currentId=null;
 const recorders=new Set(),transitions=new Map();
 const ready=fetch('assets/audio/guru/manifest.json').then(r=>r.ok?r.json():{available:[]}).then(m=>{available=new Set(Array.isArray(m.available)?m.available:[]);}).catch(()=>{}).finally(()=>refresh());
 const silent=()=>typeof pref!=='undefined'&&pref.silent;
 function refresh(){document.querySelectorAll('[data-intro-audio-status]').forEach(n=>{const entry=TeacherAudioCatalog.find(x=>x.id===n.dataset.introAudioStatus);const exists=entry&&available.has(entry.path);const text=exists?'Rakaman pengenalan Cikgu Danea tersedia.':'Audio pengenalan belum tersedia. Gunakan panduan bertulis di atas.';if(n.textContent!==text)n.textContent=text;});document.querySelectorAll('[data-teacher-audio],.l2-audio,.il-audio').forEach(b=>{b.disabled=!!silent()||recorders.size>0;});}
 function stop(){generation++;currentId=null;if(audio){const old=audio;audio=null;old.onended=old.onerror=null;old.pause();old.removeAttribute('src');old.load();}if('speechSynthesis'in window)speechSynthesis.cancel();}
 function transition(owner,key){if(transitions.get(owner)!==key){stop();transitions.set(owner,key);}}
 function setRecording(owner,active){if(active){recorders.add(owner);stop();}else recorders.delete(owner);refresh();}
 function permitted(){if(recorders.size){notify('Selesaikan atau hentikan rakaman dahulu sebelum mendengar arahan cikgu.');return false;}if(silent()){notify('Mod Senyap aktif. Matikan Mod Senyap untuk mendengar audio.');return false;}return true;}
 function pauseMedia(){document.querySelectorAll('audio,video').forEach(a=>a.pause());if(typeof MagicLibrary!=='undefined')MagicLibrary.stopAudio();}
 async function play(id){
  if(!permitted())return false;stop();pauseMedia();const token=generation;await ready;
  if(token!==generation||silent()||recorders.size)return false;
  const entry=TeacherAudioCatalog.find(x=>x.id===id&&!x.legacy);
  if(!entry||!available.has(entry.path)){notify(id.endsWith('-pengenalan')?'Audio pengenalan belum tersedia. Gunakan arahan bertulis sementara menunggu rakaman Cikgu Danea.':'Rakaman cikgu belum tersedia. Gunakan arahan bertulis atau bimbingan cikgu.');return false;}
  const current=new Audio(entry.path);audio=current;currentId=id;
  current.onended=()=>{if(token===generation){audio=null;currentId=null;}};
  current.onerror=()=>{if(token===generation){stop();notify('Rakaman cikgu tidak dapat dimainkan. Cuba lagi atau gunakan arahan bertulis.');}};
  try{await current.play();if(token!==generation||silent()||recorders.size){current.pause();return false;}document.dispatchEvent(new CustomEvent('teacher-audio:playing',{detail:{id,path:entry.path}}));return true;}
  catch{if(token===generation){stop();notify('Audio belum dapat dimainkan. Tekan butang untuk cuba lagi.');}return false;}
 }
 // Dynamic text never falls back to browser speech.
 function say(){stop();if(permitted())notify('Rakaman cikgu belum tersedia. Gunakan arahan bertulis atau bimbingan cikgu.');}
 function button(id,label='Dengar Arahan'){if(!TeacherAudioCatalog.some(x=>x.id===id&&!x.legacy))return '';return `<button type="button" class="l2-audio" data-teacher-audio data-audio-clip="${id}" onclick="TeacherAudio.play('${id}')" ${silent()||recorders.size?'disabled':''}>${label}</button>`;}
 document.addEventListener('click',event=>{if(event.target.closest('[id$="Record"],[id$="StartRecord"],[id$="Listen"],[id$="Again"]'))stop();},true);
 document.addEventListener('play',event=>{if(event.target instanceof HTMLMediaElement){stop();document.querySelectorAll('audio,video').forEach(other=>{if(other!==event.target)other.pause();});}},true);
 new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true});
 return{play,say,stop,ready,button,refresh,transition,setRecording,isRecording:()=>recorders.size>0,state:()=>({id:currentId,playing:!!audio&&!audio.paused,time:audio?.currentTime||0,recording:recorders.size>0})};
})();
