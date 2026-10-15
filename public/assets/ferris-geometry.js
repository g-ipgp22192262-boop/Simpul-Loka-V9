/* One coordinate system for spoke ends, cabin hangers, boarding and the camera. */
'use strict';
const FerrisGeometry = (() => {
  const width=1000,height=840,cx=500,cy=330,radius=230,avatarWidth=84,avatarHeight=104.16,groundY=656.32;
  const clamp=t=>Math.max(0,Math.min(1,t));
  const ease=t=>{t=clamp(t);return t*t*(3-2*t);};
  function position(index,rotation=0){
    const angle=(-90+index*60+rotation)*Math.PI/180;
    return {x:cx+radius*Math.cos(angle),y:cy+radius*Math.sin(angle)};
  }
  function seat(index,rotation=0){const p=position(index,rotation);return {x:p.x,y:p.y+97.53};}
  function boardingRotation(index,current=0){
    const target=180-index*60;
    return current+((target-current+180)%360+360)%360-180;
  }
  function camera(point,amount=0){
    const t=ease(amount),scale=1+1.15*t;
    return {scale,x:(width/2-2.15*point.x)*t,y:(height/2-2.15*point.y)*t};
  }
  return Object.freeze({width,height,cx,cy,radius,avatarWidth,avatarHeight,groundY,clamp,ease,position,seat,boardingRotation,camera});
})();
