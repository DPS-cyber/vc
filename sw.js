const CACHE_NAME = 'vintage-cam-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

// We add icons separately so they don't break the whole cache if missing
const OPTIONAL_ASSETS = [
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(ASSETS);
      // Try to cache icons but don't fail if they aren't there yet
      OPTIONAL_ASSETS.forEach(asset => {
        fetch(asset).then(res => {
          if (res.ok) cache.add(asset);
        }).catch(() => { });
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
