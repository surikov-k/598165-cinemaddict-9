import {createElement} from '../utils';
import FilmsList from './films-list';
import {render} from '../utils';
import FilmsListExtra, {filmsListType} from './films-list-extra';

export default class FilmsSection {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
      render(this._element, new FilmsList().getElement());
      render(this._element, new FilmsListExtra(filmsListType.TOP_RATED).getElement());
      render(this._element, new FilmsListExtra(filmsListType.MOST_COMMENTED).getElement());
    }
    return this._element;
  }

  _getTemplate() {
    return `<section class="films"></section>`;
  }


}

// state.movies.slice(state.cardsDisplayed, state.cardsDisplayed + CARDS_PER_CLICK).map((movie) => {
//     return new FilmCard(movie).getElement();
//   }).join(``);
