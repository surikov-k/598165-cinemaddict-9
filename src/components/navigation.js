import {createElement} from "../utils";
import {state} from '../main';

export default class Navigation {
  constructor() {
    this._filters = [
      {
        name: `Watchlist`,
        count: state.films.filter((movie) => movie.isAddedToWatchlist).length
      },
      {
        name: `History`,
        count: state.films.filter((movie) => movie.isWatched).length
      },
      {
        name: `Favorites`,
        count: state.films.filter((movie) => movie.isFavorite).length
      },
    ];
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<nav class="main-navigation">
            <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
            ${this._filters.map(this._getFilterTemplate).join(``)}
              <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
            </nav>`;
  }

  _getFilterTemplate(filter) {
    return `<a href="#${filter.name.toLowerCase()}" class="main-navigation__item">${filter.name}
              <span class="main-navigation__item-count">${filter.count}</span>
              </a>`;
  }
}
