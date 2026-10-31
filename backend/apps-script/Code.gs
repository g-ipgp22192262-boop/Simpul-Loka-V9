/** SimpulLoka V9 — Google Apps Script server.
 * Deploy as Web App: execute as Me; access according to school policy.
 * Run setupSimpulLoka() to create/migrate sheets. Existing teacher password is retained.
 * Never put teacher password in HTML.
 */
const TABLES = {
  Murid: ['studentId','nickname','avatar','accessHash','createdAt','updatedAt','kelas'],
  KemajuanLoka: ['studentId','lokaId','attempts','hintLevel','gameCorrect','simpulDone','storyDone','completed','updatedAt'],
  PentaksiranPBD: ['studentId','lokaId','rubricUnderstanding','rubricSequencing','rubricOral','teacherNote','teacherTP','assessedAt'],
  TetapanRujukan: ['lokaId','idiom','ride','meaning'],
  RefleksiMurid: ['studentId','feeling','learning','recoveryDone','reinforcementDone','updatedAt'],
  RushMinda: ['studentId','score','total','answersJson','completedAt']
};
const REFERENCE = [
 [1,'Dalam Tangan','Jatuhkan Botol','Sudah pasti diperoleh atau dikuasai'],
 [2,'Ambil Hati','Kedai Cenderamata','Menyenangkan atau menggembirakan hati seseorang'],
 [3,'Anak Emas','Memanah','Orang yang paling disayangi atau diberi keutamaan'],
 [4,'Air Muka','Studio Foto Air Muka','Maruah atau harga diri seseorang yang perlu dijaga.'],
 [5,'Mandi Peluh','Roller Coaster','Berpeluh dengan banyaknya'],
 [6,'Cakap Besar','Pirate Ship','Bercakap dengan sombong atau bermegah-megah']
];
function doGet(){return ContentService.createTextOutput(JSON.stringify({service:'SimpulLoka V9 backend'})).setMimeType(ContentService.MimeType.JSON);}
function setupSimpulLoka(){
 const props=PropertiesService.getScriptProperties();
 let id=props.getProperty('SPREADSHEET_ID');
 const ss=id?SpreadsheetApp.openById(id):SpreadsheetApp.create('SimpulLoka V9 — Rekod PBD');
 if(!id)props.setProperty('SPREADSHEET_ID',ss.getId());
 Object.keys(TABLES).forEach(name=>{
   const sh=ss.getSheetByName(name)||ss.insertSheet(name);
   const head=TABLES[name];
   if(sh.getLastRow()===0)sh.appendRow(head);
   else {
     const existing=sh.getRange(1,1,1,Math.max(sh.getLastColumn(),1)).getValues()[0];
     const prefix=existing.slice(0,Math.min(existing.length,head.length));
     if(prefix.some((value,i)=>value!==head[i]))throw Error('Header '+name+' tidak sepadan. Data asal tidak diubah.');
     if(existing.length<head.length)sh.getRange(1,existing.length+1,1,head.length-existing.length).setValues([head.slice(existing.length)]);
   }
   sh.setFrozenRows(1);
 });
 const ref=ss.getSheetByName('TetapanRujukan');
 if(ref.getLastRow()===1)ref.getRange(2,1,REFERENCE.length,4).setValues(REFERENCE);
 Logger.log('Spreadsheet: '+ss.getUrl());return ss.getUrl();
}
function setTeacherPassword_(password){
 if(typeof password!=='string'||password.length<12)throw Error('Kata laluan guru mesti sekurang-kurangnya 12 aksara.');
 const p=PropertiesService.getScriptProperties(),salt=Utilities.getUuid();
 p.setProperties({TEACHER_SALT:salt,TEACHER_HASH:hash_(salt+password)});
 return 'Kata laluan guru ditetapkan.';
}
function hash_(s){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,s,Utilities.Charset.UTF_8).map(b=>('0'+(b&255).toString(16)).slice(-2)).join('');}
function sheet_(name){const id=PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');if(!id)throw Error('Jalankan setupSimpulLoka dahulu.');return SpreadsheetApp.openById(id).getSheetByName(name);}
function rows_(name){const sh=sheet_(name),values=sh.getDataRange().getValues();const keys=TABLES[name];return values.slice(1).filter(r=>r[0]!==''&&r[0]!==null).map((r,i)=>({row:i+2,obj:Object.fromEntries(keys.map((k,j)=>[k,r[j]]))}));}
function safeText_(x,max){return String(x==null?'':x).replace(/[<>\u0000-\u001f]/g,'').trim().slice(0,max);}
function validAvatar_(a){return ['panda','harimau','kucing','ulat'].includes(a)?a:'panda';}
function student_(id,token){const r=rows_('Murid').find(x=>x.obj.studentId===id);if(!r||!token||hash_(String(token))!==r.obj.accessHash)throw Object.assign(Error('Sesi murid tidak sah. Sila masuk menggunakan tiket asal.'),{status:401});return r;}
function teacher_(password){const p=PropertiesService.getScriptProperties();if(!p.getProperty('TEACHER_HASH')||!password||hash_(p.getProperty('TEACHER_SALT')+String(password))!==p.getProperty('TEACHER_HASH'))throw Error('Kata laluan guru tidak sah.');}
function createStudent(nickname,avatar,kelas,requestToken){
 const name=safeText_(nickname,30),className=safeText_(kelas,40);if(name.length<2)throw Error('Nama panggilan mesti sekurang-kurangnya 2 aksara.');if(className.length<2)throw Error('Sila masukkan kelas.');
 const lock=LockService.getScriptLock();lock.waitLock(15000);
 try{
  if(requestToken!==undefined&&(!/^[a-f0-9-]{72}$/.test(String(requestToken))))throw Error('Permintaan tiket tidak sah.');
  const token=requestToken||Utilities.getUuid()+Utilities.getUuid(),now=new Date().toISOString();
  if(requestToken){const old=rows_('Murid').find(x=>x.obj.accessHash===hash_(token));if(old){if(old.obj.nickname!==name||old.obj.kelas!==className)throw Error('Permintaan tiket tidak sepadan.');return {...getStudent(old.obj.studentId,token),token};}}
  const id='SL-'+Utilities.getUuid().toUpperCase();
  sheet_('Murid').appendRow([id,name,validAvatar_(avatar),hash_(token),now,now,className]);
  return {studentId:id,token,nickname:name,kelas:className,avatar:validAvatar_(avatar),progress:[],reflection:null};
 }finally{lock.releaseLock();}
}
function getStudent(studentId,token){const s=student_(studentId,token).obj;return {studentId:s.studentId,nickname:s.nickname,kelas:s.kelas||'',avatar:s.avatar,reflection:rows_('RefleksiMurid').find(x=>x.obj.studentId===studentId)?.obj||null,progress:rows_('KemajuanLoka').filter(x=>x.obj.studentId===studentId).map(x=>x.obj)};}
function saveProgress(studentId,token,lokaId,attempts,hintLevel,gameCorrect,simpulDone,storyDone){
 student_(studentId,token);const n=Number(lokaId);if(!Number.isInteger(n)||n<1||n>6)throw Error('Loka tidak sah.');
 const lock=LockService.getScriptLock();lock.waitLock(20000);
 try{
  const sh=sheet_('KemajuanLoka'),found=rows_('KemajuanLoka').find(x=>x.obj.studentId===studentId&&Number(x.obj.lokaId)===n);
  const old=found?found.obj:null;
  const a=Math.max(Number(old&&old.attempts)||0,Math.min(999,Math.max(0,Number(attempts)||0)));
  const h=Math.max(Number(old&&old.hintLevel)||0,Math.min(3,Math.max(0,Number(hintLevel)||0)));
  const g=Boolean(gameCorrect)||(old&&String(old.gameCorrect)==='true');
  const s=Boolean(simpulDone)||(old&&String(old.simpulDone)==='true');
  const t=Boolean(storyDone)||(old&&String(old.storyDone)==='true');
  const completed=Boolean(g&&s&&t),values=[studentId,n,a,h,Boolean(g),Boolean(s),Boolean(t),completed,new Date().toISOString()];
  if(found)sh.getRange(found.row,1,1,values.length).setValues([values]);else sh.appendRow(values);
  return {lokaId:n,attempts:a,hintLevel:h,gameCorrect:Boolean(g),simpulDone:Boolean(s),storyDone:Boolean(t),completed};
 }finally{lock.releaseLock();}
}
function teacherDashboard(password){teacher_(password);const students=rows_('Murid').map(x=>({studentId:x.obj.studentId,nickname:x.obj.nickname,kelas:x.obj.kelas||'',avatar:x.obj.avatar,createdAt:x.obj.createdAt}));const progress=rows_('KemajuanLoka').map(x=>x.obj);const assessments=rows_('PentaksiranPBD').map(x=>x.obj);const reflections=rows_('RefleksiMurid').map(x=>x.obj);const rush=rows_('RushMinda').map(x=>x.obj);return {students,progress,assessments,reflections,rush};}
function saveAssessment(password,studentId,lokaId,understanding,sequencing,oral,note,tp){
 teacher_(password);if(!rows_('Murid').some(x=>x.obj.studentId===studentId))throw Error('Murid tidak dijumpai.');
 const n=Number(lokaId);if(!Number.isInteger(n)||n<1||n>6)throw Error('Loka tidak sah.');
 const scores=[understanding,sequencing,oral].map(x=>Number(x));if(scores.some(x=>!Number.isInteger(x)||x<1||x>4))throw Error('Skor rubrik perlu antara 1–4.');
 const t=Number(tp);if(!Number.isInteger(t)||t<1||t>6)throw Error('TP mesti antara 1–6.');
 const lock=LockService.getScriptLock();lock.waitLock(15000);
 try{const sh=sheet_('PentaksiranPBD'),found=rows_('PentaksiranPBD').find(x=>x.obj.studentId===studentId&&Number(x.obj.lokaId)===n);const vals=[studentId,n,...scores,safeText_(note,1000),t,new Date().toISOString()];if(found)sh.getRange(found.row,1,1,vals.length).setValues([vals]);else sh.appendRow(vals);return {ok:true};}finally{lock.releaseLock();}
}

/** V8.1 — reflection and extension activity statuses; no voice data stored. */
function saveReflection(studentId,token,feeling,learning,recoveryDone,reinforcementDone){
 student_(studentId,token);
 const allowed=['gembira','sedih','kecewa','tenang','teruja'];
 if(!allowed.includes(feeling))throw Error('Sila pilih perasaan kamu.');
 const message=safeText_(learning,500);if(message.length<3)throw Error('Sila tulis sekurang-kurangnya beberapa perkataan tentang pembelajaran.');
 const lock=LockService.getScriptLock();lock.waitLock(15000);
 try{
  const sh=sheet_('RefleksiMurid'),found=rows_('RefleksiMurid').find(x=>x.obj.studentId===studentId);
  const recovery=Boolean(recoveryDone)||(found&&String(found.obj.recoveryDone)==='true');
  const reinforcement=Boolean(reinforcementDone)||(found&&String(found.obj.reinforcementDone)==='true');
  const vals=[studentId,feeling,message,Boolean(recovery),Boolean(reinforcement),new Date().toISOString()];
  if(found)sh.getRange(found.row,1,1,vals.length).setValues([vals]);else sh.appendRow(vals);
  return {studentId,feeling,learning:message,recoveryDone:Boolean(recovery),reinforcementDone:Boolean(reinforcement)};
 }finally{lock.releaseLock();}
}

// V9: SimpulLoka Rush results are supplementary evidence, not automatic PBD TP.
function saveRushResult(studentId,token,answers){
 student_(studentId,token);
 if(!Array.isArray(answers)||answers.length!==6)throw Error('Enam respons diperlukan.');
 const keys=['B','C','A','B','C','A'];
 const cleaned=answers.map((x,i)=>{const v=String(x).toUpperCase();if(!['A','B','C'].includes(v))throw Error('Jawapan tidak sah.');return v;});
 const score=cleaned.reduce((n,v,i)=>n+(v===keys[i]?1:0),0);
 const sh=sheet_('RushMinda'),now=new Date(),rows=rows_('RushMinda');
 const old=rows.find(x=>x.obj.studentId===studentId);
 const record=[studentId,score,6,JSON.stringify(cleaned),now];
 if(old)sh.getRange(old.row,1,1,record.length).setValues([record]);else sh.appendRow(record);
 return {score,total:6,completedAt:now.toISOString()};
}

// Netlify adapter: deploy in a NEW Apps Script project with a NEW spreadsheet.
function doPost(e) {
 const output = value => ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
 try {
  const body = JSON.parse(e.postData.contents);
  const secret = PropertiesService.getScriptProperties().getProperty('NETLIFY_PROXY_SECRET');
  if (!secret || body.secret !== secret) throw Error('Sambungan tidak dibenarkan.');
  const methods = {createStudent,getStudent,saveProgress,saveReflection,saveRushResult,pbdStudent,pbdAuthAttempt,pbdAuthFinish,pbdAuthStatus,pbdAuthLogout,pbdTeacherList,pbdTeacherAssess};
  if (!Object.prototype.hasOwnProperty.call(methods,body.action) || !Array.isArray(body.args)) throw Error('Operasi tidak sah.');
  if(body.action==='createStudent')pbdTicketPermit_(body.clientKey);
  return output({ok:true,data:methods[body.action].apply(null,body.args)});
 } catch (error) { return output({ok:false,status:error.status||503,error:error.status?String(error.message):'Perkhidmatan rekod tidak tersedia. Semak konfigurasi Apps Script.'}); }
}
