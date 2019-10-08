export default class ModelFilm {
  constructor(film) {
    return {
      id: film[`id`],
      title: film[`film_info`][`title`],
      comments: film[`comments`],
      originalTitle: film[`film_info`][`alternative_title`],
      director: film[`film_info`][`director`],
      writers: film[`film_info`][`writers`],
      actors: film[`film_info`][`actors`],
      poster: film[`film_info`][`poster`],
      rating: film[`film_info`][`total_rating`],
      ageRating: film[`film_info`][`age_rating`],
      created: new Date(film[`film_info`][`release`][`date`]),
      duration: film[`film_info`][`runtime`],
      country: film[`film_info`][`release`][`release_country`],
      genres: new Set(film[`film_info`][`genre`]),
      description: film[`film_info`][`description`],
      isAddedToWatchlist: film[`user_details`][`watchlist`],
      isFavorite: film[`user_details`][`favorite`],
      isWatched: film[`user_details`][`already_watched`],
      watchedDate: new Date(film[`user_details`][`watching_date`]),
      personalRating: film[`user_details`][`personal_rating`],
    };
  }

  static parseFilm(film) {
    return new ModelFilm(film);
  }

  static parseFilms(films) {
    return films.map(ModelFilm.parseFilm);
  }

  static toRaw(film) {
    return {
      'id': film.id,
      'comments': film.comments,
      'film_info': {
        'title': film.title,
        'alternative_title': film.originalTitle,
        'total_rating': film.rating,
        'poster': film.poster,
        'age_rating': film.ageRating,
        'director': film.director,
        'writers': film.writers,
        'actors': film.actors,
        'release': {
          'date': new Date(film.created).toISOString(),
          'release_country': film.country
        },
        'runtime': film.duration,
        'genre': [...film.genres.values()],
        'description': film.description.replace(`"`, `\\"`)
      },
      'user_details': {
        'personal_rating': film.personalRating,
        'watchlist': film.isAddedToWatchlist,
        'already_watched': film.isWatched,
        'watching_date': new Date(film.watchedDate).toISOString(),
        'favorite': film.isFavorite
      }
    };
  }
}


