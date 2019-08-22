const getFilters = (movies) => {
  return [
    {
      name: `Watchlist`,
      count: movies.filter((movie) => movie.isAddedToWatchlist).length
    },
    {
      name: `History`,
      count: movies.filter((movie) => movie.isWatched).length
    },
    {
      name: `Favorites`,
      count: movies.filter((movie) => movie.isFavorite).length
    },
  ];
};

export const getNavigationTemplate = (movies) => {
  return `
    <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${getFilters(movies).map((filter) => {
    return `<a href="#${filter.name.toLowerCase()}" class="main-navigation__item">${filter.name}
      <span class="main-navigation__item-count">${filter.count}</span>
      </a>`;
  }).join(``)}


      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>
  `;
};

