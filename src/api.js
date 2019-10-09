import ModelFilm from "./model-film";
import ModelComment from "./model-comment";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const HTTPStatus = {
  SUCCESS: 200,
  REDIRECTION: 300,
};

const checkStatus = (response) => {
  if (response.status >= HTTPStatus.SUCCESS && response.status < HTTPStatus.REDIRECTION) {
    return response;
  } else {
    throw new Error(`${response.status}:`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(toJSON)
      .then(ModelFilm.parseFilms);
  }

  updateFilm(id, film) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(film),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then(toJSON)
      .then(ModelFilm.parseFilm);
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(toJSON)
      .then(ModelComment.parseComments);
  }

  createComment(filmId, comment) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then((json) => {
        return {
          film: ModelFilm.parseFilm(json[`movie`]),
          comments: ModelComment.parseComments(json[`comments`]),
        };
      });
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE,
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
