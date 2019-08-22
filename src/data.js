const TOTAL_MOVIES = Math.round(Math.random() * 10 + 10);
const TOTAL_COMMENTS = Math.round(Math.random() * 100 + 10);
const CINEMA_EPOCH_STARTED = `1900-1-1`;
const SERVICE_STARTED = `2018-1-1`;

const UserRating = {
  beginner: `Novice`,
  intermediate: `Fan`,
  advanced: `Movie Buff`
};

const EmotionType = {
  sleeping: `sleeping`,
  neutralFace: `neutral-face`,
  grinning: `grinning`
};

const emotions = [EmotionType.sleeping, EmotionType.neutralFace, EmotionType.grinning];

const userNames = [
  `Tim Macoveev`,
  `John Doe`
];

const movieTitles = [
  `Made for Each Other`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `Sagebrush trail`,
  `Santa Claus Conquers the Martians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The Man with the Golden Arm`
];

const moviePosterURLs = [
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

const movieGenres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
];

export const user = {
  moviesWatched: Math.round(Math.random() * 30),
};

export const getUserRating = (rating) => {
  if (rating <= 10) {
    return UserRating.beginner;
  } else if (rating >= 11 && rating <= 20) {
    return UserRating.intermediate;
  } else if (rating >= 21) {
    return UserRating.advanced;
  } else {
    return undefined;
  }
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
  return new Date(Math.round(Math.random() * (current.getTime() - start.getTime()) + start.getTime()));
};

const getMovie = () => {
  return {
    title: getRandomFromArray(movieTitles),
    poster: getRandomFromArray(moviePosterURLs),
    rating: parseFloat(Math.random() * 8 + 1).toFixed(1),
    created: getRandomDate(CINEMA_EPOCH_STARTED),
    duration: Math.round(Math.random() * 120 + 60),
    genres: new Set(shuffleArray(movieGenres).slice(0, Math.floor(Math.random() * 2 + 1))),
    description: shuffleArray(descriptionPhrases).slice(0, Math.floor(Math.random() * 3 + 1)).join(` `),
    isAddedToWatchlist: Boolean(Math.round(Math.random())),
    isFavorite: Boolean(Math.round(Math.random())),
    isWatched: Boolean(Math.round(Math.random()))
  };
};

const getComment = () => {
  return {
    movieTitle: getRandomFromArray(movieTitles),
    text: getRandomFromArray(descriptionPhrases),
    user: getRandomFromArray(userNames),
    created: getRandomDate(SERVICE_STARTED),
    emotion: getRandomFromArray(emotions)
  };
};

export const getMovies = () => {
  return new Array(TOTAL_MOVIES).fill(``).map(getMovie);
};

export const getComments = () => {
  return new Array(TOTAL_COMMENTS).fill(``).map(getComment);
};

export const moviesInside = Math.round(Math.random * 200000 + 50000);
