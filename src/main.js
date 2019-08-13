import {getSearchTemplate} from './components/search';
import {getProfileTemplate} from './components/profile';
import {getNavigationTemplate} from './components/navigation';
import {getSortTemplate} from './components/sorting';
import {getFilmsTemplate} from './components/films';
import {getFilmCardTemplate} from './components/film-card';
import {getShowMoreTemplate} from './components/show-more';

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};


render(header, getSearchTemplate());
render(header, getProfileTemplate());
render(main, getNavigationTemplate());
render(main, getSortTemplate());
render(main, getFilmsTemplate());

const films = document.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = films.querySelector(`.films-list__container`);
for (let i = 0; i < 5; i++) {
  render(filmsListContainer, getFilmCardTemplate());
}
render(filmsList, getShowMoreTemplate());

const filmsListExtra = films.querySelectorAll(`.films-list--extra`);
const [topRatedList, mostCommentedList] = filmsListExtra;
const topRatedListContainer = topRatedList.querySelector(`.films-list__container`);
const mostCommentedListContainer = mostCommentedList.querySelector(`.films-list__container`);
for (let i = 0; i < 2; i++) {
  render(topRatedListContainer, getFilmCardTemplate());
}
for (let i = 0; i < 2; i++) {
  render(mostCommentedListContainer, getFilmCardTemplate());
}

