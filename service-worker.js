// PixelProTech Document Engine — service worker
// Strategy: cache the app shell on install, then serve cached files first
// and update the cache in the background whenever the network is available.
// CDN libraries (pdf-lib, mammoth, xlsx, jszip, pdf.js, pdf-encrypt-lite) are
// cached the first time they're fetched, so the app keeps working offline on
// repeat visits — but the very first visit needs an internet connection.

const CACHE_NAME = 'pixelprotech-doc-engine-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request)
        .then(response => {
          // Only cache successful, cacheable responses (skips opaque errors)
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached); // offline and not cached yet → nothing we can do for this request

      // Serve cached immediately if we have it, still refresh in background;
      // otherwise wait on the network.
      return cached || networkFetch;
    })
  );
});
