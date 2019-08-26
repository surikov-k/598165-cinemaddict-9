import Search from './components/search';
import Profile from './components/profile';
import Navigation from './components/navigation';
import Sorting from './components/sorting';
import FilmsSection from './components/films-section';

import {user, getFilms, getComments} from './data';
import {render} from './utils';

export const CARDS_PER_CLICK = 5;
const initalState = {
  cardsDisplayed: 0,
  movies: [],
  comments: []
};

export const state = Object.assign({}, initalState);

state.movies = getFilms();
state.comments = getComments();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);


render(header, new Search().getElement());
render(header, new Profile(user).getElement());
render(main, new Navigation().getElement());
render(main, new Sorting().getElement());
render(main, new FilmsSection().getElement());

