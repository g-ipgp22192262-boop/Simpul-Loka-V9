import {test} from 'node:test';
import assert from 'node:assert/strict';
import {win32,posix,join} from 'node:path';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolveStaticPath,createPbdServer,parseMediaRange} from '../scripts/pbd-dev-server.mjs';

for(const [name,paths,base] of [
 ['Windows',win32,String.raw`C:\SimpulLoka\dist`],
 ['POSIX',posix,'/tmp/SimpulLoka/dist']
])test(`${name}: homepage/assets resolve; traversal and invalid paths are denied`,()=>{
 assert.equal(resolveStaticPath(base,'/',paths),paths.join(base,'index.html'));
 assert.equal(resolveStaticPath(base,'/assets/app.js',paths),paths.join(base,'assets','app.js'));
 assert.equal(resolveStaticPath(base,'/assets/nama%20gambar.png',paths),paths.join(base,'assets','nama gambar.png'));
 for(const pathname of ['/../private.txt','/%2e%2e/private.txt','/../dist-other/private.txt','/assets/../../private.txt','/assets/%2e%2e/%2e%2e/private.txt','/%00','/%ZZ','/assets/..'])assert.equal(resolveStaticPath(base,pathname,paths),null,pathname);
 if(name==='Windows')for(const pathname of ['/%2e%2e%5cprivate.txt','/assets%5c..%5c..%5cprivate.txt'])assert.equal(resolveStaticPath(base,pathname,paths),null,pathname);
});

test('local HTTP serves homepage and static assets; encoded traversal cannot expose outside files',async()=>{
 const root=await mkdtemp(join(tmpdir(),'simpulloka-static-')),before=process.cwd();let running;
 try{
  await mkdir(join(root,'dist','assets'),{recursive:true});
  await writeFile(join(root,'dist','index.html'),'<title>SimpulLoka local test</title>');
  await writeFile(join(root,'dist','assets','app.js'),'console.log("static fixture");');
  await writeFile(join(root,'private.txt'),'must not be served');
  await writeFile(join(root,'dist','assets','sample.mp4'),'0123456789');
  process.chdir(root);
  running=await createPbdServer({env:{},port:0});
  const origin=`http://127.0.0.1:${running.server.address().port}`;
  const home=await fetch(origin+'/');assert.equal(home.status,200);assert.match(await home.text(),/SimpulLoka local test/);
  const asset=await fetch(origin+'/assets/app.js');assert.equal(asset.status,200);assert.match(asset.headers.get('content-type'),/javascript/);assert.match(await asset.text(),/static fixture/);
  const head=await fetch(origin+'/assets/app.js',{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
  assert.equal((await fetch(origin+'/assets/missing.js')).status,404);
  assert.equal((await fetch(origin+'/%2e%2e%2fprivate.txt')).status,403);
  const range=await fetch(origin+'/assets/sample.mp4',{headers:{Range:'bytes=2-5'}});assert.equal(range.status,206);assert.equal(range.headers.get('content-range'),'bytes 2-5/10');assert.equal(await range.text(),'2345');assert.equal((await fetch(origin+'/assets/sample.mp4',{headers:{Range:'bytes=12-'}})).status,416);
  const teacher=await fetch(origin+'/.netlify/functions/teacher-records');assert.equal((await teacher.json()).configured,false);
 }finally{
  if(running)await running.close();
  process.chdir(before);await rm(root,{recursive:true,force:true});
 }
});

test('media byte ranges validate closed/open/suffix ranges and reject unsafe input',()=>{assert.deepEqual(parseMediaRange('bytes=2-5',10),{start:2,end:5});assert.deepEqual(parseMediaRange('bytes=7-',10),{start:7,end:9});assert.deepEqual(parseMediaRange('bytes=-3',10),{start:7,end:9});assert.deepEqual(parseMediaRange('bytes=-99',10),{start:0,end:9});assert.deepEqual(parseMediaRange('bytes=2-99',10),{start:2,end:9});for(const value of ['bytes=-','bytes=10-','bytes=5-2','bytes=-0','bytes=0-1,3-4','bytes=999999999999999999999-','other=0-1'])assert.equal(parseMediaRange(value,10),null,value);assert.equal(parseMediaRange('bytes=0-',0),null);});
