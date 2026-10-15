const actions = new Set(['createStudent','getStudent','saveProgress','saveReflection','saveRushResult','teacherDashboard','saveAssessment']);
export default async (request) => {
  const url = process.env.APPS_SCRIPT_URL, secret = process.env.APPS_SCRIPT_PROXY_SECRET;
  const configured = !!(url && secret);
  const json = (body,status=200) => Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
  if (request.method === 'GET') return json({configured});
  if (request.method !== 'POST') return json({ok:false,error:'Kaedah tidak disokong.'},405);
  if (!configured) return json({ok:false,error:'Backend belum disambungkan.'},503);
  try {
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(url)) throw Error('config');
    const body = await request.text();
    if (body.length > 16000) return json({ok:false,error:'Permintaan terlalu besar.'},413);
    const {action,args} = JSON.parse(body);
    if (!actions.has(action) || !Array.isArray(args) || args.length > 10) return json({ok:false,error:'Operasi tidak sah.'},400);
    const upstream = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,args,secret}),signal:AbortSignal.timeout(15000)});
    if (!upstream.ok) throw Error('upstream');
    const result = await upstream.json();
    return json(result,result.ok?200:400);
  } catch { return json({ok:false,error:'Sambungan backend gagal. Sila cuba lagi.'},502); }
};
