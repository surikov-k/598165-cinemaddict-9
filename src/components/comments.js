import moment from 'moment';
import AbstractComponet from "./abstract-component";
import {EmotionType} from '../data';
import {render, encodeHTML} from '../utils';
import {api} from "../main";
import ModelComment from '../model-comment';
import {ActionType} from '../controllers/cards-list-controller';

export default class Comments extends AbstractComponet {
  constructor(film, onDataChange) {
    super();
    this._film = film;
    this._filmUpdated = Object.assign({}, this._film);
    this._comments = [];
    this._onDataChange = onDataChange;
  }

  init(container, comments) {
    this._comments = comments;
    render(container.querySelector(`.form-details__bottom-container`), this.getElement());
    this._changeImoji();

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
          const commentText = encodeHTML(evt.target.value);
          const emotion = new FormData(container.querySelector(`.film-details__inner`)).get(`comment-emoji`);

          const newComment = {
            text: commentText,
            created: Date.now(),
            emotion: emotion || EmotionType.SMILE,
          };

          api.createComment(this._film.id, ModelComment.toRaw(newComment))
            .then((response) => {
              this._onDataChange(ActionType.ADD_COMMENT, response.film);
            });
        }
      });

    this.getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((it) => {
        it.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const commentToDelete = evt.target.dataset.commentId;
          const indexToDelete = this._filmUpdated.comments.findIndex((comment) => comment === commentToDelete);

          api.deleteComment(commentToDelete)
            .then(() => {
              this._filmUpdated.comments =
                [...this._filmUpdated.comments.slice(0, indexToDelete), ...this._filmUpdated.comments.slice(indexToDelete + 1)];

              this._onDataChange(ActionType.ADD_COMMENT, this._filmUpdated);
            });
        });
      });
  }

  getTemplate() {
    return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._film.comments.length}</span></h3>

  <ul class="film-details__comments-list">
  ${this._comments.map((comment) => {
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${EmotionType.src[comment.emotion]}" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">
        ${comment.text}
      </p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.user}</span>
        <span class="film-details__comment-day">${moment(comment.created).format(`YY/MM/DD HH: MM`)}</span>
        <button class="film-details__comment-delete" data-comment-id="${comment.id}">Delete</button>
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

