this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('remember-v2').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/bundle.js'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});