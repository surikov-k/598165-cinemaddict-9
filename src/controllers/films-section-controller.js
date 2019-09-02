import FilmsSection from "../components/films-section";
import SearchNoResult from "../components/search-no-result";
import {render} from "../utils";
import FilmsList from "../components/films-list";
import ShowMore from '../components/show-more';
import CardController from './card-controller';
import FilmsListExtra from '../components/films-list-extra';
import Sorting from "../components/sorting";

const CARDS_PER_CLICK = 5;
export const FilmsListType = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`
};

export default class FilmsSectonController {
  constructor(container, films, comments) {
    this._container = container;
    this._films = films;
    this._comments = comments;
    this._sort = new Sorting();
    this._filmsSection = new FilmsSection();
    this._searchNoResults = new SearchNoResult();
    this._filmsList = new FilmsList();
    this._showMore = new ShowMore();
    this._topRated = new FilmsListExtra(FilmsListType.TOP_RATED);
    this._mostCommented = new FilmsListExtra(FilmsListType.MOST_COMMENTED);

    this._cardsDisplayed = CARDS_PER_CLICK;
    this._sortingState = `default`;

  }

  init() {
    if (this._films.length) {
      render(document.querySelector(`.main`), this._sort.getElement());
      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

      render(this._filmsSection.getElement(), this._filmsList.getElement());


      const filmsListContainer =
        this._filmsList
          .getElement()
          .querySelector(`.films-list__container`);

      this.showCards(filmsListContainer, this._cardsDisplayed);


      render(this._filmsList.getElement(), this._showMore.getElement());

      this._showMore.getElement().addEventListener(`click`, () => {

        this._cardsDisplayed += CARDS_PER_CLICK;
        this.showCards(filmsListContainer, this._cardsDisplayed);


        if (this._cardsDisplayed >= this._films.length) {
          this._showMore.getElement().remove();
        }
      });

      render(this._filmsSection.getElement(), this._topRated.getElement());

      this
        .showCards(this._topRated.getElement()
          .querySelector(`.films-list__container`), 2, `rating`);

      render(this._filmsSection.getElement(), this._mostCommented.getElement());

      this
        .showCards(this._mostCommented.getElement()
          .querySelector(`.films-list__container`), 2, `most commented`);

      render(this._container, this._filmsSection.getElement());
    } else {
      render(this._container, this._searchNoResults.getElement());
    }
  }


  showCards(container, span, sorting) {

    container.innerHTML = ``;
    const filmsToDisplay = this._films.slice();

    switch (sorting || this._sortingState) {
      case `date`:
        filmsToDisplay.sort((a, b) => b.created - a.created);
        break;

      case `rating`:
        filmsToDisplay.sort((a, b) => b.rating - a.rating);
        break;

      case `most commented`:
        filmsToDisplay.sort((a, b) => {
          const bComments = this._comments
            .filter((comment) => comment.filmTitle === b.title).length;

          const aComments = this._comments
            .filter((comment) => comment.filmTitle === a.title).length;

          return bComments - aComments;
        });
        break;
    }

    filmsToDisplay
      .slice(0, span)
      .forEach((film) => {
        this.showCard(container, film);
      });
  }

  showCard(container, film) {
    const cardController = new CardController(container, {film, comments: this._comments});
    cardController.init();
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    const filmsListContainer =
      this._filmsList
        .getElement()
        .querySelector(`.films-list__container`);

    this._sort
      .getElement().querySelectorAll(`.sort__button`)
      .forEach((button) => button.classList.remove(`sort__button--active`));

    evt.target.classList.add(`sort__button--active`);

    this._sortingState = evt.target.dataset.sortType;

    this.showCards(filmsListContainer, this._cardsDisplayed);
  }
}
