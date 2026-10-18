/* One continuous track drives the rails, wheel contact, car tangent and camera. */
'use strict';
const LokaFiveTrack=(()=>{
 const legs=[
  {start:[100,535],d:'C165 535 180 450 225 340 C270 230 315 105 400 105'},
  {start:[400,105],d:'C450 105 460 145 505 145'},
  {start:[505,145],d:'C555 145 570 100 620 100'},
  {start:[620,100],d:'C670 100 680 145 725 145'},
  {start:[725,145],d:'C775 145 790 95 835 115'},
  {start:[835,115],d:'C880 140 900 240 885 330 C860 490 810 540 750 510 C680 475 700 350 610 365 C515 380 560 540 450 545 C330 550 250 535 100 535'}
 ];
 const d='M100 535 '+legs.map(l=>l.d).join(' ');let cached;
 const clamp=n=>Math.max(0,Math.min(1,Number(n)||0));
 function measures(){if(cached)return cached;const lengths=legs.map(l=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',`M${l.start.join(' ')} ${l.d}`);return p.getTotalLength();}),total=lengths.reduce((a,b)=>a+b,0);let n=0;const ends=lengths.map(v=>(n+=v)/total);return cached={total,stations:ends.slice(0,4),peak:ends[4]};}
 function pose(path,fraction){const len=path.getTotalLength(),at=clamp(fraction)*len,p=path.getPointAtLength(at),a=path.getPointAtLength(Math.max(0,at-.5)),b=path.getPointAtLength(Math.min(len,at+.5)),heading=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI,flip=b.x<a.x?-1:1,tilt=flip<0?(heading>0?heading-180:heading+180):heading;return{x:p.x,y:p.y,tilt,flip,distance:at};}
 // A slow crest, brief pause, accelerating drop, then a gentle station return.
 function finale(t,peak){t=clamp(t);if(t<.16)return{fraction:peak,phase:'crest',zoom:1+.14*t/.16,follow:1};if(t<.24)return{fraction:peak,phase:'pause',zoom:1.14,follow:1};const q=(t-.24)/.76,e=q<.6?(.7*Math.pow(q/.6,1.8)):(.7+.3*(1-Math.pow(1-(q-.6)/.4,2)));return{fraction:peak+(1-peak)*e,phase:q<.62?'descending':q<.95?'returning':'arriving',zoom:Math.max(1,1.14-.14*q),follow:clamp((1-q)/.17)};}
 return Object.freeze({d,legs,clamp,measures,pose,finale});
})();
