import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createAppsScriptSimulator} from './helpers/apps-script-simulator.mjs';

const clone=value=>JSON.parse(JSON.stringify(value));

test('existing V9.1 sheet rows are read without setup; sync/new visits preserve IDs, evidence and teacher assessment',async()=>{
 const sim=await createAppsScriptSimulator({clock:()=>Date.parse('2026-10-31T04:00:00Z')});
 // Historical-format synthetic rows, inserted directly rather than created through the new model.
 const studentId='SL-EXISTING-RECORD-0001',runId='existing-run-loka-four-0001',tokenHash='a'.repeat(64);
 const created='2026-10-21T00:15:00.000Z',assessed='2026-10-21T01:00:00.000Z';
 const responses=[
  {eventId:'existing-event-0001',itemId:'l4-p3',choice:2,correct:true,hintLevel:1,at:'2026-10-21T00:30:00.000Z'},
  {eventId:'existing-event-0002',itemId:'l4-p4',choice:0,correct:true,hintLevel:0,at:'2026-10-21T00:31:00.000Z'}
 ];
 const history=[{version:1,obj2:'Perlu Bimbingan',oral:3,written:2,rubric:[3,3,3,3,3],note:'Catatan sesi terdahulu.',assessedAt:'2026-10-21T00:50:00.000Z'}];
 const oral=[4,3,4,5,4],note='Catatan lama: cerita santun, gunakan gambar sebagai bantuan.';
 sim.sheets.get('Murid').appendRow([studentId,'Murid Rekod Lama','panda',sim.ctx.hash_('existing-test-ticket'),created,created,'3 Bestari']);
 sim.sheets.get('KemajuanLoka').appendRow([studentId,4,3,1,true,true,true,true,assessed]);
 sim.sheets.get('PentaksiranPBD').appendRow([studentId,4,3,3,3,'Catatan legasi tidak diubah.',4,assessed]);
 sim.sheets.get('Ringkasan PBD').appendRow(['21/10/2026','08:15:00','Murid Rekod Lama','3 Bestari','Belum Selesai','Belum Selesai','Belum Selesai','Selesai','Belum Selesai','Belum Selesai',1,'Betul 1/6 · Belum Betul 0/6 · Tiada Evidens 5/6','Capai 1/6 · Perlu Bimbingan 0/6 · Belum Dinilai 5/6',4,3,note,'21/10/2026 09:00:00',studentId]);
 sim.sheets.get('Butiran Loka').appendRow([studentId,runId,4,'Murid Rekod Lama','3 Bestari','Air Muka','21/10/2026','08:20:00','21/10/2026 08:40:00',true,'l4-p3; l4-p4',JSON.stringify(responses),'Betul','Capai',4,3,JSON.stringify(oral),note,assessed,2,true,JSON.stringify(history)]);
 sim.props.set('SGS_'+tokenHash,JSON.stringify({expiresAt:Date.parse('2026-10-31T04:30:00Z')}));
 // Any accidental migration/setup during normal read or save must fail this test.
 sim.ctx.setupSimpulLoka=()=>{throw Error('Unexpected setupSimpulLoka');};
 sim.ctx.setupPbdRecords=()=>{throw Error('Unexpected setupPbdRecords');};
 const snapshot=Object.fromEntries([...sim.sheets].map(([name,sheet])=>[name,clone(sheet.data)]));
 const first=await sim.invoke('pbdTeacherList',[tokenHash]);
 assert.equal(first.records.length,1);const record=first.records[0],attempt=record.lokas[3].attempts[0];
 assert.equal(record.recordId,studentId);assert.equal(attempt.runId,runId);assert.equal(record.startedAt,created);
 assert.deepEqual(record.completed,[4]);assert.deepEqual(attempt.responses,responses);assert.deepEqual(attempt.rubric,oral);
 assert.equal(attempt.oral,4);assert.equal(attempt.written,3);assert.equal(attempt.note,note);assert.equal(attempt.obj2,'Capai');assert.equal(attempt.assessmentVersion,2);assert.deepEqual(attempt.assessmentHistory,history);
 for(const[name,sheet]of sim.sheets)assert.deepEqual(clone(sheet.data),snapshot[name],name+' read must not mutate sheet rows');
 await sim.invoke('pbdStudent',[studentId,'existing-test-ticket','sync',{runId,obj2:'Belum Dinilai',oral:1,note:'must not overwrite teacher data'}]);
 assert.deepEqual(clone(sim.sheets.get('Butiran Loka').data),snapshot['Butiran Loka']);
 assert.deepEqual(clone(sim.sheets.get('PentaksiranPBD').data),snapshot.PentaksiranPBD);
 const newRun='existing-new-visit-0002';
 await sim.invoke('pbdStudent',[studentId,'existing-test-ticket','start',{lokaId:4,runId:newRun}]);
 const reloaded=(await sim.invoke('pbdTeacherList',[tokenHash])).records[0];
 assert.equal(reloaded.recordId,studentId);assert.deepEqual(reloaded.completed,[4]);
 assert.equal(reloaded.lokas[3].attempts.length,2);assert.equal(reloaded.lokas[3].oral,4);assert.equal(reloaded.lokas[3].note,note);
 const fresh=reloaded.lokas[3].attempts[1];assert.equal(fresh.runId,newRun);assert.equal(fresh.obj2,'Belum Dinilai');assert.equal(fresh.oral,null);assert.equal(fresh.written,null);
 assert.deepEqual(clone(sim.sheets.get('Butiran Loka').data[1]),snapshot['Butiran Loka'][1]);
 // Manual teacher edit targets only the new visit; the historical assessment stays intact.
 await assert.rejects(sim.invoke('pbdTeacherAssess',[tokenHash,studentId,newRun,{version:0,obj2:'Capai',observed:false,oral:4,written:3,rubric:oral,note:'New visit'}]),/mendengar/);
 await assert.rejects(sim.invoke('pbdTeacherAssess',[tokenHash,studentId,newRun,{version:0,obj2:'Capai',observed:true,oral:4,written:3,rubric:[4,null,4,4,4],note:'New visit'}]),/Lima aspek|lima aspek/);
 await sim.invoke('pbdTeacherAssess',[tokenHash,studentId,newRun,{version:0,obj2:'Capai',observed:true,oral:5,written:4,rubric:[5,4,5,4,5],note:'Penilaian guru sesi baharu.'}]);
 const saved=(await sim.invoke('pbdTeacherList',[tokenHash])).records[0];
 assert.equal(saved.lokas[3].attempts[1].oral,5);assert.equal(saved.lokas[3].attempts[1].note,'Penilaian guru sesi baharu.');
 assert.deepEqual(clone(sim.sheets.get('Butiran Loka').data[1]),snapshot['Butiran Loka'][1]);
 assert.equal(sim.sheets.get('Ringkasan PBD').data.length,2);assert.equal(sim.sheets.get('Butiran Loka').data.length,3);
 assert.equal(sim.sheets.get('Ringkasan PBD').data[1][17],studentId);
 for(const[name,sheet]of sim.sheets){assert.deepEqual(clone(sheet.data[0]),snapshot[name][0],name+' header unchanged');if(!['Ringkasan PBD','Butiran Loka'].includes(name))assert.deepEqual(clone(sheet.data),snapshot[name],name+' unchanged');}
});
