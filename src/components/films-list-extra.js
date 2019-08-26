import {state} from '../main';
import FilmCard from './film-card';
import {createElement, render} from '../utils';

export const filmsListType = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`
};

export default class FilmsListExtra {
  constructor(filmsListTitle) {
    this._filmsListTitle = filmsListTitle;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      const filmListContainer = this._element.querySelector(`.films-list__container`);

      if (this._filmsListTitle === filmsListType.TOP_RATED) {

        const [firstFilm, secondFilm] = this._getTwoMostRated();
        render(filmListContainer, new FilmCard(firstFilm).getElement());
        render(filmListContainer, new FilmCard(secondFilm).getElement());
      }
      if (this._filmsListTitle === filmsListType.MOST_COMMENTED) {
        const [firstFilm, secondFilm] = this._getTwoMostCommented();
        render(filmListContainer, new FilmCard(firstFilm).getElement());
        render(filmListContainer, new FilmCard(secondFilm).getElement());
      }
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="films-list--extra">
              <h2 class="films-list__title">${this._filmsListTitle}</h2>
              <div class="films-list__container">
              </div>
            </section>`;
  }

  _getTwoMostRated() {
    return state.films.slice().sort((a, b) => {
      return b.rating - a.rating;
    }).slice(0, 2);
  }

  _getTwoMostCommented() {
    return state.films.slice().sort((a, b) => {
      return FilmCard.calculateComments(b.title, state.comments) - FilmCard.calculateComments(a.title, state.comments);
    }).slice(0, 2);
  }
}
