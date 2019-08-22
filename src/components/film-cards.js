import {getFilmCardTemplate} from './film-card';
import {state, CARDS_PER_CLICK} from '../main';

export const getFilmCardsTemplate = (movies, comments) => {
  const template = movies.slice(state.cardsDisplayed, state.cardsDisplayed + CARDS_PER_CLICK).map((movie) => {
    return getFilmCardTemplate(movie, comments);
  }).join(``);

  state.cardsDisplayed = state.cardsDisplayed + CARDS_PER_CLICK;

  return template;
};
