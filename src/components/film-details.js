import moment from "moment";

import AbstractComponet from "./abstract-component";
import {formatDuration} from "../utils";

export default class FilmDetails extends AbstractComponet {
  constructor(film) {
    super();
    this._film = film;
    this._title = film.title;
    this._originalTitle = film.originalTitle;
    this._director = film.director;
    this._writers = film.writers;
    this._actors = film.actors;
    this._poster = film.poster;
    this._rating = film.rating;
    this._created = film.created;
    this._duration = film.duration;
    this._country = film.country;
    this._genres = film.genres;
    this._description = film.description;
    this._isAddedToWatchlist = film.isAddedToWatchlist;
    this._isFavorite = film.isFavorite;
    this._isWatched = film.isWatched;
    this._personalRating = film.personalRating;
  }

  getTemplate() {
    return `<section class="film-details">
              <form class="film-details__inner" action="" method="get">
                <div class="form-details__top-container">
                  <div class="film-details__close">
                    <button class="film-details__close-btn" type="button">close</button>
                  </div>
                  <div class="film-details__info-wrap">
                    <div class="film-details__poster">
                      <img class="film-details__poster-img" src="${this._poster}" alt="">

                      <p class="film-details__age">18+</p>
                    </div>

                    <div class="film-details__info">
                      <div class="film-details__info-head">
                        <div class="film-details__title-wrap">
                          <h3 class="film-details__title">${this._title}</h3>
                          <p class="film-details__title-original">Original: ${this._originalTitle}</p>
                        </div>

                        <div class="film-details__rating">
                          <p class="film-details__total-rating">${this._rating}</p>
                          ${this._isWatched && this._personalRating ? `<p class="film-details__user-rating">Your rate ${this._personalRating}</p>` : ``}

                        </div>
                      </div>

                      <table class="film-details__table">
                        <tr class="film-details__row">
                          <td class="film-details__term">Director</td>
                          <td class="film-details__cell">${this._director}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Writers</td>
                          <td class="film-details__cell">${this._writers.join(`, `)}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Actors</td>
                          <td class="film-details__cell">${this._actors.join(`, `)}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Release Date</td>
                          <td class="film-details__cell">${moment(this._created).format(`D MMMM YYYY`)}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Runtime</td>
                          <td class="film-details__cell">${formatDuration(this._duration).h}h ${formatDuration(this._duration).m}m</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Country</td>
                          <td class="film-details__cell">${this._country}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Genres</td>
                          <td class="film-details__cell">
                            ${[...this._genres].map((genre) => `<span class="film-details__genre">${genre}</span>`).join(` `)}
                          </td>
                        </tr>
                      </table>

                      <p class="film-details__film-description">
                        ${this._description}
                      </p>
                    </div>
                  </div>

                  <section class="film-details__controls">
                    <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"
                    ${this._isAddedToWatchlist ? `checked` : ``}
                    >
                    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"
                    ${this._isWatched ? `checked` : ``}
                    >
                    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"
                    ${this._isFavorite ? `checked` : ``}
                    >
                    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                  </section>
                </div>

                <div class="form-details__middle-container"></div>

                <div class="form-details__bottom-container"></div>`;
  }

}
