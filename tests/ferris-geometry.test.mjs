import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const context=vm.createContext({});vm.runInContext(await readFile('public/assets/ferris-geometry.js','utf8')+';globalThis.geometry=FerrisGeometry;',context);
const G=context.geometry,near=(actual,expected)=>assert(Math.abs(actual-expected)<1e-7,`${actual} != ${expected}`);
test('all six hangers meet their spoke ends and arrive at the same boarding point',()=>{
 for(let i=0;i<6;i++)for(const current of [-1000,-540,-1,0,45,179,359,1080]){
  const target=G.boardingRotation(i,current),p=G.position(i,target),seat=G.seat(i,target);
  near(p.x,500);near(p.y,560);near(seat.x,500);near(seat.y,657.53);
  assert(Math.abs(target-current)<=180);
  const before=G.position(i,current);near(Math.hypot(before.x-G.cx,before.y-G.cy),G.radius);
 }
});
test('camera maps the moving cabin seat to centre; sibling cabins remain separated',()=>{
 for(let i=0;i<6;i++){
  const rotation=G.boardingRotation(i,0)+18,p=G.seat(i,rotation),c=G.camera(p,1);
  near(p.x*c.scale+c.x,500);near(p.y*c.scale+c.y,420);
  const a=G.position(i,rotation),b=G.position((i+1)%6,rotation);
  near(Math.hypot(a.x-b.x,a.y-b.y),230);
 }
 const c=G.camera({x:0,y:0},0);near(c.scale,1);near(c.x,0);near(c.y,0);
});

test('larger animal retains the original ground contact and seated size',()=>{
 near(G.groundY+G.avatarHeight/2,708.4);
 near(G.avatarWidth*.72,60.48);
 near(G.avatarHeight*.72,74.9952);
});
