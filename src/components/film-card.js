import AbstractComponet from "./abstract-component";

export default class FilmCard extends AbstractComponet {
  constructor(film, comments) {
    super();
    this._film = film;
    this._title = film.title;
    this._poster = film.poster;
    this._rating = film.rating;
    this._created = film.created;
    this._duration = film.duration;
    this._genres = film.genres;
    this._description = film.description;
    this._isAddedToWatchlist = film.isAddedToWatchlist;
    this._isFavorite = film.isFavorite;
    this._isWatched = film.isWatched;
    this._comments = comments.filter((comment) => comment.filmTitle === this._title).length;
  }

  getTemplate() {
    return `<article class="film-card">
            <h3 class="film-card__title">${this._title}</h3>
            <p class="film-card__rating">${this._rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${this._created.getFullYear()}</span>
              <span class="film-card__duration">${this._duration}</span>
              <span class="film-card__genre">${[...this._genres][0]}</span>
            </p>
            <img src="${this._poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${this._tuncateDescription()}</p>
            <a class="film-card__comments">${this._comments} comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isAddedToWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
            </form>
          </article>`;
  }

  _tuncateDescription() {
    if (this._description.length <= 140) {
      return this._description;
    } else {
      return this._description.slice(0, 139) + `&hellip;`;
    }
  }

}

