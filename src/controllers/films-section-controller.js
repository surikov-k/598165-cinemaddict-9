import FilmsSection from "../components/films-section";
import SearchNoResult from "../components/search-no-result";
import {render} from "../utils";
import FilmsList from "../components/films-list";
import FilmsListExtra from '../components/films-list-extra';
import Sorting from "../components/sorting";
import CardsListController from "./cards-list-controller";
import ShowMore from "../components/show-more";


export const FilmsListType = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`
};
const CARDS_PER_CLICK = 5;

export default class FilmsSectonController {
  constructor(container, films, onDataChangePageController) {
    this._container = container;
    this._films = films;
    this._onDataChangePageController = onDataChangePageController;

    this._filmsToDisplay = this._films.slice();
    this._cardsDisplayed = CARDS_PER_CLICK;
    this._sort = new Sorting();
    this._showMore = new ShowMore();
    this._filmsSection = new FilmsSection();
    this._searchNoResults = new SearchNoResult();
    this._filmsList = new FilmsList();
    this._topRated = new FilmsListExtra(FilmsListType.TOP_RATED);
    this._mostCommented = new FilmsListExtra(FilmsListType.MOST_COMMENTED);
    this._filmDetailsOpen = null;
    this._onDataChangeFilmSection = this._onDataChangeFilmSection.bind(this);
    this._onViewChangeMainController =
      this._onViewChangeMainController.bind(this);

    this._mainCardsListController =
      new CardsListController(this._filmsList.getElement()
        .querySelector(`.films-list__container`), this._onDataChangeFilmSection, this._onViewChangeMainController);

    this._topRatedCardListController =
      new CardsListController(this._topRated.getElement()
        .querySelector(`.films-list__container`), this._onDataChangeFilmSection, this._onViewChangeMainController);

    this._mostCommentedCardListController =
      new CardsListController(this._mostCommented.getElement()
        .querySelector(`.films-list__container`), this._onDataChangeFilmSection, this._onViewChangeMainController);

    this._filterState = `#all`;
    this._sortingState = `default`;
  }

  init() {
    if (this._films.length) {

      render(document.querySelector(`.main`), this._sort.getElement());
      this._sort.getElement()
        .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

      render(this._container, this._filmsSection.getElement());
      render(this._filmsSection.getElement(), this._filmsList.getElement());
      this.show();

    } else {
      render(this._container, this._searchNoResults.getElement());
    }
  }

  hide() {
    this._sort.getElement().classList.add(`visually-hidden`);
    this._filmsSection.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._sort.getElement().classList.remove(`visually-hidden`);
    this._filmsSection.getElement().classList.remove(`visually-hidden`);
    this._showMore.removeElement();

    switch (this._filterState) {
      case `#all`:
        this._filmsToDisplay = this._films.slice();
        break;
      case `#watchlist`:
        this._filmsToDisplay = this._films.filter((film) => film.isAddedToWatchlist);
        break;
      case `#history`:
        this._filmsToDisplay = this._films.filter((film) => film.isWatched);
        break;
      case `#favorites`:
        this._filmsToDisplay = this._films.filter((film) => film.isFavorite);
        break;
    }

    switch (this._sortingState) {
      case `date`:
        this._filmsToDisplay.sort((a, b) => b.created - a.created);
        break;
      case `rating`:
        this._filmsToDisplay.sort((a, b) => b.rating - a.rating);
        break;
    }

    if (this._filmsToDisplay.length > this._cardsDisplayed) {
      render(document.querySelector(`.films-list`), this._showMore.getElement());
      this._showMore.getElement().addEventListener(`click`, () => {
        this._cardsDisplayed += CARDS_PER_CLICK;
        this.show();
      });
    }

    this._mainCardsListController.set(this._filmsToDisplay.slice(0, this._cardsDisplayed));
    this._mainCardsListController.show();
    this._showExraSection();
  }

  setFilter(filter) {
    this._filterState = filter;
    this._cardsDisplayed = CARDS_PER_CLICK;
    this.show();
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._sort
      .getElement().querySelectorAll(`.sort__button`)
      .forEach((button) => button.classList.remove(`sort__button--active`));
    evt.target.classList.add(`sort__button--active`);

    this._sortingState = evt.target.dataset.sortType;
    this.show();
  }

  _onDataChangeFilmSection() {
    this._mainCardsListController.show();
    this._showExraSection();
    this._onDataChangePageController();
  }

  _onViewChangeMainController() {
    this._mainCardsListController.onViewChange();
    this._topRatedCardListController.onViewChange();
    this._mostCommentedCardListController.onViewChange();
  }

  _showExraSection() {
    const topRatedFilms =
      this._films.slice()
      .filter((film) => film.rating)
      .sort((a, b) => b.rating - a.rating).slice(0, 2);

    const mostCommentedFilms = this._films.slice()
      .filter((film) => film.comments.length)
      .sort((a, b) => (b.comments.length - a.comments.length)).slice(0, 2);

    if (topRatedFilms.length) {
      render(this._filmsSection.getElement(), this._topRated.getElement());
      this._topRatedCardListController.set(topRatedFilms);
      this._topRatedCardListController.show();
    }

    if (mostCommentedFilms.length) {
      render(this._filmsSection.getElement(), this._mostCommented.getElement());
      this._mostCommentedCardListController
        .set(mostCommentedFilms);
      this._mostCommentedCardListController.show();
    }
  }

}
