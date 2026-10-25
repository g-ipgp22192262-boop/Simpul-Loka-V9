/* Transport outbox only; game flow, rewards and teacher assessment remain independent. */
const PbdEvidence=(()=>{
 let owner='',key='',queue=[],runs={},busy=false,retry=0,notified=false;
 function load(){if(!session)return false;const id=SimpulBackend.mode+'_'+session.studentId;if(id!==owner){owner=id;key='simpulloka_v9_pbd_outbox_'+id;const old=SimpulBackend.read(key)||{};queue=Array.isArray(old.queue)?old.queue:[];runs=old.runs&&typeof old.runs==='object'?old.runs:{};notified=false;}return true;}
 function store(){try{localStorage.setItem(key,JSON.stringify({queue,runs}));}catch{if(!notified){notified=true;notify('Evidens sementara dalam sesi ini sahaja. Storan pelayar tidak tersedia.');}}}
 async function flush(){if(!load()||busy||!queue.length)return;busy=true;const current=owner,student={...session};try{while(queue.length&&owner===current){const job=queue[0];await SimpulBackend.call('pbdStudent',student.studentId,student.token,job.op,job.payload);if(owner!==current)break;queue.shift();store();}notified=false;}catch{if(!notified){notified=true;notify('Evidens PBD belum disegerakkan. Permainan boleh diteruskan; penghantaran akan dicuba semula.');}}finally{busy=false;clearTimeout(retry);if(queue.length)retry=setTimeout(()=>void flush(),15000);}}
 function send(op,payload={}){if(!load())return;if(queue.length>=500){if(!notified){notified=true;notify('Barisan evidens penuh. Hubungi guru untuk menyegerakkan rekod.');}return;}queue.push({op,payload});store();void flush();}
 function begin(lokaId){if(!load())return;if(!runs[lokaId]||runs[lokaId].presented)runs[lokaId]={runId:crypto.randomUUID(),lokaId,presented:false};store();send('start',runs[lokaId]);}
 function active(lokaId){if(!load())return null;if(!runs[lokaId])begin(lokaId);return runs[lokaId];}
 function hint(lokaId,itemId){const run=active(lokaId);if(run){run.itemHints||={};run.itemHints[itemId]=(run.itemHints[itemId]||0)+1;store();}}
 function response(lokaId,itemId,choice,gameHintLevel){const run=active(lokaId);if(run)send('response',{runId:run.runId,itemId,choice,hintLevel:run.itemHints?.[itemId]||0,gameHintLevel,eventId:crypto.randomUUID()});}
 function told(lokaId){const run=active(lokaId);if(run){run.presented=true;store();send('told',{runId:run.runId});}}
 function sync(lokaId){if(!load())return;send('sync',lokaId&&runs[lokaId]?{runId:runs[lokaId].runId}:{});}
 window.addEventListener('online',()=>void flush());
 return{begin,hint,response,told,sync,flush,enrol:()=>sync(),get pending(){return queue.length;}};
})();
