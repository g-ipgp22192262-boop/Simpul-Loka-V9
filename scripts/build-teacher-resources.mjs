import {createHash} from 'node:crypto';
import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';import vm from 'node:vm';
const ctx=vm.createContext({});for(const f of ['sudut-guru-data.js','sudut-guru-content.js','teacher-audio-catalog.js'])vm.runInContext(await readFile('public/assets/'+f,'utf8'),ctx);
await mkdir('dist/assets/downloads',{recursive:true});
const C=ctx.SudutGuruContent,files={rph:'rph-60-minit',oral:'rubrik-lisan',written:'rubrik-bertulis',worksheet:'lembaran-kerja',cards:'kad-gambar-cerita',guide:'panduan-guru',recovery:'lembaran-pemulihan',reinforcement:'lembaran-pengukuhan'};
for(const[id,name]of Object.entries(files)){
 let body=C.render(id);
 if(id==='cards'){const variables=[];for(const[i,path]of C.atlases.entries()){const type=path.endsWith('.png')?'image/png':'image/webp';const data=await readFile('public/assets/images/'+path);variables.push(`.sg-story-picture[data-atlas="${i}"]{background-image:url(data:${type};base64,${data.toString('base64')})}`);body=body.replaceAll(`background-image:url('assets/images/${path}');`,'');}body='<style>'+variables.join('')+'</style>'+body;}
 await writeFile(`dist/assets/downloads/${name}.html`,C.document(id,body));
}
const available=[];for(const x of ctx.TeacherAudioCatalog){try{const data=await readFile('public/'+x.path);if(data.length>128&&(data.toString('ascii',0,3)==='ID3'||data[0]===255&&(data[1]&224)===224))available.push(x.path);}catch{}}
await mkdir('dist/assets/audio/guru',{recursive:true});await writeFile('dist/assets/audio/guru/manifest.json',JSON.stringify({available}));
const ids=['dalam-tangan','ambil-hati','anak-emas','air-muka','mandi-peluh','cakap-besar','kitab-ilmu'],sources={};
for(const id of ids){const modern=`assets/audio/guru/perpustakaan/${id}.mp3`,legacy=`assets/audio/${id}.mp3`;if(available.includes(modern))sources[id]=modern;else{try{const data=await readFile('public/'+legacy);if(data.length>128&&(data.toString('ascii',0,3)==='ID3'||data[0]===255&&(data[1]&224)===224))sources[id]=legacy;}catch{}}}
await writeFile('dist/assets/audio/library-audio.json',JSON.stringify({available:Object.keys(sources),sources}));
let video=false,captions=false;try{const f=await readFile('public/assets/video/guru/panduan-simpulloka.mp4');video=f.length>1000&&f.toString('ascii',4,8)==='ftyp';}catch{}
try{captions=(await readFile('public/assets/video/guru/panduan-simpulloka.ms.vtt','utf8')).trimStart().startsWith('WEBVTT');}catch{}
// Narration stays in a separate manifest, never TeacherAudioCatalog/app playback.
const narrationNames=['babak-01-pengenalan','babak-02-peta-ilmu','babak-03-roda-ferris','babak-04-tiga-misi','babak-05-inklusif','babak-06-kenangan-pencapaian','babak-07-sudut-guru-pbd','babak-08-penutup'];
const narration=[];for(const name of narrationNames){const path=`assets/audio/guru/video-panduan/${name}.mp3`;try{const data=await readFile('public/'+path);if(data.length>128&&(data.toString('ascii',0,3)==='ID3'||data[0]===255&&(data[1]&224)===224))narration.push(path);}catch{}}
await mkdir('dist/assets/audio/guru/video-panduan',{recursive:true});await writeFile('dist/assets/audio/guru/video-panduan/manifest.json',JSON.stringify({videoOnly:true,available:narration}));
let narrated=false;try{const m=JSON.parse(await readFile('public/assets/video/guru/narration.json','utf8'));narrated=video&&narration.length===8&&m.narrated===true&&m.chapters?.length===8&&m.video_sha256===createHash('sha256').update(await readFile('public/assets/video/guru/panduan-simpulloka.mp4')).digest('hex');}catch{}
await mkdir('dist/assets/video/guru',{recursive:true});await writeFile('dist/assets/video/guru/manifest.json',JSON.stringify({available:video,captions:video&&captions,narrated}));
console.log('Teacher resources: 8 standalone printable HTML downloads;',available.length,'real MP3 files; video',video?'present':'pending');
