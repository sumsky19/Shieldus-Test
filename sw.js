const CACHE='sop-mock-v25-final-real-20261008';
const ASSETS=['./','./index.html','./SKSHIELDUS_MockTest_v25.html','./data.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./skshieldus-logo.png','./sw.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  const dynamic=url.pathname.endsWith('/index.html')||url.pathname.endsWith('/SKSHIELDUS_MockTest_v25.html')||url.pathname.endsWith('/data.js')||url.pathname.endsWith('/sw.js')||url.pathname.endsWith('/');
  if(dynamic){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));}
  else {e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>cached)));}
});
