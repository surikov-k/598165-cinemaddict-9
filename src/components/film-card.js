import {createElement, render} from "../utils";
import {state} from '../main';
import FilmDetails from "./film-details";

export default class FilmCard {
  constructor(film) {
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

    this._element = null;
  }

  static calculateComments(title) {
    return state.comments.filter((comment) => comment.movieTitle === title).length;
  }

  static formatDuration(duration) {
    const hours = parseInt(duration / 60, 10);
    return `${hours}h ${duration - hours * 60}m`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._element
        .querySelector(`.film-card__poster`)
        .addEventListener(`click`, () => {
          this.onClick();
        });
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  onClick() {
    render(document.querySelector(`body`), new FilmDetails(this._film).getElement());
  }


  getTemplate() {
    return `<article class="film-card">
            <h3 class="film-card__title">${this._title}</h3>
            <p class="film-card__rating">${this._rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${this._created.getFullYear()}</span>
              <span class="film-card__duration">${FilmCard.formatDuration(this._duration)}</span>
              <span class="film-card__genre">${[...this._genres][0]}</span>
            </p>
            <img src="${this._poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${this._tuncateDescription()}</p>
            <a class="film-card__comments">${FilmCard.calculateComments(this._title)} comments</a>
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

