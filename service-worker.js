const CACHE='nutritrack-v2-settings-privacy-v10';const OFFLINE='/offline.html';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.add(OFFLINE)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))]));});
self.addEventListener('fetch',event=>{const req=event.request;if(req.mode!=='navigate')return;event.respondWith(fetch(req).catch(async()=>await caches.match(OFFLINE)||new Response('Offline',{status:503})));});
