import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {render} from "../utils";

export default class CardController {
  constructor(container, film, comments, onDataChange, onViewChange, onFilmDetailsOpen, showDetails) {
    this._container = container;
    this._film = film;
    this._comments = comments;
    this._card = new FilmCard(this._film, this._comments);
    this._cardDetails = new FilmDetails(this._film);
    this._showDetails = showDetails;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onFilmDetailsOpen = onFilmDetailsOpen;

    this._onEscKeydown = this._onEscKeydown.bind(this);
    this.setDefaultView = this.setDefaultView.bind(this);
  }

  init() {
    const filmUpdated = Object.assign({}, this._film);
    render(this._container, this._card.getElement());

    if (this._showDetails && !document.body.contains(document.querySelector(`.film-details`))) {
      this._cardDetails.getElement().style.animationDuration = `0s`;
      this.showCardDetails();
    }

    this._card.getElement()
      .addEventListener(`click`, (evt) => {

        if (evt.target.classList.contains(`film-card__title`) ||
          evt.target.classList.contains(`film-card__comments`) ||
          evt.target.classList.contains(`film-card__poster`)) {

          this._onViewChange();
          this.showCardDetails();
          this._onFilmDetailsOpen(this._film);

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
            this._onDataChange(filmUpdated, this._film);

          } else if (classList
            .contains(`film-card__controls-item--mark-as-watched`)) {

            classList.toggle(`film-card__controls-item--active`);
            filmUpdated.isWatched = !filmUpdated.isWatched;
            this._onDataChange(filmUpdated, this._film);

          } else if (classList
            .contains(`film-card__controls-item--favorite`)) {

            classList.toggle(`film-card__controls-item--active`);
            filmUpdated.isFavorite = !filmUpdated.isFavorite;
            this._onDataChange(filmUpdated, this._film);

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
            this._onDataChange(filmUpdated, this._film);
            this._cardDetails.removeElement();

          } else if (evt.target.getAttribute(`for`) === `watched`) {

            filmUpdated.isWatched = !filmUpdated.isWatched;
            this._onDataChange(filmUpdated, this._film);
            this._cardDetails.removeElement();

          } else if (evt.target.getAttribute(`for`) === `favorite`) {

            filmUpdated.isFavorite = !filmUpdated.isFavorite;
            this._onDataChange(filmUpdated, this._film);
            this._cardDetails.removeElement();
          }
        });
      });
  }

  showCardDetails() {

    render(document.querySelector(`body`), this._cardDetails.getElement());
    document.addEventListener(`keydown`, this._onEscKeydown);

    this._cardDetails.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
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

  _onEscKeydown(evt) {

    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this._onFilmDetailsOpen();

      this._cardDetails.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscKeydown);
    }
  }

  setDefaultView() {
    if (document.body.contains(this._cardDetails.getElement())) {
      this._cardDetails.removeElement();
      document.removeEventListener(`keydown`, this._onEscKeydown);

      this._onFilmDetailsOpen();
    }
  }

}
