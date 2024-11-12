const CACHE_NAME = 'my-blog-cache-v1';
const urlsToCache = [
    '/',
    '/manifest.json',
    '/icon-144x144.png',
    '/icon-192x192.png',
    '/icon-512x512.png'
];

self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});

// Push notification support
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/icon-192x192.png',
        badge: '/icon-144x144.png'
    };

    event.waitUntil(
        self.registration.showNotification('My Next.js Blog', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
