import {getFilmCardTemplate, calculateComments} from './film-card';

const getTwoMostRated = (movies, comments) => {
  return movies.slice().sort((a, b) => {
    return b.rating - a.rating;
  }).slice(0, 2).map((movie) => {
    return getFilmCardTemplate(movie, comments);
  }).join(``);
};

const getTwoMostCommented = (movies, comments) => {
  return movies.slice().sort((a, b) => {
    return calculateComments(b.title, comments) - calculateComments(a.title, comments);
  }).slice(0, 2).map((movie) => {
    return getFilmCardTemplate(movie, comments);
  }).join(``);
};


export const getFilmsTemplate = (movies, comments) => {
  return `
  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      </div>


    </section>
      <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
        ${getTwoMostRated(movies, comments)}
      </div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
        ${getTwoMostCommented(movies, comments)}
      </div>
    </section>
    </section>
  `;
};
