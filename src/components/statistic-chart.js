import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractComponet from "./abstract-component";
import {formatDuration} from "../utils";

export default class StatisticChart extends AbstractComponet {
  constructor(films) {
    super();
    this._films = films;
    this._totalDuration = this._films
      .reduce((total, film) => total + film.duration, 0);
    this._genres = this._countGenres(this._films);
    this._init();
  }

  getTemplate() {
    return `<div>
              <ul class="statistic__text-list">
                <li class="statistic__text-item">
                  <h4 class="statistic__item-title">You watched</h4>
                  <p class="statistic__item-text">${this._films.length} <span class="statistic__item-description">movies</span></p>
                </li>
                <li class="statistic__text-item">
                  <h4 class="statistic__item-title">Total duration</h4>
                  <p class="statistic__item-text">${formatDuration(this._totalDuration).h}<span class="statistic__item-description">h</span>${formatDuration(this._totalDuration).m}<span class="statistic__item-description">m</span></p>
                </li>
                <li class="statistic__text-item">
                ${this._films.length ? `<h4 class="statistic__item-title">Top genre</h4>
                  <p class="statistic__item-text">${this._findMaxGenre(this._films)}</p>` : ``}

                </li>

              </ul>
              <div class="statistic__chart-wrap">
                <canvas class="statistic__chart" width="1000" height="${Object.keys(this._genres).length * 49}"></canvas>
              </div>
            </div>`;
  }

  _init() {
    const labels = Object.keys(this._genres);
    const data = Object.values(this._genres);

    const ctx = this.getElement().querySelector(`.statistic__chart`);

    void new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `rgba(254, 232, 64, 1.000)`,
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20,
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `left`,
            offset: 50,
          }
        },
        scales: {
          yAxes: [{
            barThickness: 24,
            ticks: {
              padding: 110,
              fontSize: 20,
              fontColor: `#ffffff`,
              beginAtZero: true,

            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              display: false

            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  _countGenres(films) {
    const genres = {};
    films.forEach((film) => {
      film.genres.forEach((genre) => {
        if (genres[genre]) {
          ++genres[genre];
        } else {
          genres[genre] = 1;
        }
      });
    });
    return genres;
  }

  _findMaxGenre(films) {
    if (!films.length) {
      return ``;
    }
    const maxCount = Math.max(...Object.values(this._genres));
    const maxIndex = Object.values(this._genres).findIndex((value) => value === maxCount);
    return Object.entries(this._genres)[maxIndex][0];
  }

}
