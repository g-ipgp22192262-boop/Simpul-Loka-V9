import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm,access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
test('build audio inventory reflects only existing mapped files; review media/docs are excluded',async()=>{
 const root=await mkdtemp(join(tmpdir(),'simpulloka-library-'));
 try{
  await mkdir(join(root,'public/assets/audio'),{recursive:true});await mkdir(join(root,'preview-screenshots'),{recursive:true});
  await writeFile(join(root,'public/index.html'),'<title>test</title>');
  await writeFile(join(root,'public/assets/audio/dalam-tangan.mp3'),'test-only inventory fixture');
  await writeFile(join(root,'public/assets/audio/unmapped.mp3'),'unmapped test fixture');
  await writeFile(join(root,'public/assets/audio/README.md'),'not a public audio control');
  await writeFile(join(root,'preview-screenshots/review.png'),'not a production asset');
  const result=spawnSync(process.execPath,[resolve('scripts/build.mjs')],{cwd:root,encoding:'utf8'});assert.equal(result.status,0,result.stderr);
  assert.deepEqual(JSON.parse(await readFile(join(root,'dist/assets/audio/library-audio.json'),'utf8')),{available:['dalam-tangan']});
  await assert.rejects(access(join(root,'dist/preview-screenshots/review.png')));await assert.rejects(access(join(root,'dist/assets/audio/README.md')));
 }finally{await rm(root,{recursive:true,force:true});}
});
