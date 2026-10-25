/* Phase 2: functional layered prototype. Final illustrated assets remain replaceable. */
'use strict';
const Ferris = (() => {
  const G=FerrisGeometry,asset='assets/images/ferris-prototype/';
  const rides=['bottles','gift','bow','swing','coaster','ship'];
  const animalNames={panda:'Panda',harimau:'Harimau',kucing:'Kucing',ulat:'Ulat'};
  const colors=['#d9ab69','#bf82b0','#78b5a3','#86a9d0','#a394cd','#cf92a3'];
  // Seconds, including alignment/walking/boarding/ride/zoom/title: 4.2 s total.
  const timing={align:.8,walk:.7,open:.2,board:.45,sit:.2,close:.2,ride:.8,zoom:.55,reveal:.3};
  const duration=Object.values(timing).reduce((a,b)=>a+b,0);
  let root=null,world=null,actor=null,cabins=[],cards=[],controller=null,motion=null;
  let state={rotation:0,selected:null,phase:'idle',busy:false,raf:0,guard:0,run:0};
  const complete=i=>progress[i+1]?.completed===true||String(progress[i+1]?.completed)==='true';
  const animal=()=>Object.hasOwn(animalNames,session?.avatar)?session.avatar:'panda';
  const reduced=()=>!!pref.reduce||!!motion?.matches;
  const shortMotion=()=>reduced()||!!pref.focus;
  function label(i){return `Loka ${i+1}: ${IDIOMS[i].name}, ${IDIOMS[i].ride}. ${complete(i)?'Cop pasport diperoleh. Boleh ulang.':'Belum selesai.'}`;}
  function html(){
    const count=IDIOMS.filter((_,i)=>complete(i)).length;
    return `<section id="ferrisExperience" class="fw-experience" aria-labelledby="fwTitle">
      <header class="fw-heading"><div><span class="fw-eyebrow">JELAJAH TAMAN TEMA • PILIH LOKA</span><h1 id="fwTitle">Roda Ferris <span>SimpulLoka</span></h1><p>Pilih gondola. Teman haiwan kamu akan membawa kamu ke Loka!</p></div><div class="fw-progress"><strong>${count}<span> / 6</span></strong><span>cop pasport</span></div></header>
      <div class="fw-layout"><div class="fw-play-area">
        <div class="fw-toolbar"><span class="fw-traveller"><img src="${asset}avatar-${animal()}.svg" alt="" width="35" height="43"><span>${session?`Teman ${esc(session.nickname)}: <strong>${animalNames[animal()]}</strong>`:'Dapatkan tiket untuk menaiki gondola.'}</span></span><button class="fw-skip" id="fwSkip" onclick="Ferris.skip()" disabled>Langkau Animasi →</button></div>
        <div class="fw-viewport" id="fwViewport" aria-label="Roda Ferris enam gondola interaktif">
          <div class="fw-world" id="fwWorld">
            <img class="fw-environment" src="${asset}park-backdrop.png" onerror="this.onerror=null;this.src='${asset}park-stage.svg'" alt="" draggable="false">
            <img class="fw-supports" src="${asset}supports.svg" alt="" draggable="false">
            <img class="fw-wheel" id="fwWheel" src="${asset}wheel.svg" alt="" draggable="false">
            <div class="fw-boarding-sign" aria-hidden="true">PELANTAR MENAIKI</div>
            ${IDIOMS.map((d,i)=>`<button class="fw-cabin ${complete(i)?'is-complete':''}" id="fwCabin${i}" data-cabin="${i}" style="--cabin-color:${colors[i]}" aria-label="${esc(label(i))}" aria-pressed="false" onclick="Ferris.choose(${i})"><img class="fw-cabin-shell" src="${asset}cabin-${i+1}.svg" alt="" draggable="false"><img class="fw-passenger" src="${asset}avatar-${animal()}.svg" alt="" draggable="false" hidden><img class="fw-door" src="${asset}door.svg" alt="" draggable="false"><img class="fw-cabin-front" src="${asset}cabin-front-${i+1}.svg" alt="" draggable="false"><img class="fw-emblem" src="${asset}icon-${rides[i]}.svg" alt="" draggable="false"><span class="fw-cabin-label"><span class="fw-cabin-index">Loka ${i+1}</span><strong>${d.name}</strong>${complete(i)?'<span class="fw-cop">✓ Cop sah</span>':''}</span></button>`).join('')}
            <div class="fw-avatar" id="fwAvatar" aria-hidden="true"><img src="${asset}avatar-${animal()}.svg" alt="" draggable="false"></div>
          </div>
          <div class="fw-reveal" id="fwReveal" hidden><span>KITA TIBA DI</span><strong id="fwRevealName"></strong><span id="fwRevealRide"></span></div>
        </div>
        <div class="fw-announcer"><span class="fw-status-light" aria-hidden="true"></span><p id="fwStatus" role="status" aria-live="polite" aria-atomic="true">${session?'Tekan gondola atau pilih Loka di senarai.':'Lihat enam Loka, kemudian dapatkan Tiket Pengembaraan di Gerbang.'}</p></div>
      </div>
      <aside class="fw-destinations" aria-labelledby="fwListTitle"><span class="fw-eyebrow">ENAM GONDOLA • ENAM CERITA</span><h2 id="fwListTitle">Ke mana kita?</h2><p>Pilih mana-mana Loka. Loka yang lengkap juga boleh diulang.</p><ol>${IDIOMS.map((d,i)=>`<li><button data-destination="${i}" onclick="Ferris.choose(${i})" aria-label="${esc(label(i))}" style="--cabin-color:${colors[i]}"><span class="fw-ride-icon"><img src="${asset}icon-${rides[i]}.svg" alt="" width="36" height="36"></span><span><strong>${d.name}</strong><span>${d.ride}</span><small>${complete(i)?'✓ Cop diperoleh · Main semula':'Belum selesai · Jom teroka'}</small></span><span class="fw-list-arrow" aria-hidden="true">→</span></button></li>`).join('')}</ol><div class="fw-mode-help"><strong>Pilih rentak kamu</strong><p>Mod Fokus dan Kurangkan Animasi tersedia dalam Mod Inklusif. Langkau animasi pada bila-bila masa.</p><button class="secondary" onclick="toggleAccess()">Buka Mod Inklusif</button><button class="secondary" onclick="speech('Pilih satu daripada enam gondola. Teman haiwan akan menaiki gondola dan membawa kamu ke permainan Loka. Kamu boleh langkau animasi bila-bila masa.')">Dengar arahan</button><label class="fw-silent"><input type="checkbox" id="fwSilent" ${pref.silent?'checked':''} onchange="setPref('silent',this.checked)"> Mod Senyap</label></div></aside></div>
      <footer class="fw-footer"><button class="secondary" onclick="navTo('home')">← Kembali ke Gerbang</button><p><strong>Reka bentuk dan mekanisme yang diluluskan.</strong> Ilustrasi roda, gondola dan haiwan boleh diperhalus lagi tanpa mengubah perjalanan interaktif.</p></footer>
    </section>`;
  }
  function setStatus(phase,message){
    if(!root)return;
    state.phase=phase;root.dataset.phase=phase;
    root.querySelector('#fwStatus').textContent=message;
  }
  function paint(rotation=state.rotation,walk=null,zoom=0){
    if(!root?.isConnected)return;
    state.rotation=rotation;
    root.querySelector('#fwWheel').style.transform=`rotate(${rotation}deg)`;
    cabins.forEach((cab,i)=>{
      const p=G.position(i,rotation);
      cab.style.left=`${p.x/10}%`;cab.style.top=`${(p.y-6)/8.4}%`;
    });
    if(walk){
      actor.style.left=`${walk.x/10}%`;actor.style.top=`${walk.y/8.4}%`;
      actor.style.setProperty('--hop',`${(walk.hop||0)/G.avatarHeight*100}%`);
      actor.style.setProperty('--animal-scale',walk.scale??1);
    }
    const target=state.selected===null?{x:500,y:420}:G.seat(state.selected,rotation);
    const camera=G.camera(target,zoom);
    world.style.transform=`translate(${camera.x/10}%,${camera.y/8.4}%) scale(${camera.scale})`;
    root.querySelector('#fwViewport').style.setProperty('--arrival-glow',shortMotion()?0:G.ease(zoom)*.42);
  }
  // Keep targets still while choosing. The wheel moves only during the ride.
  function idle(){if(root&&!state.busy)paint(state.rotation);}
  function mount(){
    root=document.getElementById('ferrisExperience');if(!root)return;
    controller=new AbortController();world=root.querySelector('#fwWorld');actor=root.querySelector('#fwAvatar');
    cabins=[...root.querySelectorAll('[data-cabin]')];cards=[...root.querySelectorAll('[data-destination]')];
    motion=matchMedia('(prefers-reduced-motion: reduce)');
    state={rotation:0,selected:null,phase:'idle',busy:false,raf:0,guard:0,run:state.run+1};
    paint(0,{x:190,y:G.groundY});
    root.addEventListener('keydown',event=>{
      const button=event.target.closest('[data-cabin],[data-destination]');
      if(event.key==='Escape'&&state.busy){event.preventDefault();skip();return;}
      if(!button||state.busy)return;
      const list=button.hasAttribute('data-cabin')?cabins:cards;
      let n=list.indexOf(button);
      if(['ArrowRight','ArrowDown'].includes(event.key))n=(n+1)%6;
      else if(['ArrowLeft','ArrowUp'].includes(event.key))n=(n+5)%6;
      else if(event.key==='Home')n=0;
      else if(event.key==='End')n=5;
      else return;
      event.preventDefault();list[n].focus();
    },{signal:controller.signal});
    document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.busy)finish();},{signal:controller.signal});
    motion.addEventListener('change',preferencesChanged,{signal:controller.signal});
    idle();
  }
  function unmount(){
    cancelAnimationFrame(state.raf);clearTimeout(state.guard);controller?.abort();
    state.run++;state.busy=false;state.raf=0;state.guard=0;
    root=null;world=null;actor=null;cabins=[];cards=[];controller=null;motion=null;
  }
  function finish(){
    if(!root||!state.busy||state.selected===null)return;
    const index=state.selected;
    cancelAnimationFrame(state.raf);clearTimeout(state.guard);state.busy=false;state.run++;
    // Navigation is independent of SVG/image load or animation completion events.
    enterLoka(index);
    const heading=document.querySelector('#app h1');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
  }
  function skip(){finish();}
  function choose(index){
    if(!Number.isInteger(index)||index<0||index>=6||!root||state.busy)return;
    if(!session){notify('Dapatkan Tiket Pengembaraan dahulu.');navTo('home');return;}
    cancelAnimationFrame(state.raf);state.busy=true;state.selected=index;
    root.querySelector('#fwViewport').setAttribute('aria-busy','true');
    [...cabins,...cards].forEach(button=>{button.disabled=true;});
    cabins[index].classList.add('is-selected');cabins[index].setAttribute('aria-pressed','true');
    cards[index].classList.add('is-selected');
    const skipButton=root.querySelector('#fwSkip');skipButton.disabled=false;skipButton.focus({preventScroll:true});
    const passenger=cabins[index].querySelector('.fw-passenger');
    const startRotation=state.rotation,boarding=G.boardingRotation(index,startRotation),run=++state.run;
    const name=IDIOMS[index].name,ride=IDIOMS[index].ride;
    root.querySelector('#fwRevealName').textContent=name;root.querySelector('#fwRevealRide').textContent=ride;
    // A watchdog guarantees access even if requestAnimationFrame is suspended or fails.
    state.guard=setTimeout(()=>{if(state.run===run)finish();},shortMotion()?900:(duration*1000+700));
    if(shortMotion()){
      actor.hidden=true;passenger.hidden=false;
      setStatus('seated',`${animalNames[animal()]} sudah duduk di gondola ${name}. Membuka Loka.`);
      paint(startRotation);root.querySelector('#fwReveal').hidden=false;
      state.raf=0;
      clearTimeout(state.guard);state.guard=setTimeout(()=>{if(state.run===run)finish();},reduced()?180:450);
      return;
    }
    let start=null,lastPhase='';
    let elapsed=0;const cut={};Object.entries(timing).forEach(([phase,seconds])=>{cut[phase]=elapsed+=seconds;});
    const say=(phase,message)=>{if(lastPhase!==phase){lastPhase=phase;setStatus(phase,message);}};
    function frame(now){
      if(state.run!==run||!root?.isConnected||!state.busy)return;
      start??=now;let t=(now-start)/1000;
      const p={x:190,y:G.groundY,hop:0,scale:1};let rotation=boarding,zoom=0;
      if(t<cut.align){
        rotation=startRotation+(boarding-startRotation)*G.ease(t/timing.align);
        say('align',`Gondola ${name} menuju pelantar menaiki.`);
      }else if(t<cut.walk){
        const a=G.clamp((t-cut.align)/timing.walk);
        p.x=190+(458-190)*G.ease(a);p.hop=-Math.abs(Math.sin(a*Math.PI*4))*5;
        say('walk',`${animalNames[animal()]} berjalan ke gondola ${name}.`);
      }else if(t<cut.open){
        p.x=458;cabins[index].classList.add('door-open');
        say('open','Pintu gondola dibuka. Bersedia untuk naik!');
      }else if(t<cut.board){
        const a=G.ease((t-cut.open)/timing.board);p.x=458+42*a;p.y=G.groundY+(G.seat(index,boarding).y-G.groundY)*a;p.scale=1-.28*a;
        say('board',`${animalNames[animal()]} masuk ke dalam gondola.`);
      }else{
        actor.hidden=true;passenger.hidden=false;if(t>=cut.sit)cabins[index].classList.remove('door-open');
        if(t<cut.sit)say('sit',`${animalNames[animal()]} sudah duduk. Jom berangkat!`);
        else if(t<cut.close)say('close','Pintu ditutup. Bersedia untuk berangkat.');
        else if(t<cut.ride){
          rotation=boarding+18*G.ease((t-cut.close)/timing.ride);
          say('ride',`Gondola ${name} berputar perlahan.`);
        }else{
          rotation=boarding+18;zoom=G.clamp((t-cut.ride)/timing.zoom);
          say(t<cut.zoom?'zoom':'reveal',`Kita tiba di Loka ${index+1}: ${name}. ${ride}.`);
          if(t>=cut.zoom)root.querySelector('#fwReveal').hidden=false;
        }
      }
      try{paint(rotation,p,zoom);}catch{finish();return;}
      if(t>=cut.reveal){finish();return;}
      state.raf=requestAnimationFrame(frame);
    }
    state.raf=requestAnimationFrame(frame);
  }
  function preferencesChanged(){
    if(pref.silent&&'speechSynthesis'in window)speechSynthesis.cancel();
    if(!root)return;
    const silent=root.querySelector('#fwSilent');if(silent)silent.checked=!!pref.silent;
    if(state.busy&&shortMotion()){finish();return;}
    if(!state.busy){cancelAnimationFrame(state.raf);state.raf=0;idle();}
  }
  return {html,mount,unmount,choose,skip,preferencesChanged};
})();
