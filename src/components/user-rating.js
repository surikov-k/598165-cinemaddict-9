import AbstractComponet from "./abstract-component";
import {render} from "../utils";

export default class UserRating extends AbstractComponet {
  constructor(film, onDataChange) {
    super();
    this._film = film;
    this._userRating = film.userRating;
    this._onDataChange = onDataChange;
    this._filmUpdated = Object.assign({}, this._film);

  }

  init(container) {
    render(container, this.getElement());

    this.getElement()
      .querySelector(`.film-details__user-rating-score`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName !== `INPUT`) {
          return;
        }
        this._filmUpdated.userRating = parseInt(evt.target.value, 10);
        this._onDataChange(this._filmUpdated, this._film);
      });

    this.getElement()
      .querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, () => {
        this._filmUpdated.userRating = 0;
        this._onDataChange(this._filmUpdated, this._film);
      });

  }

  getTemplate() {
    return `<section class="film-details__user-rating-wrap">
    <div class="film-details__user-rating-controls">
      <button class="film-details__watched-reset" type="button">Undo</button>
    </div>

    <div class="film-details__user-score">
      <div class="film-details__user-rating-poster">
        <img src="${this._film.poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">${this._film.title}</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            ${new Array(9).fill(``).map((it, i) => {
    return `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i + 1}" id="rating-${i + 1}" ${i + 1 === this._userRating ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-${i + 1}">${i + 1}</label>`;
  })}

            </div>
          </section>
        </div>
      </section>`;
  }

}

