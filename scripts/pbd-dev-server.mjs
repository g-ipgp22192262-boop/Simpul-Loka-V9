import http from'node:http';import{readFile,stat}from'node:fs/promises';import pathApi,{resolve,extname}from'node:path';import{fileURLToPath}from'node:url';import{createTeacherHandler}from'../backend/server/teacher-gateway.mjs';import backend from'../netlify/functions/backend.mjs';
// Use the native path API; URL separators are not filesystem separators on Windows.
export function resolveStaticPath(base,pathname,paths=pathApi){
 let decoded;try{decoded=decodeURIComponent(pathname==='/'?'/index.html':pathname);}catch{return null;}
 if(!decoded.startsWith('/')||decoded.includes('\0'))return null;
 const target=paths.resolve(base,'.'+decoded),relative=paths.relative(base,target);
 if(!relative||relative==='..'||relative.startsWith('..'+paths.sep)||paths.isAbsolute(relative))return null;
 return target;
}
// Single byte ranges let the browser seek/replay local media without altering API routes.
export function parseMediaRange(header,size){
 const m=/^bytes=(\d*)-(\d*)$/.exec(header||'');
 if(!m||(!m[1]&&!m[2])||!Number.isSafeInteger(size)||size<=0)return null;
 let start,end;
 if(!m[1]){const suffix=Number(m[2]);if(!Number.isSafeInteger(suffix)||suffix<=0)return null;start=Math.max(0,size-suffix);end=size-1;}
 else{start=Number(m[1]);end=m[2]?Number(m[2]):size-1;if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>=size||end<start)return null;end=Math.min(end,size-1);}
 return{start,end};
}
export async function createPbdServer({env=process.env,simulator=null,port=4180}={}){
 const origin=`http://127.0.0.1:${port}`,config={...env,PBD_SITE_ORIGIN:origin,PBD_LOCAL_HTTP:'1'},teacher=createTeacherHandler({env:config,invoke:simulator?.invoke,source:simulator?'simulation':'google-sheets'}),base=resolve('dist');
 const server=http.createServer(async(req,res)=>{try{const parts=[];let size=0;for await(const part of req){size+=part.length;if(size>18000){res.writeHead(413);res.end('Permintaan terlalu besar.');return;}parts.push(part);}const url=new URL(req.url,origin),request=new Request(url,{method:req.method,headers:req.headers,...(!['GET','HEAD'].includes(req.method)?{body:Buffer.concat(parts)}:{})});let response;
 if(url.pathname==='/.netlify/functions/teacher-records')response=await teacher(request,{ip:req.socket.remoteAddress});
 else if(url.pathname==='/.netlify/functions/backend'){
 if(!simulator)response=await backend(request);
 else if(req.method==='GET')response=Response.json({configured:true,source:'simulation'});
 else{try{const body=await request.json();if(!['createStudent','getStudent','saveProgress','saveReflection','saveRushResult','pbdStudent'].includes(body.action)||!Array.isArray(body.args))throw Object.assign(Error('Operasi tidak dibenarkan.'),{status:403});response=Response.json({ok:true,data:await simulator.invoke(body.action,body.args)});}catch(e){response=Response.json({ok:false,error:e.message},{status:e.status||400});}}
 }else{const path=resolveStaticPath(base,url.pathname);if(path===null){res.writeHead(403);res.end();return;}try{const data=await readFile(path);const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.mp3':'audio/mpeg','.mp4':'video/mp4','.vtt':'text/vtt'};const headers={'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-store','Content-Length':data.length};if(/\.(mp4|mp3|webm|m4a|ogg)$/i.test(path)){headers['Accept-Ranges']='bytes';if(req.headers.range){const range=parseMediaRange(req.headers.range,data.length);if(!range){res.writeHead(416,{'Content-Range':`bytes */${data.length}`});res.end();return;}headers['Content-Range']=`bytes ${range.start}-${range.end}/${data.length}`;headers['Content-Length']=range.end-range.start+1;res.writeHead(206,headers);res.end(req.method==='HEAD'?null:data.subarray(range.start,range.end+1));return;}}res.writeHead(200,headers);res.end(req.method==='HEAD'?null:data);return;}catch{res.writeHead(404);res.end('Tidak ditemui');return;}}
 res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch{res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:false,error:'Ralat pelayan setempat.'}));}});
 await new Promise((yes,no)=>{server.once('error',no);server.listen(port,'127.0.0.1',yes);});return{server,origin,close:()=>new Promise(resolve=>server.close(resolve))};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===resolve(process.argv[1])){let simulator=null;if(process.env.PBD_SIMULATION==='1'){const{createAppsScriptSimulator}=await import('../tests/helpers/apps-script-simulator.mjs');simulator=await createAppsScriptSimulator();}const{origin}=await createPbdServer({simulator,port:Number(process.env.PBD_PORT)||4180});console.log(`Pelayan setempat ${origin} — ${simulator?'SIMULASI, bukan Google Sheets':'konfigurasi sebenar jika disediakan; tiada hosting deployment'}`);}
