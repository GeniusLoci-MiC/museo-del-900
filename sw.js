/* ================================================
   MUSEUM PWA — Service Worker
   Cache-first strategy with cache completion messaging
   ================================================ */

const APP_PREFIX = 'museumguide_';
const VERSION = 'v3';
const CACHE_NAME = APP_PREFIX + VERSION;

const URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './js/app.js',
  './audio/guide-it.mp3',
  './audio/guide-en.mp3',
  './images/museum-logo.png',
  './images/genius-loci-logo.png',
  './images/partner-1.png',
  './images/partner-2.png',
  './images/partner-3.png',
  './images/partner-4.png',
  './images/partner-5.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS))
      .then(() => {
        // Notify all clients that caching is complete
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'CACHE_COMPLETE' });
          });
        });
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key.startsWith(APP_PREFIX)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
