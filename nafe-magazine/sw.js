/* عامل الخدمة: يخزّن المجلة وملفاتها ليعمل كل شيء دون إنترنت */
const V='nafe-v12';
const CORE=['./','index.html','nafe-digital-magazine.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
const MEDIA=['media/umrah.mp4','media/umrah2.mp4','media/hajj.mp4','media/hajj2.mp4','media/annual-report-2025.pdf','media/annual-report-2024.pdf','media/report-2026-h1.pdf'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(CORE);await Promise.all(MEDIA.map(u=>c.add(u).catch(()=>{})));self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;
  e.respondWith((async()=>{const c=await caches.open(V);let r=await c.match(req.url,{ignoreSearch:true});
    if(!r){try{const n=await fetch(req);if(n.ok&&n.status===200&&!req.headers.get('range'))c.put(req.url,n.clone());return n}catch(_){return new Response('offline',{status:503})}}
    const rg=req.headers.get('range');
    if(rg&&r.status===200){const b=await r.blob(),m=/bytes=(\d*)-(\d*)/.exec(rg),s=m&&m[1]?+m[1]:0,en=m&&m[2]?Math.min(+m[2],b.size-1):b.size-1;
      return new Response(b.slice(s,en+1),{status:206,headers:{'Content-Type':r.headers.get('Content-Type')||'video/mp4','Content-Range':`bytes ${s}-${en}/${b.size}`,'Content-Length':String(en-s+1),'Accept-Ranges':'bytes'}})}
    return r})())});
