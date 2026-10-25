import {cp,rm,mkdir,readdir,writeFile} from 'node:fs/promises';
import {includePublicFile} from './build-filter.mjs';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true,filter:includePublicFile});
console.log('Built public/ → dist/ (frontend only)');

// Publish a truthful inventory of teacher MP3s; no fake or synthesized recordings.
const audioFiles=await readdir('public/assets/audio').catch(()=>[]);
const audioIds=['dalam-tangan','ambil-hati','anak-emas','air-muka','mandi-peluh','cakap-besar','kitab-ilmu'];
await mkdir('dist/assets/audio',{recursive:true});
await writeFile('dist/assets/audio/library-audio.json',JSON.stringify({available:audioIds.filter(id=>audioFiles.includes(id+'.mp3'))}));

// Shared source generates actual self-contained teacher downloads and truthful media inventory.
await import('./build-teacher-resources.mjs');
