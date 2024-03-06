const cacheName = "jsOclockPWA-v1";
const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/style.css",
  "/component/clock.js",
  "/img/clock32.svg",
  "/img/clock64.svg",
  "/img/clock96.svg",
  "/img/clock128.svg",
  "/img/clock144.svg",
  "/img/clock168.svg",
  "/img/clock192.svg",
  "/img/clock256.svg",
  "/img/clock512.svg",
  "/img/clock192.png",
  "/img/clock512.png",
  "/img/screenshot1.png",
  "/img/screenshot2.png"
];

self.addEventListener("install", (e) => {
  console.log("Service Worker : Installed!");

  e.waitUntil(
    (async () => {
      try {
        cacheName = await caches.open(cache);
        cacheName.addAll(assets);
      } catch {
        console.log("error occured while caching...");
      }
    })()
  );
});

// Fetching content using Service Worker
self.addEventListener("fetch", (e) => {
  // Cache http and https only, skip unsupported chrome-extension:// and file://...
  if (
    !(e.request.url.startsWith("http:") || e.request.url.startsWith("https:"))
  ) {
    return;
  }

  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});