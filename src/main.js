import Search from './components/search';
import Profile from './components/profile';
import Navigation from './components/navigation';
import Sorting from './components/sorting';
import FilmsSection from './components/films-section';
import SearchNoResult from './components/search-no-result';

import {user, getFilms, getComments} from './data';
import {render} from './utils';

export const CARDS_PER_CLICK = 5;
const initalState = {
  cardsDisplayed: 0,
  films: [],
  comments: []
};

export const state = Object.assign({}, initalState);

state.films = getFilms();
state.comments = getComments();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);


render(header, new Search().getElement());
render(header, new Profile(user).getElement());
render(main, new Navigation().getElement());
render(main, new Sorting().getElement());

if (state.films.length) {
  render(main, new FilmsSection().getElement());
} else {
  render(main, new SearchNoResult().getElement());
}

