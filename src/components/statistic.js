import moment from "moment";
import AbstractComponet from "./abstract-component";
import {render} from "../utils";
import StatisticChart from "./statistic-chart";
import {user} from "../data";
import Profile from "./profile";

const StatisticType = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

export default class Statistic extends AbstractComponet {
  constructor(container, films) {
    super();
    this._container = container;
    this._films = films;
    this._statisticChart = new StatisticChart(this._films.filter((film) => film.isWatched));

    this._init();
  }

  getTemplate() {
    return `<section class="statistic">
              <p class="statistic__rank">
                Your rank
                <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
                <span class="statistic__rank-label">${Profile.getUserRating(user.moviesWatched)}</span>
              </p>

              <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
                <p class="statistic__filters-description">Show stats:</p>

                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
                <label for="statistic-all-time" class="statistic__filters-label">All time</label>

                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
                <label for="statistic-today" class="statistic__filters-label">Today</label>

                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
                <label for="statistic-week" class="statistic__filters-label">Week</label>

                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
                <label for="statistic-month" class="statistic__filters-label">Month</label>

                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
                <label for="statistic-year" class="statistic__filters-label">Year</label>
              </form>

            </section>`;
  }

  hide() {
    this.getElement().classList.add(`visually-hidden`);

  }

  show() {
    this.getElement().classList.remove(`visually-hidden`);
  }

  update() {
    this.getElement().querySelector(`#statistic-all-time`).checked = true;
    this._statisticChart.removeElement();
    this._statisticChart = new StatisticChart(this._films.filter((film) => film.isWatched));
    render(this.getElement(), this._statisticChart.getElement());

  }

  _init() {
    render(this._container, this.getElement());
    render(this.getElement(), this._statisticChart.getElement());

    const statisticFilters = this.getElement()
      .querySelector(`.statistic__filters`);

    statisticFilters.addEventListener(`input`, () => {
      const filter = new FormData(statisticFilters).get(`statistic-filter`);
      this._showChart(filter);
    });
  }

  _showChart(filter) {
    let filteredFilms;

    switch (filter) {
      case StatisticType.ALL_TIME:
        filteredFilms = this._films.filter((film) => film.isWatched);
        break;
      case StatisticType.TODAY:
        filteredFilms = this._films.filter((film) => film.isWatched).filter((film) => {
          return (moment(film.watchedDate).year() === moment().year())
            && (moment(film.watchedDate).dayOfYear() === moment().dayOfYear());
        });
        break;
      case StatisticType.WEEK:
        filteredFilms = this._films
          .filter((film) => film.isWatched)
          .filter((film) => {
            return (moment(film.watchedDate).year() === moment().year())
              && (moment(film.watchedDate).week() === moment().week());
          });
        break;
      case StatisticType.MONTH:
        filteredFilms = this._films
          .filter((film) => film.isWatched)
          .filter((film) => {
            return (moment(film.watchedDate).year() === moment().year())
              && (moment(film.watchedDate).month() === moment().month());
          });
        break;
      case StatisticType.YEAR:
        filteredFilms = this._films
          .filter((film) => film.isWatched)
          .filter((film) => {
            return moment(film.watchedDate).year() === moment().year();
          });
        break;

    }
    this._statisticChart.removeElement();
    this._statisticChart = new StatisticChart(filteredFilms);
    render(this.getElement(), this._statisticChart.getElement());

  }


}
