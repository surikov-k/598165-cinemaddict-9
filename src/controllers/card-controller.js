import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {render} from "../utils";

export default class CardController {
  constructor(container, data) {
    this._container = container;
    this._card = new FilmCard(data);
    this._cardDetails = new FilmDetails(data);

    this._onEscKeydown = this._onEscKeydown.bind(this);
  }

  init() {
    render(this._container, this._card.getElement());

    this._card.getElement()
      .addEventListener(`click`, () => {
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
            this._cardDetails.removeElement();
          });
      });
  }

  _onEscKeydown(evt) {
    evt.preventDefault();

    if (evt.key === `Esc` || evt.key === `Escape`) {
      this._cardDetails.removeElement();
      document.removeEventListener(`keydown`, this._onEscKeydown);
    }
  }
}
