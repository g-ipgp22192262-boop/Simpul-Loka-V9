import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm,access,cp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,win32} from 'node:path';
import {spawnSync} from 'node:child_process';
import {includePublicFile} from '../scripts/build-filter.mjs';

test('public build filter excludes documentation on Windows and POSIX paths',()=>{
 for(const path of ['public/assets/audio/README.md',win32.join('C:\\', 'project','public','assets','audio','README.md'),'README.md'])assert.equal(includePublicFile(path),false,path);
 for(const path of ['public/assets/audio/README.mp3',win32.join('C:\\', 'project','public','assets','audio','dalam-tangan.mp3'),'public/assets/audio/README.md/recording.mp3','public/assets/audio','public/index.html'])assert.equal(includePublicFile(path),true,path);
});
test('build audio inventory reflects only existing mapped files; review media/docs are excluded',async()=>{
 const root=await mkdtemp(join(tmpdir(),'simpulloka-library-'));
 try{
  await mkdir(join(root,'public/assets/audio'),{recursive:true});await mkdir(join(root,'preview-screenshots'),{recursive:true});
  await writeFile(join(root,'public/index.html'),'<title>test</title>');
  await writeFile(join(root,'public/assets/audio/dalam-tangan.mp3'),Buffer.concat([Buffer.from('ID3'),Buffer.alloc(256)]));
  for(const f of ['sudut-guru-data.js','sudut-guru-content.js','teacher-audio-catalog.js'])await cp('public/assets/'+f,join(root,'public/assets/'+f));
  await cp('public/assets/images',join(root,'public/assets/images'),{recursive:true});
  await writeFile(join(root,'public/assets/audio/unmapped.mp3'),'unmapped test fixture');
  await writeFile(join(root,'public/assets/audio/README.md'),'not a public audio control');
  await writeFile(join(root,'preview-screenshots/review.png'),'not a production asset');
  const result=spawnSync(process.execPath,[resolve('scripts/build.mjs')],{cwd:root,encoding:'utf8'});assert.equal(result.status,0,result.stderr);
  assert.deepEqual(JSON.parse(await readFile(join(root,'dist/assets/audio/library-audio.json'),'utf8')),{available:['dalam-tangan'],sources:{'dalam-tangan':'assets/audio/dalam-tangan.mp3'}});
  await assert.rejects(access(join(root,'dist/preview-screenshots/review.png')),{code:'ENOENT'});
  await assert.rejects(access(join(root,'dist/assets/audio/README.md')),{code:'ENOENT'});
  await access(join(root,'dist/assets/audio/dalam-tangan.mp3'));
  await access(join(root,'dist/assets/downloads/rph-60-minit.html'));
 }finally{await rm(root,{recursive:true,force:true});}
});
