import AbstractComponet from "./abstract-component";
export default class Navigation extends AbstractComponet {
  constructor(films) {
    super();
    this._filters = [
      {
        name: `Watchlist`,
        count: films.filter((film) => film.isAddedToWatchlist).length
      },
      {
        name: `History`,
        count: films.filter((film) => film.isWatched).length
      },
      {
        name: `Favorites`,
        count: films.filter((film) => film.isFavorite).length
      },
    ];
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
