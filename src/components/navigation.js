import AbstractComponet from "./abstract-component";
export default class Navigation extends AbstractComponet {
  constructor(films) {
    super();
    this._films = films;
  }

  hide() {
    this.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this.getElement().classList.remove(`visually-hidden`);
  }

  getTemplate() {
    const filters = [
      {
        name: `Watchlist`,
        count: this._films.filter((film) => film.isAddedToWatchlist).length
      },
      {
        name: `History`,
        count: this._films.filter((film) => film.isWatched).length
      },
      {
        name: `Favorites`,
        count: this._films.filter((film) => film.isFavorite).length
      },
    ];

    return `<nav class="main-navigation">
            <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
            ${filters.map(this._getFilterTemplate).join(``)}
              <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
            </nav>`;
  }

  _getFilterTemplate(filter) {
    return `<a href="#${filter.name.toLowerCase()}" class="main-navigation__item">${filter.name}
              <span class="main-navigation__item-count">${filter.count}</span>
              </a>`;
  }

  update() {
    this.getElement()
      .querySelector(`[href="#watchlist"]`)
      .querySelector(`.main-navigation__item-count`)
      .innerText = this._films.filter((film) => film.isAddedToWatchlist).length;

    this.getElement()
      .querySelector(`[href="#history"]`)
      .querySelector(`.main-navigation__item-count`)
      .innerText = this._films.filter((film) => film.isWatched).length;

    this.getElement()
      .querySelector(`[href="#favorites"]`)
      .querySelector(`.main-navigation__item-count`)
      .innerText = this._films.filter((film) => film.isFavorite).length;
  }
}
