/* Kechas Agencies - Service Worker */
const CACHE = "kechas-v3";
const CORE = [
  "./",
  "index.html",
  "about.html",
  "services.html",
  "fleet.html",
  "clients.html",
  "pricing.html",
  "faq.html",
  "locations.html",
  "policies.html",
  "loyalty.html",
  "contact.html",
  "gallery.html",
  "blog.html",
  "styles.css",
  "script.js",
  "manifest.webmanifest",
  "offline.html",
  "assets/images/kechas_logo_BADGE_transparent_2x.png",
  "assets/images/kechas_logo_FULL_transparent_2x.png",
  "assets/images/favicon-32.png",
  "assets/images/favicon-192.png",
  "assets/images/favicon-512.png",
  "assets/stock/chauffeur_pickup.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k)))))
      .then(self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Navigation: network-first, fallback to cache/offline
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(async () => (await caches.match(req)) || (await caches.match("offline.html")))
    );
    return;
  }

  // Static assets: cache-first, then network
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => cached);
    })
  );
});
