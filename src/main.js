import Search from './components/search';
import Profile from './components/profile';
import {render} from './utils';
import PageController from './controllers/page-controller';
import API from './api';
import Provider from "./provider";
import Store from "./store";

const AUTHORIZATION = `Basic sdfasdf0yq34`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;
const FILMS_STORE_KEY = `cinemaaddict-films-store`;
const COMMENTS_STORE_KEY = `cinemaaddict-comments-store`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const filmsStore = new Store({storage: window.localStorage, key: FILMS_STORE_KEY});
const commentsStore = new Store({storage: window.localStorage, key: COMMENTS_STORE_KEY});
const provider = new Provider({api, filmsStore, commentsStore});

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, new Search().getElement());
provider.getFilms().then((films) => {
  const user = {
    moviesWatched: films.reduce((total, film) => {
      return film.isWatched ? ++total : total;
    }, 0)
  };

  render(header, new Profile(user).getElement());
  const pageController = new PageController(main, films);
  pageController.init();
});

window.addEventListener(`offline`, () => {
  document.title = `${document.title}-[OFFLINE]`;
});

window.addEventListener(`online`, () => {
  document.title = document.title.split(`-`)[0];

  provider.syncFilms();
});
export {provider};
