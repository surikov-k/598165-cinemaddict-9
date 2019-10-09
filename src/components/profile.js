import AbstractComponet from "./abstract-component";

const UserRating = {
  BEGINNER: `Novice`,
  INTERMEDIATE: `Fan`,
  ADVANCED: `Movie Buff`,
  value: {
    'Novice': 10,
    'Fan': 20,
    'Movie Buff': 30,
  }
};
export default class Profile extends AbstractComponet {
  constructor({moviesWatched}) {
    super();
    this._moviesWatched = moviesWatched;
  }

  static getUserRating(rating) {
    if (rating <= UserRating.value[UserRating.BEGINNER]) {
      return UserRating.BEGINNER;
    } else if (rating >= UserRating.value[UserRating.BEGINNER] + 1 && rating <= UserRating.value[UserRating.INTERMEDIATE]) {
      return UserRating.INTERMEDIATE;
    } else if (rating >= UserRating.value[UserRating.INTERMEDIATE] + 1) {
      return UserRating.ADVANCED;
    }
    return undefined;
  }

  getTemplate() {
    return `<section class="header__profile profile">
            <p class="profile__rating">${Profile.getUserRating(this._moviesWatched)}</p>
            <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`;
  }
}
