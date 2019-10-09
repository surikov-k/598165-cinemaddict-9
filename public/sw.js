/* eslint-disable no-console */
const CACHE_NAME = `CINEMA_ADDICT_1.0`;

self.addEventListener(`install`, (evt) => {
  console.log(`sw, install`, {evt});
  evt.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          `./`,
          `./index.html`,
          `./bundle.js`,
          `./css/normalize.css`,
          `./css/main.css`,
          `./images/background.png`,
          `./images/bitmap@2x.png `,
          `./images/bitmap.png`,
          `./images/bitmap@3x.png`,
          `./images/emoji/trophy.png`,
          `./images/emoji/smile.png`,
          `./images/emoji/sleeping.png`,
          `./images/emoji/puke.png`,
          `./images/emoji/angry.png`,
          `./images/icons/icon-watchlist.svg`,
          `./images/icons/icon-watchlist-active.svg`,
          `./images/icons/icon-watched.svg`,
          `./images/icons/icon-watched-active.svg`,
          `./images/icons/icon-favorite.svg`,
          `./images/icons/icon-favorite-active.svg`,
          `./images/posters/the-man-with-the-golden-arm.jpg`,
          `./images/posters/the-great-flamarion.jpg`,
          `./images/posters/the-dance-of-life.jpg`,
          `./images/posters/santa-claus-conquers-the-martians.jpg`,
          `./images/posters/sagebrush-trail.jpg`,
          `./images/posters/popeye-meets-sinbad.png`,
          `./images/posters/made-for-each-other.png`,

        ]);
      })
  );
});

self.addEventListener(`activate`, (evt) => {
  console.log(`sw`, `activate`, {evt});
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
      caches.match(evt.request)
      .then((response) => {
        return response ? response : fetch(evt.request);
      })
      .catch((err) => {
        throw err;
      })
  );
});
