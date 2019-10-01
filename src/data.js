const TOTAL_MOVIES = Math.round(Math.random() * 10 + 10);
const TOTAL_COMMENTS = Math.round(Math.random() * 100 + 10);
const CINEMA_EPOCH_STARTED = `1900-1-1`;
const SERVICE_STARTED = `2018-1-1`;

export const EmotionType = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
  src: {
    'smile': `images/emoji/smile.png`,
    'sleeping': `images/emoji/sleeping.png`,
    'puke': `images/emoji/puke.png`,
    'angry': `images/emoji/angry.png`,
  }
};

const emotions = [EmotionType.SMILE, EmotionType.SLEEPING, EmotionType.PUKE, EmotionType.ANGRY];

const firstNames = [
  `Anthony`, `Anne`, `Heinz`, `Richard`, `Erich`, `Mary Beth`, `Dan`, `Tim`, `John`
];

const commentsText = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const secondNames = [
  `Mann`,
  `Wigton`,
  `Herald`,
  `Weil`,
  `von Stroheim`,
  `Hughes`,
  `Duryea`,
  `Macoveev`,
  `Doe`
];

const filmTitles = [
  `Made for Each Other`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `Sagebrush trail`,
  `Santa Claus Conquers the Martians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The Man with the Golden Arm`
];

const filmPosterURLs = [
  `images/posters/made-for-each-other.png`,
  `images/posters/popeye-meets-sinbad.png`,
  `images/posters/sagebrush-trail.jpg`,
  `images/posters/santa-claus-conquers-the-martians.jpg`,
  `images/posters/the-dance-of-life.jpg`,
  `images/posters/the-great-flamarion.jpg`,
  `images/posters/the-man-with-the-golden-arm.jpg`
];

const descriptionPhrases = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, nporta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const genres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
];

const countries = [`USA`, `France`, `Italy`, `Russia`];

export const user = {
  moviesWatched: Math.round(Math.random() * 30),
};

const getRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

const getRandomDate = (inception) => {
  const start = new Date(inception);
  const current = new Date();
  return new Date(Math.round(Math.random() * (current.getTime() - start.getTime() + start.getTime())));
};

const getRandomPerson = () => {
  return `${getRandomFromArray(firstNames)} ${getRandomFromArray(secondNames)}`;
};

const formatDuration = (duration) => {
  const hours = parseInt(duration / 60, 10);
  return `${hours}h ${duration - hours * 60}m`;
};

const getFilm = () => {
  return {
    id: 0,
    title: getRandomFromArray(filmTitles),
    comments: new Array(Math.round(Math.random() * 5)).fill(``).map(() => getRandomFromArray(comments).id),
    get originalTitle() {
      let title = [...this.title.toLowerCase()].reverse().join(``);
      title = title.split(` `).map((word) => {
        if (word.length > 3) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      });
      return title.join(` `);
    },
    set originalTitle(value) {
      return value;
    },
    director: getRandomPerson(),
    writres: new Array(Math.floor(Math.random() * 2 + 1)).fill(``).map(() => getRandomPerson()),
    actors: new Array(Math.floor(Math.random() * 4 + 2)).fill(``).map(() => getRandomPerson()),
    poster: getRandomFromArray(filmPosterURLs),
    rating: parseFloat(Math.random() * 8 + 1).toFixed(1),
    ageRating: Math.round(Math.random() * 18),
    created: getRandomDate(CINEMA_EPOCH_STARTED),
    duration: formatDuration(Math.round(Math.random() * 120 + 60)),
    country: getRandomFromArray(countries),
    genres: new Set(shuffleArray(genres).slice(0, Math.floor(Math.random() * 2 + 1))),
    description: shuffleArray(descriptionPhrases).slice(0, Math.floor(Math.random() * 5 + 1)).join(` `),
    isAddedToWatchlist: Boolean(Math.round(Math.random())),
    isFavorite: Boolean(Math.round(Math.random())),
    isWatched: false,
    personalRating: 0,
  };
};

const getComment = () => {
  return {
    id: 0,
    text: getRandomFromArray(commentsText),
    user: getRandomPerson(),
    created: getRandomDate(SERVICE_STARTED),
    emotion: getRandomFromArray(emotions)
  };
};

export const getFilms = () => {
  const films = new Array(TOTAL_MOVIES).fill(``).map(getFilm);
  films.forEach((film, i) => {
    film.id = i;
  });
  return films;
};

const getComments = () => {
  const comments = new Array(TOTAL_COMMENTS).fill(``).map(getComment);
  comments.forEach((comment, i) => {
    comment.id = i;
  });
  return comments;
};

export const comments = getComments();

export const moviesInside = Math.round(Math.random * 200000 + 50000);


