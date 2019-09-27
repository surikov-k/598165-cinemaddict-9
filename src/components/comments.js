import moment from 'moment';
import AbstractComponet from "./abstract-component";
import {EmotionType} from '../data';
import {render, encodeHTML} from '../utils';

export default class Comments extends AbstractComponet {
  constructor(film, comments, onDataChange) {
    super();
    this._film = film;
    this._filmUpdated = Object.assign({}, this._film);
    this._comments = comments;
    this._onDataChange = onDataChange;
  }

  init(container) {
    render(container.querySelector(`.form-details__bottom-container`), this.getElement());
    this._changeImoji();

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
          const commentText = encodeHTML(evt.target.value);
          const emotion = new FormData(container.querySelector(`.film-details__inner`)).get(`comment-emoji`);

          this._comments.push({
            id: this._comments.length + 1,
            text: commentText,
            user: `user`,
            created: Date.now(),
            emotion: emotion || EmotionType.SMILE,
          });

          this._filmUpdated.comments.push(this._comments.length);
          this._onDataChange(this._filmUpdated, this._film);
        }
      });

    this.getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((it) => {
        it.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const commentToDelete = parseInt(evt.target.dataset.commentId, 10);

          this._comments = [...this._comments.slice(0, commentToDelete), ...this._comments.slice(commentToDelete + 1)];

          const idToDelete = this._filmUpdated.comments.findIndex((id) => id === commentToDelete);
          this._filmUpdated.comments =
            [...this._filmUpdated.comments.slice(0, idToDelete),
              ...this._filmUpdated.comments.slice(idToDelete + 1)];
          this._onDataChange(this._filmUpdated, this._film);
        });
      });

  }

  getTemplate() {
    return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._film.comments.length}</span></h3>

  <ul class="film-details__comments-list">
  ${this._film.comments.map((id) => {
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${EmotionType.src[this._comments[this._idx(id)].emotion]}" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">
        ${this._comments[this._idx(id)].text}
      </p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${this._comments[this._idx(id)].user}</span>
        <span class="film-details__comment-day">${moment(this._comments[this._idx(id)].created).format(`YY/MM/DD HH: MM`)}</span>
        <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
      </p>
    </div>
  </li>`;
  }).join(``)}
  </ul>

  <div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label">
      <img src="images/emoji/smile.png" width="55" height="55" alt="emoji"></img>
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="puke">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                    <label class="film-details__emoji-label" for="emoji-angry">
                      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>`;
  }

  _idx(i) {
    return this._comments.findIndex((comment) => comment.id === i);
  }

  _changeImoji() {
    const addEmojiLabel = this.getElement().querySelector(`.film-details__add-emoji-label img`);
    addEmojiLabel.style.display = `none`;

    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `INPUT`) {
          addEmojiLabel.src = evt.target.nextElementSibling.querySelector(`IMG`).src;
          addEmojiLabel.style.display = `block`;
        }
      });
  }

}

