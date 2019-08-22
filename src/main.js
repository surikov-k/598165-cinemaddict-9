import {getSearchTemplate} from './components/search';
import {getProfileTemplate} from './components/profile';
import {getNavigationTemplate} from './components/navigation';
import {getSortTemplate} from './components/sorting';
import {getFilmsTemplate} from './components/films';
import {getFilmCardsTemplate} from './components/film-cards';
import {getShowMoreTemplate} from './components/show-more';
import {user, getMovies, getComments} from './data';

export const CARDS_PER_CLICK = 5;
export const state = {
  cardsDisplayed: 0
};

const movies = getMovies();
const comments = getComments();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(header, getSearchTemplate());
render(header, getProfileTemplate(user));
render(main, getNavigationTemplate(movies));
render(main, getSortTemplate());
render(main, getFilmsTemplate(movies, comments));

const films = document.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = films.querySelector(`.films-list__container`);

render(filmsListContainer, getFilmCardsTemplate(movies, comments));


render(filmsList, getShowMoreTemplate());
const showMoreButton = document.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  render(filmsListContainer, getFilmCardsTemplate(movies, comments));
  if (state.cardsDisplayed >= movies.length) {
    filmsList.removeChild(showMoreButton);
  }
});
