import CardController from "./card-controller";
import {api} from "../main";
import ModelFilm from "../model-film";

export const ActionType = {
  UPDATE_FILM: `update film`,
  ADD_COMMENT: `add comment`,
  DELETE_COMMENT: `delete comment`
};

export default class CardsListController {
  constructor(container, onDataChangeMainController, onViewChangeMainController) {
    this._films = [];
    this._container = container;
    this._onDataChangeMainController = onDataChangeMainController;
    this._onViewChangeMainController = onViewChangeMainController;

    this._subscriptions = [];

    this._onDataChange = this._onDataChange.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
    this._onFilmDetailsOpen = this._onFilmDetailsOpen.bind(this);
  }

  set(films) {
    this._films = films;

  }

  show() {
    this._container.innerHTML = ``;

    this._films.slice()
      .forEach((film) => {
        this._renderCard(this._container, film);
      });
  }

  onViewChange() {
    this._subscriptions.forEach((it) => it());
  }

  _renderCard(container, film) {
    const cardController = new CardController(container, film, this._onDataChange, this._onViewChangeMainController, this._onFilmDetailsOpen, film === this._filmDetailsOpen);

    this._subscriptions.push(cardController.setDefaultView);
    cardController.init();
  }

  _onDataChange(action, film) {
    let idx = this._films.findIndex((it) => it.id === film.id);

    switch (action) {
      case ActionType.ADD_COMMENT:
        Object.assign(this._films[idx], film);
        if (document.querySelector(`.film-details`)) {
          document.querySelector(`.film-details`).remove();
        }
        this._onDataChangeMainController();
        break;
      case ActionType.UPDATE_FILM:
        api.updateFilm(film.id, ModelFilm.toRaw(film))
          .then((updatedFilm) => {
            Object.assign(this._films[idx], updatedFilm);
            if (document.querySelector(`.film-details`)) {
              document.querySelector(`.film-details`).remove();
            }
            this._onDataChangeMainController();
          });
        break;
    }

    if (document.querySelector(`.film-details`)) {
      document.querySelector(`.film-details`).remove();
    }
  }

  _onFilmDetailsOpen(film = null) {
    this._filmDetailsOpen = film;
  }
}
