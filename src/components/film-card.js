const tuncateDescription = (description) => {
  if (description.length <= 140) {
    return description;
  } else {
    return description.slice(0, 139) + `&hellip;`;
  }
};

const showDuration = (duration) => {
  const hours = parseInt(duration / 60, 10);
  return `${hours}h ${duration - hours * 60}m`;
};

export const calculateComments = (title, comments) => {
  return comments.filter((comment) => comment.movieTitle === title).length;
};

export const getFilmCardTemplate = (movie, comments) => {

  const {title, poster, rating, created, duration, genres, description, isAddedToWatchlist, isFavorite, isWatched} = movie;

  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${created.getFullYear()}</span>
        <span class="film-card__duration">${showDuration(duration)}</span>
        <span class="film-card__genre">${[...genres][0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${tuncateDescription(description)}</p>
      <a class="film-card__comments">${calculateComments(title, comments)} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAddedToWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>
  `;
};

