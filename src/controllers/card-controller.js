import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {render} from "../utils";
import UserRating from "../components/user-rating";
import Comments from "../components/comments";
import {provider} from "../main";
import {ActionType} from "./cards-list-controller";

export default class CardController {
  constructor(container, film, onDataChange, onViewChange, onFilmDetailsOpen, showDetails) {
    this._container = container;
    this._film = film;
    this._comments = [];
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._showDetails = showDetails;
    this._onFilmDetailsOpen = onFilmDetailsOpen;

    this._card = new FilmCard(this._film);
    this._cardDetails = new FilmDetails(this._film);
    this._userRating = new UserRating(this._film, this._onDataChange);
    this._commentsSection = new Comments(this._film, this._onDataChange);

    this._onEscKeydown = this._onEscKeydown.bind(this);
    this.setDefaultView = this.setDefaultView.bind(this);
  }

  init() {
    const filmUpdated = Object.assign({}, this._film);
    render(this._container, this._card.getElement());

    if (this._showDetails && !document.body.contains(document.querySelector(`.film-details`))) {
      this._cardDetails.getElement().style.animationDuration = `0s`;
      provider.getComments(this._film.id)
        .then((comments) => {
          this._onViewChange();
          this.showCardDetails(comments);
          this._onFilmDetailsOpen(this._film);
        });
    }

    this._card.getElement()
      .addEventListener(`click`, (evt) => {

        if (evt.target.classList.contains(`film-card__title`) ||
          evt.target.classList.contains(`film-card__comments`) ||
          evt.target.classList.contains(`film-card__poster`)) {

          this._onViewChange();
          provider.getComments(this._film.id)
            .then((comments) => {
              this.showCardDetails(comments);
              this._onFilmDetailsOpen(this._film);
            });
        }
      });

    this._card
      .getElement()
      .querySelectorAll(`.film-card__controls-item `)
      .forEach((it) => {
        it.addEventListener(`click`, (evt) => {
          evt.preventDefault();

          const classList = evt.target.classList;

          if (classList.contains(`film-card__controls-item--add-to-watchlist`)) {

            classList.toggle(`film-card__controls-item--active`);

            filmUpdated.isAddedToWatchlist = !filmUpdated.isAddedToWatchlist;
            this._onDataChange(ActionType.UPDATE_FILM, filmUpdated);

          } else if (classList
            .contains(`film-card__controls-item--mark-as-watched`)) {

            classList.toggle(`film-card__controls-item--active`);
            filmUpdated.isWatched = !filmUpdated.isWatched;
            if (!filmUpdated.isWatched) {
              filmUpdated.personalRating = 0;
              filmUpdated.watchedDate = null;
            } else {
              filmUpdated.watchedDate = new Date();
            }

            this._onDataChange(ActionType.UPDATE_FILM, filmUpdated);

          } else if (classList
            .contains(`film-card__controls-item--favorite`)) {

            classList.toggle(`film-card__controls-item--active`);
            filmUpdated.isFavorite = !filmUpdated.isFavorite;
            this._onDataChange(ActionType.UPDATE_FILM, filmUpdated);

          }
        });
      });

    this._cardDetails
      .getElement()
      .querySelectorAll(`.film-details__control-label`)
      .forEach((it) => {
        it.addEventListener(`click`, (evt) => {

          if (evt.target.getAttribute(`for`) === `watchlist`) {

            filmUpdated.isAddedToWatchlist = !filmUpdated.isAddedToWatchlist;
            this._onDataChange(ActionType.UPDATE_FILM, filmUpdated);
            this._cardDetails.removeElement();

          } else if (evt.target.getAttribute(`for`) === `watched`) {

            filmUpdated.isWatched = !filmUpdated.isWatched;
            if (!filmUpdated.isWatched) {
              filmUpdated.personalRating = 0;
              filmUpdated.watchedDate = null;
            } else {
              filmUpdated.watchedDate = new Date();
            }
            this._onDataChange(ActionType.UPDATE_FILM, filmUpdated);
            this._cardDetails.removeElement();

          } else if (evt.target.getAttribute(`for`) === `favorite`) {

            filmUpdated.isFavorite = !filmUpdated.isFavorite;
            this._onDataChange(ActionType.UPDATE_FILM, filmUpdated);
            this._cardDetails.removeElement();
          }
        });
      });
  }

  showCardDetails(comments) {
    render(document.querySelector(`body`), this._cardDetails.getElement());
    this._commentsSection.init(this._cardDetails.getElement(), comments);

    if (this._film.isWatched) {
      this._userRating
        .init(this._cardDetails.getElement()
          .querySelector(`.form-details__middle-container`));
    }

    document.addEventListener(`keydown`, this._onEscKeydown);

    this._cardDetails.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        this._cardDetails.getElement()
          .querySelector(`.film-details__comment-input`)
          .classList.remove(`connection-error`);
        document.removeEventListener(`keydown`, this._onEscKeydown);
      });

    this._cardDetails.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, this._onEscKeydown);
      });

    this._cardDetails.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        this._cardDetails.getElement().remove();
        this._onFilmDetailsOpen();
      });
  }

  setDefaultView() {
    if (document.body.contains(this._cardDetails.getElement())) {
      this._cardDetails.removeElement();
      document.removeEventListener(`keydown`, this._onEscKeydown);

      this._onFilmDetailsOpen();
    }
  }

  _onEscKeydown(evt) {

    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this._onFilmDetailsOpen();
      this._cardDetails.getElement()
        .querySelector(`.film-details__comment-input`)
        .classList.remove(`connection-error`);

      this._cardDetails.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscKeydown);
    }
  }
}
