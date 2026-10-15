import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {webcrypto} from 'node:crypto';
import handler from '../netlify/functions/backend.mjs';
test('local records: tickets, six Loka, reflection, Rush and isolation', async()=>{
 const store=new Map();
 const ctx=vm.createContext({localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)},crypto:webcrypto,AbortSignal,fetch:async()=>({ok:false})});
 vm.runInContext(await readFile('public/assets/backend.js','utf8')+';globalThis.api=SimpulBackend',ctx);
 const api=ctx.api;
 const s=await api.call('createStudent','Aina','panda','3 Bestari');
 await assert.rejects(api.call('getStudent',s.studentId,'wrong'));
 for(let i=1;i<=6;i++){
  const p=await api.call('saveProgress',s.studentId,s.token,i,1,0,true,true,true);
  assert.equal(p.completed,true);
  assert.equal((await api.call('saveProgress',s.studentId,s.token,i,0,0,false,false,false)).completed,true);
 }
 await api.call('saveReflection',s.studentId,s.token,'gembira','Saya belajar.',true,true);
 assert.equal((await api.call('saveRushResult',s.studentId,s.token,['B','C','A','B','C','A'])).score,6);
 const restored=await api.call('getStudent',s.studentId,s.token);
 assert.equal(restored.progress.length,6);assert.equal(restored.reflection.recoveryDone,true);
 await assert.rejects(api.call('teacherDashboard','anything'),/backend sekolah/);
 store.set('broken','{'); assert.equal(api.read('broken'),null);
});
test('proxy: optional setup, allowlist, secret only upstream, teacher failure',async()=>{
 const originalFetch=globalThis.fetch;
 const oldUrl=process.env.APPS_SCRIPT_URL,oldSecret=process.env.APPS_SCRIPT_PROXY_SECRET;
 try{
 delete process.env.APPS_SCRIPT_URL;delete process.env.APPS_SCRIPT_PROXY_SECRET;
 assert.deepEqual(await (await handler(new Request('https://local/backend'))).json(),{configured:false});
 process.env.APPS_SCRIPT_URL='https://script.google.com/macros/s/test/exec';
 process.env.APPS_SCRIPT_PROXY_SECRET='test-only-secret';
 const request=body=>new Request('https://local/backend',{method:'POST',body:JSON.stringify(body)});
 assert.equal((await handler(request({action:'setupSimpulLoka',args:[]}))).status,400);
 globalThis.fetch=async(url,options)=>{
  assert.equal(JSON.parse(options.body).secret,'test-only-secret');
  return Response.json({ok:true,data:{studentId:'test'}});
 };
 const response=await handler(request({action:'createStudent',args:['Aina','panda','3A']}));
 assert.equal((await response.json()).data.studentId,'test');
 globalThis.fetch=async()=>Response.json({ok:false,error:'Kata laluan guru tidak sah.'});
 assert.equal((await handler(request({action:'teacherDashboard',args:['wrong']}))).status,400);
 }finally{
 globalThis.fetch=originalFetch;
 for(const [key,value] of [['APPS_SCRIPT_URL',oldUrl],['APPS_SCRIPT_PROXY_SECRET',oldSecret]]){if(value===undefined)delete process.env[key];else process.env[key]=value;}
 }
});
