/* Fixed-pivot pendulum; radians, seconds. No timers or application state. */
'use strict';
const LokaSixMotion=Object.freeze({
 targets:[-.30,.30,-.36,.36],
 point(angle,length=350){return{x:500-Math.sin(angle)*length,y:80+Math.cos(angle)*length};},
 step(state,dt,target=null){dt=Math.max(0,Math.min(.035,dt));let {angle,velocity}=state;const acceleration=target===null?-1.8*Math.sin(angle)-.65*velocity:22*(target-angle)-8*velocity;velocity+=acceleration*dt;angle+=velocity*dt;if(Math.abs(angle)>.72){angle=Math.sign(angle)*.72;velocity*=-.25;}return{angle,velocity};},
 final(t){t=Math.max(0,Math.min(1,t));return .53*Math.sin(t*Math.PI*4)*Math.pow(1-t,1.25);}
});
