import {createElement, render} from "../utils";
import {state, CARDS_PER_CLICK} from '../main';
import FilmCard from "./film-card";
import ShowMore from './show-more';

export default class FilmsList {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      const filmsListContainer = this._element.querySelector(`.films-list__container`);

      this.showCards(filmsListContainer);

      const showMore = new ShowMore();
      render(this._element, showMore.getElement());

      showMore.getElement().addEventListener(`click`, () => {
        this.showCards(filmsListContainer);
        if (state.cardsDisplayed >= state.films.length) {
          showMore.getElement().remove();
        }
      });
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  showCards(container) {
    state.films.slice(state.cardsDisplayed, state.cardsDisplayed + CARDS_PER_CLICK).forEach((film) => {
      const filmCard = new FilmCard(film);
      render(container, filmCard.getElement());

    });
    state.cardsDisplayed = state.cardsDisplayed + CARDS_PER_CLICK;
  }

  getTemplate() {
    return `<section class="films-list">
              <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
              <div class="films-list__container"></div>
            </section>`;
  }
}

