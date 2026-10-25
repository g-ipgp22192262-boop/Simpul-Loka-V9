/* Demo rows and future Sheets projection. Game progress cannot write teacher fields. */
globalThis.TeacherRecords=(()=>{
 const headers=['recordId','Nama Murid','Kelas','L1','L2','L3','L4','L5','L6','Skor Lisan (1–5)','Skor Bertulis (1–5)','Ulasan Guru','Tarikh Kemas Kini'];
 const done=v=>v===true||v==='true',score=v=>v===''||v===null||v===undefined?null:Number(v);
 function validScore(v){const n=score(v);if(n!==null&&(!Number.isInteger(n)||n<1||n>5))throw Error('Skor mestilah 1 hingga 5 atau belum dinilai.');return n;}
 function progress(row,items,now){const next={...row};for(let n=1;n<=6;n++)next['L'+n]=!!row['L'+n]||items.some(p=>Number(p.lokaId)===n&&done(p.completed));next.updatedAt=now;return next;}
 function assess(row,input,now){const oral=validScore(input.oral),written=validScore(input.written);return {...row,oral,written,note:String(input.note??'').slice(0,1000),updatedAt:now};}
 function demo(makeId,now){return [['Aisyah','3 Bestari',[1,2,4,5],4,3],['Daniel','3 Bestari',[1,3],null,null],['Aisyah','3 Cemerlang',[2,6],3,null]].map(([name,kelas,ids,oral,written])=>progress({recordId:makeId(),name,kelas,oral,written,note:'Data rekaan untuk demonstrasi sahaja.'},ids.map(lokaId=>({lokaId,completed:true})),now));}
 function unique(rows){return [...new Map(rows.filter(r=>r&&typeof r.recordId==='string').map(r=>[r.recordId,r])).values()];}
 return{headers,progress,assess,demo,unique,validScore,done};
})();
