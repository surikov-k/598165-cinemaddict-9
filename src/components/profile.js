import {createElement} from '../utils';

const UserRating = {
  beginner: `Novice`,
  intermediate: `Fan`,
  advanced: `Movie Buff`
};
export default class Profile {
  constructor({moviesWatched}) {
    this._moviesWatched = moviesWatched;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="header__profile profile">
            <p class="profile__rating">${this._getUserRating(this._moviesWatched)}</p>
            <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`;
  }

  _getUserRating(rating) {
    if (rating <= 10) {
      return UserRating.beginner;
    } else if (rating >= 11 && rating <= 20) {
      return UserRating.intermediate;
    } else if (rating >= 21) {
      return UserRating.advanced;
    } else {
      return undefined;
    }
  }
}
