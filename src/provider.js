import ModelFilm from "./model-film";
import {objectToArray} from "./utils";
import ModelComment from "./model-comment";

export default class Provider {
  constructor({api, filmsStore, commentsStore}) {
    this._api = api;
    this._filmsStore = filmsStore;
    this._commentsStore = commentsStore;
  }

  getFilms() {
    if (this._isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          films.map((film) => {
            this._filmsStore
              .setItem({key: film.id, item: ModelFilm.toRaw(film)});
          });
          return films;
        });
    } else {
      const rawFilmsMap = this._filmsStore.getAll();
      const rawFilms = objectToArray(rawFilmsMap);
      const films = ModelFilm.parseFilms(rawFilms);
      return Promise.resolve(films);
    }
  }

  getComments(filmId) {
    if (this._isOnline()) {
      return this._api.getComments(filmId)
        .then((comments) => {
          const rawComments = [];
          comments.map((comment) => {
            rawComments.push(ModelComment.toRaw(comment));
          });
          this._commentsStore
            .setItem({key: filmId, item: rawComments});
          return comments;
        });
    } else {
      const rawComments = this._commentsStore.getAll()[filmId];
      const comments = rawComments ?
        ModelComment.parseComments(rawComments) : [];
      return Promise.resolve(comments);
    }
  }

  updateFilm(id, data) {
    if (this._isOnline()) {
      return this._api.updateFilm(id, data)
        .then((film) => {
          this._filmsStore.setItem({key: film.id, item: ModelFilm.toRaw(film)});
          return film;
        });
    } else {
      const film = data;
      this._filmsStore.setItem({key: film.id, item: film});
      return Promise.resolve(ModelFilm.parseFilm(film));
    }
  }

  createComment(filmId, comment) {
    return this._api.createComment(filmId, comment);
  }

  deleteComment(id) {
    return this._api.deleteComment(id);
  }

  syncFilms() {
    return this._api
      .syncFilms({films: objectToArray(this._filmsStore.getAll())});
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
