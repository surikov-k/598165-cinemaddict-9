import CardController from "./card-controller";

export default class CardsListController {
  constructor(container, onDataChangeMainController, onViewChangeMainController) {
    this._films = null;
    this._comments = null;
    this._container = container;
    this._onDataChangeMainController = onDataChangeMainController;
    this._onViewChangeMainController = onViewChangeMainController;

    this._subscriptions = [];

    this._onDataChange = this._onDataChange.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
    this._onFilmDetailsOpen = this._onFilmDetailsOpen.bind(this);
  }

  set(films, comments) {
    this._films = films;
    this._comments = comments;
  }

  show() {
    this._container.innerHTML = ``;

    this._films.slice()
      .forEach((film) => {
        this._renderCard(this._container, film, this._comments);
      });
  }

  _renderCard(container, film, comments) {
    const cardController = new CardController(container, film, comments, this._onDataChange, this._onViewChangeMainController, this._onFilmDetailsOpen, film === this._filmDetailsOpen
    );

    this._subscriptions.push(cardController.setDefaultView);
    cardController.init();
  }

  _onDataChange(newData, oldData) {
    const idx = this._films.findIndex((film) => film === oldData);
    Object.assign(this._films[idx], newData);

    if (document.querySelector(`.film-details`)) {
      document.querySelector(`.film-details`).remove();
    }

    this._onDataChangeMainController();

  }

  onViewChange() {
    this._subscriptions.forEach((it) => it());
  }

  _onFilmDetailsOpen(film = null) {
    this._filmDetailsOpen = film;
  }


}
