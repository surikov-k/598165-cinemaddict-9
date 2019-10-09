import SearchResults from "../components/search-result";
import {render} from "../utils";
import FilmsSection from "../components/films-section";
import FilmsList from "../components/films-list";
import CardsListController from "./cards-list-controller";
import ShowMore from "../components/show-more";

const CARDS_PER_CLICK = 5;

export default class SearchController {
  constructor(container, films, comments, onDataChangePageController) {
    this._container = container;
    this._films = films;
    this._comments = comments;
    this._searchResults = new SearchResults(0);
    this._filmsSection = new FilmsSection();
    this._filmsList = new FilmsList();
    this._showMore = new ShowMore();
    this._cardsDisplayed = CARDS_PER_CLICK;

    this._onDataChangePageController = onDataChangePageController;

    this._onDataChangeSearchSection = this._onDataChangeSearchSection.bind(this);
    this._onViewChangeSearchSection = this._onViewChangeSearchSection.bind(this);

    this._searchListController = new CardsListController(this._filmsList.getElement()
      .querySelector(`.films-list__container`), this._onDataChangeSearchSection, this._onViewChangeSearchSection);
  }

  init() {
    render(this._container, this._searchResults.getElement());
    render(this._container, this._filmsSection.getElement());
    render(this._filmsSection.getElement(), this._filmsList.getElement());
    this.show();
  }

  hide() {
    this._searchResults.removeElement();
    this._filmsSection.removeElement();
  }

  setQuery(query) {
    this._query = query;
  }

  show() {
    this._showMore.removeElement();

    this._filmsToDisplay = this._films.slice().filter((film) => {
      return film.title.toLowerCase().includes(this._query.toLowerCase());
    });
    this._searchResults.updateCounter(this._filmsToDisplay.length);

    if (this._filmsToDisplay.length > this._cardsDisplayed) {
      render(this._filmsList.getElement(), this._showMore.getElement());
      this._showMore.getElement().addEventListener(`click`, () => {
        this._cardsDisplayed += CARDS_PER_CLICK;
        this.show();
      });
    }

    this._searchListController
      .set(this._filmsToDisplay.slice(0, this._cardsDisplayed), this._comments);
    this._searchListController.show();
  }

  _onDataChangeSearchSection() {
    this._searchListController.show();
    this._onDataChangePageController();
  }

  _onViewChangeSearchSection() {
    this._searchListController.onViewChange();
  }
}
