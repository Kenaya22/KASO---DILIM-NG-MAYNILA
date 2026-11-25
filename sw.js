/* Kaso: Dilim ng Maynila — offline cache. Palitan ang VERSION tuwing may bagong release. */
const VERSION = 'kaso-v4';
const FILES = ['./', './index.html', './manifest.json', './css/style.css', './js/art.js', './js/art2.js', './js/art3.js', './js/cases.js', './js/cases2.js', './js/cases3.js', './js/lang.js', './js/lang-en1.js', './js/lang-en2.js', './js/lang-en3.js', './js/audio.js', './js/game.js', './assets/cover.jpg', './assets/icon-192.png', './assets/icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then((hit) => {
    const net = fetch(e.request).then((res) => { if (res && res.ok && new URL(e.request.url).origin === location.origin) { const cp = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, cp)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
