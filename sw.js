const CACHE = 'dingledger-v3';

const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.png',
  './logo-splash.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(
        cached => cached || fetch(event.request)
      )
    );
  }
});
