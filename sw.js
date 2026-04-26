/* ── Verb Flashcards — Service Worker ── */
const CACHE = "vfc-v1";
const PRECACHE = ["./", "./index.html", "./app.js", "./styles.css", "./manifest.webmanifest"];

/* Install: pre-cache shell assets */
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

/* Activate: remove old caches */
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Fetch: cache-first for same-origin, network-first for external (fonts, GIPHY) */
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin) {
    /* External: try network, ignore errors */
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        /* Cache successful GET responses */
        if (res && res.status === 200 && e.request.method === "GET") {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    }).catch(() => {
      /* Offline fallback for navigation requests */
      if (e.request.mode === "navigate") {
        return caches.match("./index.html");
      }
    })
  );
});