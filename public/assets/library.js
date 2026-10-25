/* Phase 3: real books and teacher recordings. This page never calls speech(). */
'use strict';
const MagicLibrary=(()=>{
  const imageRoot='assets/images/library/';
  const ids=['dalam-tangan','ambil-hati','anak-emas','air-muka','mandi-peluh','cakap-besar'];
  const colors=['#b56820','#a52974','#167d78','#227bb0','#7046aa','#b33c52'];
  const symbols=['trophy','heart','crown','face','drops','megaphone'];
  const descriptions=[
    'Seorang murid tersenyum sambil memegang trofi yang sudah dimenanginya.',
    'Seorang anak memberi kad hati kepada ibu untuk menggembirakannya.',
    'Seorang murid mendapat perhatian dan kasih sayang istimewa daripada guru.',
    'Raut wajah seorang murid menunjukkan perasaan risau.',
    'Seorang murid mengelap peluh selepas melakukan aktiviti luar.',
    'Seorang murid bermegah-megah di hadapan rakan-rakannya.'
  ];
  const audioFiles=Object.fromEntries([...ids,'kitab-ilmu'].map(id=>[id,`assets/audio/${id}.mp3`]));
  let root=null,dialog=null,controller=null,current=-1,opener=null,visited=new Set(),storageKey='',available=new Set(),manifestReady=false,epoch=0,audio=null,zoomed=false,audioToken=0,motionPhase='idle',motionRun=0,motionTimer=0,motionAnimations=[],flyingBook=null,sourceBook=null,motionPreference=null;
  const icon=(id,cls='')=>`<svg class="${cls}" viewBox="0 0 80 80" aria-hidden="true"><use href="${imageRoot}library-icons.svg#${id}"></use></svg>`;
  const key=()=>`simpulloka_v9_library_${SimpulBackend.mode}_${session?.studentId||'guest'}`;
  function loadVisits(){
    storageKey=key();const saved=SimpulBackend.read(storageKey);
    visited=new Set(Array.isArray(saved)?saved.filter(x=>ids.includes(x)):[]);
  }
  function html(){
    loadVisits();
    return `<section id="magicLibrary" class="library-scene" aria-labelledby="libraryTitle">
      <img class="library-background" src="${imageRoot}library-interior.png" alt="" width="1536" height="1024" fetchpriority="high">
      <div class="library-heading"><span>PETA ILMU SIMPULAN BAHASA</span><h1 id="libraryTitle">Perpustakaan <em>Ajaib</em></h1><p>Satu buku dibuka, satu makna ditemukan.</p></div>
      <div class="library-reading-room">
        <aside class="library-guide" aria-label="Penjaga perpustakaan"><div class="library-bubble"><strong>Selamat datang, pengembara!</strong><p>Sentuh buku pilihanmu.<br>Jom kenali maksud kiasannya.</p></div><img src="${imageRoot}owl-guide.png" alt="Burung hantu penjaga perpustakaan memakai topi ungu dan memegang buku" width="600" height="800"></aside>
        <section class="library-master" aria-labelledby="masterTitle"><span class="library-ribbon">KITAB ILMU UTAMA</span><h2 id="masterTitle">Apakah simpulan bahasa?</h2><p>Simpulan bahasa ialah gabungan perkataan yang membawa <strong>maksud khas</strong>.</p><p>Maksudnya tidak semestinya sama dengan maksud biasa perkataan itu.</p><div class="library-example">${icon('heart')}<p>Contohnya, <strong>ambil hati</strong> bermaksud <strong>menggembirakan seseorang</strong>.</p></div><button class="library-master-button" onclick="MagicLibrary.openMain()">${icon('book')} Buka Kitab Ilmu</button></section>
        <aside class="library-key-panel" aria-labelledby="libraryKeyTitle">${icon('key','library-key-art')}<h2 id="libraryKeyTitle">Kunci Ilmu</h2><p id="libraryKeyMessage">${visited.size===6?'Keenam-enam buku telah diteroka. Kunci Ilmu milik kamu!':'Teroka enam buku untuk mengumpul Kunci Ilmu.'}</p><span class="library-key-count" id="libraryKeyCount">${visited.size} / 6 buku</span><p class="library-key-note">Kamu boleh ke Roda Ferris pada bila-bila masa.</p></aside>
      </div>
      <section class="library-collection" aria-labelledby="collectionTitle"><div class="library-collection-heading"><h2 id="collectionTitle">Enam buku, enam makna</h2><span>Pilih buku untuk membukanya</span></div><div class="library-books">${ids.map((id,i)=>`<button class="library-book ${visited.has(id)?'is-explored':''}" data-library-book="${i}" onclick="MagicLibrary.open(${i},this)" style="--book-color:${colors[i]}" aria-label="Buka buku ${IDIOMS[i].name}${visited.has(id)?', telah diteroka':''}"><span class="library-book-pages" aria-hidden="true"></span><span class="library-book-cover"><span class="library-book-number" aria-hidden="true">BUKU ${String(i+1).padStart(2,'0')}</span><strong>${IDIOMS[i].name}</strong>${icon(symbols[i],'library-cover-symbol')}<span class="library-book-action">Buka buku <span aria-hidden="true">→</span></span><span class="library-book-check" ${visited.has(id)?'':'hidden'}>✓ Diteroka</span></span></button>`).join('')}</div></section>
      <div class="library-bottom"><button class="library-back" onclick="navTo('home')">← Kembali ke Gerbang</button><div class="library-explored" aria-label="Buku yang telah diteroka">${icon('book')}<span id="libraryExploredCount">${visited.size} daripada 6 diteroka</span><span class="library-dots" id="libraryDots" aria-hidden="true">${ids.map(id=>`<i class="${visited.has(id)?'filled':''}"></i>`).join('')}</span></div><button class="library-portal" onclick="navTo('wheel')">${icon('gate')} Ke Roda Ferris <span aria-hidden="true">→</span></button></div>
      <p class="library-storage-note" id="libraryStorageNote">Tanda penerokaan disimpan pada pelayar ini sahaja. Ia berasingan daripada cop Pasport.</p>
      <p class="library-live-status" id="libraryLiveStatus" role="status" aria-live="polite"></p>
      <dialog id="libraryDialog" class="library-dialog" aria-labelledby="libraryBookTitle"><div class="library-motion-toolbar" id="libraryMotionToolbar" hidden><span id="libraryMotionStatus" role="status" aria-live="polite"></span><button onclick="MagicLibrary.skipMotion()" id="librarySkipMotion">Langkau Animasi →</button><button onclick="MagicLibrary.close()" aria-label="Tutup buku semasa animasi">Tutup ×</button></div><div class="library-open-book"><button class="library-close" onclick="MagicLibrary.close()" aria-label="Tutup buku">×</button><span class="library-dialog-kicker" id="libraryDialogKicker">BUKU SIMPULAN BAHASA</span><div class="library-spread"><section class="library-left-page" aria-label="Halaman ilustrasi"><div id="libraryArtWindow" class="library-art-window"><div id="libraryArt" class="library-illustration" role="img"></div></div></section><section class="library-right-page" aria-label="Halaman maksud"><h2 id="libraryBookTitle"></h2><div class="library-meaning"><span>Maksud</span><p id="libraryBookMeaning"></p></div><div class="library-audio-slot" id="libraryAudioSlot" aria-live="polite"></div></section></div><div class="library-dialog-controls"><button id="libraryPrevious" onclick="MagicLibrary.move(-1)" aria-label="Buku sebelumnya">← <span>Sebelum</span></button><button id="libraryZoom" onclick="MagicLibrary.zoom()" aria-pressed="false">Zum ilustrasi +</button><button id="libraryNext" onclick="MagicLibrary.move(1)" aria-label="Buku seterusnya"><span>Seterusnya</span> →</button></div><p class="library-page-number" id="libraryPageNumber" aria-live="polite"></p></div></dialog>
    </section>`;
  }
  function saveVisits(){
    try{localStorage.setItem(storageKey,JSON.stringify([...visited]));return true;}
    catch{root.querySelector('#libraryStorageNote').textContent='Simpanan pelayar tidak tersedia. Tanda penerokaan kekal untuk sesi ini sahaja.';return false;}
  }
  function updateProgress(){
    root.querySelectorAll('[data-library-book]').forEach((button,i)=>{
      const done=visited.has(ids[i]);button.classList.toggle('is-explored',done);
      button.querySelector('.library-book-check').hidden=!done;
      button.setAttribute('aria-label',`Buka buku ${IDIOMS[i].name}${done?', telah diteroka':''}`);
    });
    root.querySelector('#libraryExploredCount').textContent=`${visited.size} daripada 6 diteroka`;
    root.querySelector('#libraryKeyCount').textContent=`${visited.size} / 6 buku`;
    root.querySelector('#libraryDots').innerHTML=ids.map(id=>`<i class="${visited.has(id)?'filled':''}"></i>`).join('');
    root.querySelector('.library-key-panel').classList.toggle('is-unlocked',visited.size===6);
    root.querySelector('#libraryKeyMessage').textContent=visited.size===6?'Keenam-enam buku telah diteroka. Kunci Ilmu milik kamu!':'Teroka enam buku untuk mengumpul Kunci Ilmu.';
  }
  function mark(index){
    const hadKey=visited.size===6;visited.add(ids[index]);saveVisits();updateProgress();
    if(!hadKey&&visited.size===6)root.querySelector('#libraryLiveStatus').textContent='Tahniah! Kamu memperoleh Kunci Ilmu selepas meneroka enam buku. Pintu Roda Ferris sentiasa terbuka.';
  }
  function stopAudio(){audioToken++;if(audio){audio.pause();audio.currentTime=0;audio=null;}}
  function renderAudio(message=''){
    if(!dialog?.open)return;
    const id=current<0?'kitab-ilmu':ids[current],slot=root.querySelector('#libraryAudioSlot');
    if(!manifestReady){slot.textContent='Menyemak audio cikgu…';return;}
    if(!available.has(id)){slot.innerHTML='<p class="library-audio-pending">Audio cikgu akan ditambah</p>';return;}
    slot.innerHTML=`<button class="library-audio-button" onclick="MagicLibrary.playAudio()" ${pref.silent?'disabled':''}>${icon('sound')} ${audio&&!audio.paused?'Jeda suara cikgu':'Dengar suara cikgu'}</button><span id="libraryAudioStatus">${esc(message||(pref.silent?'Mod Senyap aktif.':'Rakaman suara cikgu sebenar.'))}</span>`;
  }
  function renderBook(){
    stopAudio();zoomed=false;root.querySelector('#libraryArtWindow').classList.remove('is-zoomed');
    const main=current<0,name=main?'Kitab Ilmu Utama':IDIOMS[current].name;
    root.querySelector('#libraryBookTitle').textContent=name;
    root.querySelector('#libraryDialogKicker').textContent=main?'MARI KENALI SIMPULAN BAHASA':'PERPUSTAKAAN AJAIB • SIMPULLOKA';
    root.querySelector('#libraryBookMeaning').textContent=main?'Simpulan bahasa ialah gabungan perkataan yang membawa maksud khas. Contohnya, ambil hati bermaksud menggembirakan seseorang.':IDIOMS[current].meaning;
    const art=root.querySelector('#libraryArt');art.className='library-illustration'+(main?' is-main':'');
    art.style.setProperty('--art-x',`${main?50:(current%3)*50}%`);art.style.setProperty('--art-y',`${main?0:Math.floor(current/3)*100}%`);
    art.setAttribute('aria-label',main?'Ruang perpustakaan bercahaya dengan rak buku dan tingkap taman fantasi.':descriptions[current]);
    root.querySelector('#libraryZoom').setAttribute('aria-pressed','false');root.querySelector('#libraryZoom').textContent='Zum ilustrasi +';
    root.querySelector('#libraryPrevious').disabled=main;root.querySelector('#libraryNext').disabled=main;
    root.querySelector('#libraryPageNumber').textContent=main?'Kitab Ilmu Utama':`Buku ${current+1} daripada 6 · Telah diteroka`;
    root.querySelector('.library-open-book').style.setProperty('--book-color',main?'#725096':colors[current]);
    renderAudio();
  }
  const shortMotion=()=>!!pref.focus||!!pref.reduce||!!motionPreference?.matches;
  function phase(name,message=''){
    motionPhase=name;if(!dialog)return;dialog.dataset.bookPhase=name;
    const toolbar=root.querySelector('#libraryMotionToolbar');toolbar.hidden=['idle','reading'].includes(name);
    root.querySelector('#libraryMotionStatus').textContent=message;
  }
  function clearMotion(){
    motionRun++;clearTimeout(motionTimer);motionTimer=0;
    motionAnimations.forEach(a=>{try{a.cancel();}catch{}});motionAnimations=[];
    flyingBook?.remove();flyingBook=null;
  }
  function revealBook(){
    if(!root||!dialog?.open)return;
    clearMotion();const content=root.querySelector('.library-open-book');content.style.opacity='1';content.inert=false;
    phase('reading');if(current>=0)mark(current);
    root.querySelector('.library-close').focus({preventScroll:true});
  }
  function finishClose(){
    if(!root)return;clearMotion();sourceBook?.classList.remove('is-in-flight');sourceBook=null;
    stopAudio();current=-1;phase('idle');dialog?.close();opener?.focus({preventScroll:true});
  }
  function skipMotion(){
    if(motionPhase==='returning'||motionPhase==='closing')finishClose();
    else if(!['idle','reading'].includes(motionPhase))revealBook();
  }
  function rect(node){const r=node.getBoundingClientRect();return {left:r.left,top:r.top,width:r.width,height:r.height};}
  function centreCover(){const w=Math.min(240,innerWidth*.58);return {left:(innerWidth-w)/2,top:(innerHeight-w*1.32)/2,width:w,height:w*1.32};}
  function rightCover(){const r=rect(root.querySelector('.library-open-book'));return {left:r.left+r.width/2,top:r.top,width:r.width/2,height:r.height};}
  function makeFly(bounds){
    flyingBook=document.createElement('div');flyingBook.className='library-flying-book';flyingBook.setAttribute('aria-hidden','true');
    flyingBook.style.setProperty('--book-color',colors[current]);
    const cover=sourceBook.querySelector('.library-book-cover').cloneNode(true);cover.querySelector('.library-book-check')?.remove();
    flyingBook.append(cover);Object.assign(flyingBook.style,Object.fromEntries(Object.entries(bounds).map(([k,v])=>[k,v+'px'])));
    dialog.append(flyingBook);return flyingBook;
  }
  async function animate(node,frames,duration){
    const pixels=frames.map(frame=>Object.fromEntries(Object.entries(frame).map(([key,value])=>[key,['left','top','width','height'].includes(key)&&typeof value==='number'?value+'px':value])));
    const animation=node.animate(pixels,{duration,easing:'cubic-bezier(.25,.65,.3,1)',fill:'forwards'});
    motionAnimations.push(animation);await animation.finished;
  }
  async function beginOpen(){
    clearMotion();const run=motionRun;
    const content=root.querySelector('.library-open-book');content.style.opacity='0';content.inert=true;
    phase('lifting','Buku menyala dan terangkat dari rak.');root.querySelector('#librarySkipMotion').focus({preventScroll:true});
    motionTimer=setTimeout(()=>{if(root&&run===motionRun)revealBook();},3300);
    try{
      const start=rect(sourceBook.querySelector('.library-book-cover')),centre=centreCover(),lift={...start,top:start.top-24};
      const fly=makeFly(start);sourceBook.classList.add('is-in-flight');
      await animate(fly,[{...start,transform:'rotate(-2deg)'},{...lift,transform:'rotate(0deg)'}],280);if(run!==motionRun)return;
      phase('floating','Buku terapung ke tengah.');await animate(fly,[lift,centre],650);if(run!==motionRun)return;
      const hinge=rightCover();await animate(fly,[centre,hinge],180);if(run!==motionRun)return;
      phase('opening','Kulit buku terbuka. Dua halaman ilmu menanti.');
      const fade=content.animate([{opacity:0},{opacity:1}],{duration:400,fill:'forwards'});motionAnimations.push(fade);
      await animate(fly,[{transform:'perspective(1400px) rotateY(0deg)'},{transform:'perspective(1400px) rotateY(-172deg)'}],650);if(run!==motionRun)return;
      await animate(fly,[{opacity:1},{opacity:0}],120);if(run===motionRun)revealBook();
    }catch{if(root&&run===motionRun)revealBook();}
  }
  async function beginClose(){
    clearMotion();const run=motionRun;stopAudio();
    const content=root.querySelector('.library-open-book');content.inert=true;
    phase('closing','Buku ditutup dengan lembut.');root.querySelector('#librarySkipMotion').focus({preventScroll:true});
    motionTimer=setTimeout(()=>{if(root&&run===motionRun)finishClose();},2600);
    try{
      const hinge=rightCover(),centre=centreCover(),fly=makeFly(hinge);
      const fade=content.animate([{opacity:1},{opacity:0}],{duration:450,fill:'forwards'});motionAnimations.push(fade);
      await animate(fly,[{transform:'perspective(1400px) rotateY(-172deg)'},{transform:'perspective(1400px) rotateY(0deg)'}],450);if(run!==motionRun)return;
      await animate(fly,[hinge,centre],180);if(run!==motionRun)return;
      phase('returning','Buku kembali ke rak. Tanda penerokaan disimpan.');
      const shelf=rect(sourceBook.querySelector('.library-book-cover'));
      await animate(fly,[centre,shelf],600);if(run!==motionRun)return;
      await animate(fly,[{opacity:1},{opacity:0}],100);if(run===motionRun)finishClose();
    }catch{if(root&&run===motionRun)finishClose();}
  }
  function open(index,button){
    if(!root||!Number.isInteger(index)||index<0||index>5||(!['idle','reading'].includes(motionPhase)))return;
    sourceBook?.classList.remove('is-in-flight');opener=button||root.querySelector(`[data-library-book="${index}"]`);sourceBook=opener;current=index;
    if(!dialog.open)dialog.showModal();renderBook();
    if(shortMotion()){sourceBook.classList.add('is-in-flight');revealBook();}else void beginOpen();
  }
  function openMain(){
    if(!root||!['idle','reading'].includes(motionPhase))return;sourceBook?.classList.remove('is-in-flight');sourceBook=null;
    opener=root.querySelector('.library-master-button');current=-1;
    if(!dialog.open)dialog.showModal();renderBook();revealBook();
  }
  function close(){
    if(!dialog?.open||['closing','returning'].includes(motionPhase))return;
    if(motionPhase!=='reading')revealBook();
    stopAudio();if(current<0||!sourceBook||shortMotion())finishClose();else void beginClose();
  }
  function move(direction){
    if(!dialog?.open||current<0||motionPhase!=='reading')return;
    sourceBook?.classList.remove('is-in-flight');current=(current+direction+6)%6;
    opener=root.querySelector(`[data-library-book="${current}"]`);sourceBook=opener;sourceBook.classList.add('is-in-flight');
    renderBook();mark(current);
  }
  function zoom(){
    if(!dialog?.open)return;zoomed=!zoomed;root.querySelector('#libraryArtWindow').classList.toggle('is-zoomed',zoomed);
    root.querySelector('#libraryZoom').setAttribute('aria-pressed',String(zoomed));root.querySelector('#libraryZoom').textContent=zoomed?'Zum keluar −':'Zum ilustrasi +';
  }
  async function playAudio(){
    const id=current<0?'kitab-ilmu':ids[current];
    if(!dialog?.open||pref.silent||!available.has(id))return;
    if(audio&&!audio.paused){audio.pause();renderAudio('Rakaman dijeda.');return;}
    const run=epoch,book=current;
    if(!audio){
      audio=new Audio(audioFiles[id]);const token=audioToken;
      audio.addEventListener('ended',()=>{if(root&&epoch===run&&audioToken===token&&dialog?.open&&book===current){stopAudio();renderAudio('Rakaman tamat. Boleh dengar semula.');}},{once:true});
      audio.addEventListener('error',()=>{if(root&&epoch===run&&audioToken===token&&book===current){stopAudio();available.delete(id);renderAudio();}},{once:true});
    }
    const playing=audio,token=audioToken;
    try{await playing.play();if(root&&audioToken===token&&dialog?.open&&book===current)renderAudio('Sedang memainkan rakaman cikgu.');}
    catch{if(root&&epoch===run&&audioToken===token&&book===current){stopAudio();renderAudio('Rakaman belum dapat dimainkan. Sila cuba lagi.');}}
  }
  function preferencesChanged(){
    if(pref.silent)stopAudio();if(root&&dialog?.open){renderAudio();if(shortMotion())skipMotion();}
  }
  function mount(){
    root=document.getElementById('magicLibrary');if(!root)return;dialog=root.querySelector('#libraryDialog');controller=new AbortController();const run=++epoch;motionPhase='idle';motionPreference=matchMedia('(prefers-reduced-motion: reduce)');manifestReady=false;available=new Set();updateProgress();
    window.addEventListener('resize',skipMotion,{signal:controller.signal});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)skipMotion();},{signal:controller.signal});
    motionPreference.addEventListener('change',preferencesChanged,{signal:controller.signal});
    dialog.addEventListener('cancel',event=>{event.preventDefault();close();},{signal:controller.signal});
    dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}},{signal:controller.signal});
    dialog.addEventListener('keydown',event=>{
      if(['ArrowLeft','ArrowRight'].includes(event.key)&&!zoomed&&current>=0){event.preventDefault();move(event.key==='ArrowLeft'?-1:1);}
    },{signal:controller.signal});
    root.querySelector('.library-books').addEventListener('keydown',event=>{
      const b=event.target.closest('[data-library-book]');if(!b)return;let n=Number(b.dataset.libraryBook);
      if(['ArrowRight','ArrowDown'].includes(event.key))n=(n+1)%6;
      else if(['ArrowLeft','ArrowUp'].includes(event.key))n=(n+5)%6;
      else return;event.preventDefault();root.querySelector(`[data-library-book="${n}"]`).focus();
    },{signal:controller.signal});
    fetch('assets/audio/library-audio.json',{signal:controller.signal}).then(r=>r.ok?r.json():{available:[]}).then(data=>{
      if(epoch!==run||!root)return;
      available=new Set(Array.isArray(data.available)?data.available.filter(id=>Object.hasOwn(audioFiles,id)):[]);
      for(const id of available){const path=data.sources?.[id];if(typeof path==='string'&&path===`assets/audio/guru/perpustakaan/${id}.mp3`)audioFiles[id]=path;}
    }).catch(()=>{}).finally(()=>{if(root&&epoch===run){manifestReady=true;renderAudio();}});
  }
  function unmount(){
    ++epoch;clearMotion();sourceBook?.classList.remove('is-in-flight');sourceBook=null;motionPhase='idle';motionPreference=null;stopAudio();controller?.abort();if(dialog?.open)dialog.close();root=null;dialog=null;controller=null;opener=null;current=-1;
  }
  return {html,mount,unmount,skipMotion,open,openMain,close,move,zoom,playAudio,preferencesChanged,audioFiles};
})();
