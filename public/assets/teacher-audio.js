/* One optional instruction voice at a time. Real MP3 first; labelled browser fallback. */
const TeacherAudio=(()=>{
 let available=new Set(),audio=null,generation=0;
 const ready=fetch('assets/audio/guru/manifest.json').then(r=>r.ok?r.json():{available:[]}).then(m=>{available=new Set(Array.isArray(m.available)?m.available:[]);}).catch(()=>{});
 const normal=s=>String(s||'').trim().replace(/\s+/g,' ').toLocaleLowerCase('ms-MY');
 function stop(){generation++;if(audio){audio.pause();audio.currentTime=0;audio=null;}if('speechSynthesis'in window)speechSynthesis.cancel();}
 function fallback(text,announce=true){if(pref.silent||!text.trim())return;if(announce)notify('Rakaman cikgu belum tersedia untuk teks ini. Bacaan pelayar digunakan sebagai sandaran.');if(!('speechSynthesis'in window))return notify('Bacaan pelayar tidak disokong. Gunakan arahan bertulis.');const u=new SpeechSynthesisUtterance(text);u.lang='ms-MY';u.rate=.82;speechSynthesis.speak(u);}
 async function say(text){stop();if(pref.silent)return notify('Mod Senyap aktif. Matikan Mod Senyap untuk mendengar audio.');document.querySelectorAll('audio,video').forEach(a=>a.pause());const token=generation;await ready;if(token!==generation||pref.silent)return;const entry=TeacherAudioCatalog.filter(x=>!x.status.startsWith('Slot')&&!x.label.startsWith('Perpustakaan')&&normal(text).startsWith(normal(x.script))&&available.has(x.path)).sort((a,b)=>b.script.length-a.script.length)[0];if(!entry)return fallback(String(text));try{audio=new Audio(entry.path);const current=audio;current.onended=()=>{if(token!==generation||pref.silent)return;audio=null;const rest=String(text).trim().replace(/\s+/g,' ').slice(entry.script.trim().replace(/\s+/g,' ').length).trim();if(rest){notify('Rakaman cikgu selesai. Baki maklum balas dibaca oleh pelayar.');fallback(rest,false);}};current.onerror=()=>{if(token===generation){available.delete(entry.path);audio=null;fallback(String(text));}};await current.play();notify('Memainkan rakaman suara cikgu.');}catch{if(token===generation){audio=null;fallback(String(text));}}}
 // Existing recorder/playback mechanics remain unchanged; stop instruction audio first.
 document.addEventListener('click',event=>{if(event.target.closest('[id$="Record"],[id$="StartRecord"],[id$="Listen"]'))stop();},true);
 document.addEventListener('play',event=>{if(event.target instanceof HTMLMediaElement){stop();document.querySelectorAll('audio,video').forEach(other=>{if(other!==event.target)other.pause();});}},true);
 return{say,stop,ready};
})();
