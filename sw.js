// Cambiar VERSION cada vez que se actualicen los datos para que la tablet descargue la nueva versión.
const VERSION = "tucaso-2026-11-25d";
const FILES = ["./","index.html","manifest.webmanifest","fonts/rubik.woff2","fonts/publicsans.woff2",
  "img/logo.png","img/logo-compact.png","img/logo-white.png","img/icon-192.png","img/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, {ignoreSearch:true}).then(r => {
    const net = fetch(e.request).then(res => { if (res.ok) { const cp = res.clone(); caches.open(VERSION).then(c => c.put(e.request, cp)); } return res; }).catch(() => r);
    return r || net;
  }));
});
