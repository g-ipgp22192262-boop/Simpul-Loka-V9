import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root='public/assets/video/guru/',video=root+'panduan-simpulloka.mp4';
const m=JSON.parse(readFileSync(root+'narration.json'));
const hash=b=>createHash('sha256').update(b).digest('hex');
const picture=execFileSync('ffmpeg',['-nostdin','-v','error','-i',video,'-map','0:v:0','-c:v','copy','-f','hash','-hash','sha256','-'],{encoding:'utf8'}).trim();
assert.equal(picture,m.video_stream_hash);assert(m.footer_updated);assert.deepEqual(m.demonstration_area,{x:0,y:0,width:1920,height:948});assert.equal(hash(readFileSync(video)),m.video_sha256);
const original=process.env.SOURCE_VIDEO?readFileSync(process.env.SOURCE_VIDEO):execFileSync('git',['cat-file','blob',m.source_video_git_blob],{maxBuffer:80*1024*1024});assert.equal(hash(original),m.source_video_sha256,'Original demonstration must remain the source');
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',video]));
assert.equal(probe.streams.filter(s=>s.codec_type==='audio').length,1);assert.equal(probe.streams.find(s=>s.codec_type==='audio').codec_name,'aac');assert(Math.abs(Number(probe.format.duration)-280)<.1);assert.equal(m.chapters.length,8);
mkdirSync('work/final-polish',{recursive:true});writeFileSync('work/final-polish/source-video.mp4',original);
const demoFrames=[];for(const t of [2,32,62,87,142,172,207,257,277]){const args=['-nostdin','-v','error','-ss',String(t),'-i'];const tail=['-frames:v','1','-vf','crop=1920:948:0:0,scale=480:237','-pix_fmt','gray','-f','rawvideo','-'];const a=execFileSync('ffmpeg',[...args,'work/final-polish/source-video.mp4',...tail],{maxBuffer:1024*1024});const b=execFileSync('ffmpeg',[...args,video,...tail],{maxBuffer:1024*1024});assert.equal(a.length,b.length);let error=0,square=0;for(let i=0;i<a.length;i++){const d=a[i]-b[i];error+=Math.abs(d);square+=d*d;}const mae=error/a.length,psnr=square?10*Math.log10(255**2/(square/a.length)):99;assert(mae<1&&psnr>40,`Demo frame ${t}s changed: ${mae} / ${psnr}`);demoFrames.push({time:t,mae,psnr});}
console.log('PASS demo area matched at 9 frame positions; only obsolete footer updated.');
function pcm(args){const b=execFileSync('ffmpeg',['-nostdin','-v','error',...args,'-ac','1','-ar','8000','-f','f32le','-'],{maxBuffer:4*1024*1024});return new Float32Array(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));}
// AAC may change sample phase: compare 2ms speech-energy fingerprints, not exact PCM samples.
function envelope(pcm){const out=new Float32Array(Math.floor(pcm.length/16));for(let i=0;i<out.length;i++){let energy=0;for(let j=0;j<16;j++)energy+=pcm[i*16+j]**2;out[i]=Math.sqrt(energy/16);}return out;}
function correlation(rawX,rawY){const x=envelope(rawX),y=envelope(rawY);let best=-1,offset=0;for(let lag=-25;lag<=25;lag++){let dot=0,xx=0,yy=0;const a=Math.max(0,lag),b=Math.max(0,-lag),n=Math.min(x.length-a,y.length-b);for(let i=0;i<n;i++){const v=x[a+i],w=y[b+i];dot+=v*w;xx+=v*v;yy+=w*w;}const score=dot/Math.sqrt(xx*yy);if(score>best){best=score;offset=lag*.002;}}return{correlation:best,offsetSeconds:offset};}
const results=[];
for(const c of m.chapters){const source='public/'+c.path;assert.equal(hash(readFileSync(source)),c.source_sha256);const duration=c.source_duration/c.tempo;
 const windows=[];for(const t of [1,duration/2,duration-3]){const reference=pcm(['-i',source,'-af',`atempo=${c.tempo.toFixed(8)},atrim=start=${t}:duration=2,asetpts=PTS-STARTPTS`]);const actual=pcm(['-i',video,'-ss',String(c.start+t),'-t','2','-vn']);const r=correlation(reference,actual);assert(r.correlation>.95,`${c.id} differs from real source: ${JSON.stringify(r)}`);windows.push(r);}results.push({id:c.id,start:c.start,tempo:c.tempo,windows});console.log(c.id,'PASS real-source waveform matched in 3 windows');}
mkdirSync('work/final-polish',{recursive:true});writeFileSync('work/final-polish/video-waveforms.json',JSON.stringify({duration:280,footerUpdated:true,demonstrationFrames:demoFrames,chapters:results},null,2));
console.log('PASS eight actual narration sources aligned; demo area preserved with updated footer; 280s AAC video.');
