importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.1.0/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
  [
    { url: "/", revision: "2" },
    { url: "/index.html", revision: "2" },
    { url: "/nav.html", revision: "2" },
    { url: "/team.html", revision: "2" },
    { url: "/views/viewHtml.js", revision: "2" },
    { url: "/images/1196255477.jpg", revision: "2" },
    { url: "/images/1197169501.jpg", revision: "2" },
    { url: "/images/1255622534.jpg", revision: "2" },
    { url: "/images/2042225788.JPG", revision: "2" },
    { url: "/images/maskable_icon2.png", revision: "2" },
    { url: "/manifest.json", revision: "2" },
  ],
  {
    ignoreURLParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  new RegExp("/css/"),
  workbox.strategies.cacheFirst({
    cacheName: "css",
  })
);

workbox.routing.registerRoute(
  new RegExp("/js/"),
  workbox.strategies.cacheFirst({
    cacheName: "js",
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|JPG|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp("https://crests.football-data.org"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp("/team.html?id="),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "teamById",
  })
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Menyimpan cache untuk file jquery selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/code\.jquery\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "jquery-js",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Menyimpan cache untuk file moment selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/cdnjs\.cloudflare\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "moment-js",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "/images/logo2.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Premier League Notifications", options)
  );
});
