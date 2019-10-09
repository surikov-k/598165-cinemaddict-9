import Search from './components/search';
import Profile from './components/profile';
import {render} from './utils';
import PageController from './controllers/page-controller';
import API from './api';

const AUTHORIZATION = `Basic sdfasdf0yq34`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, new Search().getElement());
api.getFilms().then((films) => {
  const user = {
    moviesWatched: films.reduce((total, film) => {
      return film.isWatched ? ++total : total;
    }, 0)
  };

  render(header, new Profile(user).getElement());
  const pageController = new PageController(main, films);
  pageController.init();
});

export {api};
