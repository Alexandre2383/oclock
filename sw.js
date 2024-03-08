const cacheName = "jsOclockPWA-v1";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request.clone());
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache([
      "./index.html",
      "./app.js",
      "./style.css",
      "./component/clock.js",
      "./img/Pocket_watch.svg",
      "./img/clock32.svg",
      "./img/clock64.svg",
      "./img/clock96.svg",
      "./img/clock128.svg",
      "./img/clock144.svg",
      "./img/clock168.svg",
      "./img/clock192.svg",
      "./img/clock256.svg",
      "./img/clock512.svg",
      "./img/clock192.png",
      "./img/clock512.png",
      "./img/stars_night.jpg",
      "./img/screenshot1.png",
      "./img/screenshot2.png",
      "./font/TheBlowar-Regular.ttf"
    ])
  );
});

/* The `self.addEventListener('fetch', (event) => { ... })` code block is setting up a fetch event
listener in the service worker. When a fetch event is triggered (i.e., when a network request is
made), the `cacheFirst` function is called to handle the request. */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: './index.html',
    })
  );
});