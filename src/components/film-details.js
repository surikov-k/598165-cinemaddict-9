import AbstractComponet from "./abstract-component";
import UserRating from "./user-rating";
import {render} from "../utils";

export default class FilmDetails extends AbstractComponet {
  constructor(film) {
    super();
    this._film = film;
    this._title = film.title;
    this._originalTitle = film.originalTitle;
    this._director = film.director;
    this._writres = film.writres;
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

    this._userRating = new UserRating(this._film);

    this._subscribeToEvents();
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
                        </div>
                      </div>

                      <table class="film-details__table">
                        <tr class="film-details__row">
                          <td class="film-details__term">Director</td>
                          <td class="film-details__cell">${this._director}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Writers</td>
                          <td class="film-details__cell">${this._writres.join(`, `)}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Actors</td>
                          <td class="film-details__cell">${this._actors.join(`, `)}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Release Date</td>
                          <td class="film-details__cell">${this._created.toDateString()}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Runtime</td>
                          <td class="film-details__cell">${this._duration}</td>
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

                <div class="form-details__bottom-container">
                  <section class="film-details__comments-wrap">
                    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">0</span></h3>

                    <ul class="film-details__comments-list"></ul>

                    <div class="film-details__new-comment">
                      <div for="add-emoji" class="film-details__add-emoji-label">
                        <img src="images/emoji/smile.png" width="55" height="55" alt="emoji">
                      </div>

                      <label class="film-details__comment-label">
                        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
                      </label>

                      <div class="film-details__emoji-list">
                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping" checked>
                        <label class="film-details__emoji-label" for="emoji-smile">
                          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                        </label>

                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                        <label class="film-details__emoji-label" for="emoji-sleeping">
                          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                        </label>

                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                        <label class="film-details__emoji-label" for="emoji-gpuke">
                          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                        </label>

                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                        <label class="film-details__emoji-label" for="emoji-angry">
                          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                        </label>
                      </div>
                    </div>
                  </section>
                </div>
              </form>
            </section>`;
  }

  _subscribeToEvents() {
    this._showUserRating();
    this._changeImoji();
  }

  _showUserRating() {
    if (this._isWatched) {
      render(this.getElement().querySelector(`.form-details__middle-container`), this._userRating.getElement());
    }
  }

  _changeImoji() {
    const addEmojiLabel = this.getElement()
      .querySelector(`.film-details__add-emoji-label img`);


    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `INPUT`) {
          switch (evt.target.id) {
            case `emoji-smile`:
              addEmojiLabel.src = `images/emoji/smile.png`;
              break;
            case `emoji-sleeping`:
              addEmojiLabel.src = `images/emoji/sleeping.png`;
              break;
            case `emoji-gpuke`:
              addEmojiLabel.src = `images/emoji/puke.png`;
              break;
            case `emoji-angry`:
              addEmojiLabel.src = `images/emoji/angry.png`;
              break;
          }
        }
      });
  }
}
