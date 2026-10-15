/* No credentials here. School mode uses a same-origin server function. */
'use strict';
const SimpulBackend = (() => {
  function read(key) { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } }
  let mode = 'local';
  const ready = fetch('/.netlify/functions/backend', {signal:AbortSignal.timeout(5000)}).then(async r => {
    if (r.ok && (await r.json()).configured === true) mode = 'school';
  }).catch(() => {});
  const key = 'simpulloka_v9_records';
  function save(db) { localStorage.setItem(key, JSON.stringify(db)); }
  async function call(fn, ...args) {
    await ready;
    if (mode === 'school') {
      const response = await fetch('/.netlify/functions/backend', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: fn, args}), signal: AbortSignal.timeout(20000)
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw Error(result.error || 'Sambungan backend gagal. Cuba lagi.');
      return result.data;
    }
    if (['teacherDashboard','saveAssessment'].includes(fn)) throw Error('Sudut Cikgu memerlukan sambungan backend sekolah. Rekod setempat bukan rekod PBD sekolah.');
    const db = read(key) || {};
    if (fn === 'createStudent') {
      const [nickname, avatar, kelas] = args;
      if (nickname.trim().length < 2 || kelas.trim().length < 2) throw Error('Nama panggilan dan kelas diperlukan.');
      const studentId = 'SL-' + crypto.randomUUID().slice(0,8).toUpperCase();
      const student = {studentId, token:crypto.randomUUID(), nickname:nickname.trim().slice(0,30), avatar, kelas:kelas.trim().slice(0,40), progress:[], reflection:null};
      db[studentId] = student; save(db); return student;
    }
    const [id, token, ...values] = args, student = db[id];
    if (!student || !token || student.token !== token) throw Error('Tiket setempat tidak ditemui pada pelayar ini.');
    if (fn === 'getStudent') return student;
    if (fn === 'saveProgress') {
      const [lokaId, attempts, hintLevel, gameCorrect, simpulDone, storyDone] = values;
      if (!Number.isInteger(lokaId) || lokaId < 1 || lokaId > 6) throw Error('Loka tidak sah.');
      const old = student.progress.find(p => p.lokaId === lokaId) || {};
      const p = {lokaId, attempts:Math.max(old.attempts||0,attempts), hintLevel:Math.max(old.hintLevel||0,hintLevel), gameCorrect:!!(old.gameCorrect||gameCorrect), simpulDone:!!(old.simpulDone||simpulDone), storyDone:!!(old.storyDone||storyDone)};
      p.completed = p.gameCorrect && p.simpulDone && p.storyDone;
      student.progress = student.progress.filter(p => p.lokaId !== lokaId).concat(p); save(db); return p;
    }
    if (fn === 'saveReflection') {
      const [feeling, learning, recoveryDone, reinforcementDone] = values;
      student.reflection = {studentId:id, feeling, learning, recoveryDone:!!(student.reflection?.recoveryDone||recoveryDone), reinforcementDone:!!(student.reflection?.reinforcementDone||reinforcementDone)};
      save(db); return student.reflection;
    }
    if (fn === 'saveRushResult') {
      const answers = values[0], keys = ['B','C','A','B','C','A'];
      if (!Array.isArray(answers) || answers.length !== 6) throw Error('Enam respons diperlukan.');
      student.rush = {score:answers.reduce((n,a,i)=>n+(a===keys[i]),0), total:6, completedAt:new Date().toISOString()};
      save(db); return student.rush;
    }
    throw Error('Operasi tidak disokong.');
  }
  return {call, read, ready, get mode(){return mode;}, get sessionKey(){return 'simpulloka_v9_session_'+mode;}};
})();
