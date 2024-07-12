const cacheName = 'jsOclockPWA-v2'

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName)
  await cache.addAll(resources)
}

const putInCache = async (request, response) => {
  const cache = await caches.open(cacheName)
  await cache.put(request, response)
}

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request)
  if (responseFromCache) {
    return responseFromCache
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request.clone())
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone())
    return responseFromNetwork
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl)
    if (fallbackResponse) {
      return fallbackResponse
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable()
  }
}

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload())
})

self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache([
      './sw.js',
      './index.html',
      './assets/css/alarm.css',
      './assets/css/chrono.css',
      './assets/css/style.css',
      './assets/css/timer.css',
      './assets/js/alarm.js',
      './assets/js/chrono.js',
      './assets/js/main.js',
      './assets/js/numerique_clock.js',
      './assets/js/timer.js',
      './assets/js/weather.js',
      './assets/img/clock192.png',
      './assets/img/clock512.png',
      // './assets/icons/*',
      './assets/font/ROBO.ttf',
      './assets/fontAudio/ringtone.mp3',
      // "./img/screenshot1.png",
      // "./img/screenshot2.png",
      // './font/TheBlowar-Regular.ttf',
    ])
  )
})

/* The `self.addEventListener('fetch', (event) => { ... })` code block is setting up a fetch event
listener in the service worker. When a fetch event is triggered (i.e., when a network request is
made), the `cacheFirst` function is called to handle the request. */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: '../../index.html',
    })
  )
})
