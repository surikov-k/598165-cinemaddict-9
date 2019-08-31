import FilmsSection from "../components/films-section";
import SearchNoResult from "../components/search-no-result";
import {render} from "../utils";
import FilmsList from "../components/films-list";
import ShowMore from '../components/show-more';
import CardController from './card-controller';
import FilmsListExtra from '../components/films-list-extra';
import FilmCard from '../components/film-card';

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
    this._filmsSection = new FilmsSection();
    this._searchNoResults = new SearchNoResult();
    this._filmsList = new FilmsList();
    this._showMore = new ShowMore();
    this._topRated = new FilmsListExtra(FilmsListType.TOP_RATED);
    this._mostCommented = new FilmsListExtra(FilmsListType.MOST_COMMENTED);

    this._cardsDisplayed = 0;
  }

  init() {
    if (this._films.length) {
      render(this._filmsSection.getElement(), this._filmsList.getElement());

      const filmsListContainer =
        this._filmsList
          .getElement()
          .querySelector(`.films-list__container`);


      this.showCards(filmsListContainer, this._films.slice(this._cardsDisplayed, this._cardsDisplayed + CARDS_PER_CLICK));
      this._cardsDisplayed = this._cardsDisplayed + CARDS_PER_CLICK;


      render(this._filmsList.getElement(), this._showMore.getElement());

      this._showMore.getElement().addEventListener(`click`, () => {

        this.showCards(filmsListContainer, this._films.slice(this._cardsDisplayed, this._cardsDisplayed + CARDS_PER_CLICK));
        this._cardsDisplayed = this._cardsDisplayed + CARDS_PER_CLICK;


        if (this._cardsDisplayed >= this._films.length) {
          this._showMore.getElement().remove();
        }
      });

      render(this._filmsSection.getElement(), this._topRated.getElement());

      this.showCards(this._topRated.getElement().querySelector(`.films-list__container`), this._films.slice().sort((a, b) => b.rating - a.rating).slice(0, 2)
      );

      render(this._filmsSection.getElement(), this._mostCommented.getElement());

      this.showCards(this._mostCommented.getElement().querySelector(`.films-list__container`), this._films.slice().sort((a, b) => {
        return FilmCard.calculateComments(b.title, this._comments) - FilmCard.calculateComments(a.title, this._comments);
      }
      ).slice(0, 2));

      render(this._container, this._filmsSection.getElement());
    } else {
      render(this._container, this._searchNoResults.getElement());
    }
  }


  showCards(container, cards) {
    cards.forEach((card) => {
      const cardController = new CardController(container, card);
      cardController.init();
    });
  }
}
