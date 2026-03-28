const CACHE_NAME = 'work-pro-v12';
const ASSETS = [
  './index.html',
  './manifest.json',
  './1000004062.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('firebaseio.com')) {
    return fetch(e.request);
  }
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
