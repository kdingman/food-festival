const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
  ];

self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) { // to determine if the resource already exists in caches
            if (request) {
                console.log('responding with cache : ' + e.request.url)
                return request
            }
            else { // if there are no cache, try fetching request
                consosle.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            } // You can omit if/else for console.log and put one line below like this
            // return request || fetch(e.request)
        })
    )
})

self.addEventListener('install', function (e) {
    e.waitUntil( // used to tell the browser to wait until the work is complete before terminating the service worker
        caches.open(CACHE_NAME).then(function (cache) { // caches.open finds the specific cache by name
            console.log('installing cache : ' + CACHE_NAME) // then add every file in the FILES to CACHE array to the cache
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) { // keys() returns an array of all cache names
            let cacheKeeplist = keyList.filter(function (key) { //keyList is a parameter that contains all cache names
                return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function(key, i) {
                    if (cacheKeeplist.indexOf(key) === -1 ) {
                        console.log('deleting cache : ' + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                })
            );
        })
    );
});