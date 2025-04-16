self.addEventListener('install', function(event) {
  console.log('Service Worker Installed');
  // کش کردن فایل‌ها
});

self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ' + event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
