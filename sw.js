
const cacheName = 'v1';
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
];

/* Call instal event */
self.addEventListener('install', e => {
  console.log('service Worker: registerd');
  e.waitUntil(
    caches.open('cacheName').then(cache => {
      return cache.addAll(cacheFiles);
    })
  );
});
/* Call fetch event */

self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    caches.match(e.request).then(response => {
      if (response) {
        return response;
      }
      else {
        return fetch(e.request)
        .then(response =>{
          const responseCloned = response.clone();
          caches.open('cacheName').then(cache => {
            cache.put(e.request, responseCloned);
          });
          return response;
        })
        .catch(function(err) {
          console.error(err);
        });
      }
    })
  );
});
/* Call activate event */
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  e.waitUntil(
    caches.keys().then(cacheName => {
      return Promise.all(
        cacheName.filter(cacheName => {
          return cacheName.startsWith('') &&
          cacheName !== cacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
