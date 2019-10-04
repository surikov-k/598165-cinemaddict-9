import FilmsSectonController from './films-section-controller';
import Statistic from '../components/statistic';
import Navigation from '../components/navigation';
import {render, Position} from '../utils';
import SearchController from './search-controller';

const MIN_SEARCH_QUERY = 3;

export default class PageController {

  constructor(container, films, comments) {
    this._container = container;
    this._films = films;
    this._comments = comments;

    this._onDataChangeForMainList = this._onDataChangeForMainList.bind(this);
    this._onDataChangeForSearchList = this._onDataChangeForSearchList.bind(this);

    this._navigation = new Navigation(this._films);
    this._statistic = new Statistic(this._container, this._films);
    this._filmsSectionController = new FilmsSectonController(this._container, this._films, this._comments, this._onDataChangeForMainList);
    this._searchController = new SearchController(this._container, this._films, this._comments, this._onDataChangeForSearchList);
    this._filter = ``;
  }

  init() {

    render(this._container, this._navigation.getElement(), Position.AFTERBEGING);
    this._filmsSectionController.init();
    this._statistic.hide();
    this._searchInit();

    this._navigation.getElement()
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        if (evt.target.tagName !== `A`) {
          return;
        }
        this._filter = evt.target.getAttribute(`href`);

        switch (this._filter) {
          case `#all`:
          case `#watchlist`:
          case `#history`:
          case `#favorites`:
            this._statistic.hide();
            this._filmsSectionController.setFilter(this._filter);
            this._toggleNavLinkStyle(evt.target);
            break;

          case `#stats`:
            this._filmsSectionController.hide();
            this._statistic.show();
            this._toggleNavLinkStyle(evt.target);
            break;
        }
      });
  }

  _toggleNavLinkStyle(target) {
    document.querySelectorAll(`.main-navigation__item`).
      forEach((link) => link.classList.remove(`main-navigation__item--active`));
    target.classList.toggle(`main-navigation__item--active`);
  }

  _onDataChangeForMainList() {
    this._navigation.update();
    this._filmsSectionController.show();
    this._statistic.update();

  }

  _onDataChangeForSearchList() {
    this._navigation.update();
    this._searchController.show();
    this._statistic.update();

  }

  _searchInit() {
    document.querySelector(`.header__search`)
      .addEventListener(`input`, (evt) => {
        if (evt.target.value.length >= MIN_SEARCH_QUERY) {
          this._filmsSectionController.hide();
          this._statistic.hide();
          this._navigation.hide();
          this._searchController.setQuery(evt.target.value);
          this._searchController.init();

        } else {
          this._hideSearchResults();
        }
      });

    document.querySelector(`.header__search`)
      .addEventListener(`reset`, () => {
        this._hideSearchResults();
      });
  }

  _hideSearchResults() {
    this._filmsSectionController.show();
    this._navigation.show();
    this._searchController.hide();
    this._toggleNavLinkStyle(this._navigation.getElement().querySelector(`[href="#all"]`));
  }
}

