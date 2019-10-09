import moment from 'moment';
import AbstractComponet from "./abstract-component";
import {render, encodeHTML, shake} from '../utils';
import {provider} from "../main";
import ModelComment from '../model-comment';
import {ActionType} from '../controllers/cards-list-controller';

const EmotionType = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
  src: {
    'smile': `images/emoji/smile.png`,
    'sleeping': `images/emoji/sleeping.png`,
    'puke': `images/emoji/puke.png`,
    'angry': `images/emoji/angry.png`,
  }
};

export default class Comments extends AbstractComponet {
  constructor(film, onDataChange) {
    super();
    this._film = film;
    this._onDataChange = onDataChange;

    this._filmUpdated = Object.assign({}, this._film);
    this._comments = [];
  }

  init(container, comments) {
    this._comments = comments;
    render(container.querySelector(`.form-details__bottom-container`), this.getElement());
    const commentInput = this.getElement()
      .querySelector(`.film-details__comment-input`);

    this._changeImoji();

    commentInput
      .addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
          const commentText = encodeHTML(evt.target.value);
          const emotion = new FormData(container.querySelector(`.film-details__inner`)).get(`comment-emoji`);

          const newComment = {
            text: commentText,
            created: Date.now(),
            emotion: emotion || EmotionType.SMILE,
          };

          commentInput.classList.remove(`connection-error`);
          this._blockInputs(true);

          provider.createComment(this._film.id, ModelComment.toRaw(newComment))
            .then((response) => {
              this._blockInputs(false);
              this._onDataChange(ActionType.ADD_COMMENT, response.film);
            })
            .catch(() => {
              shake(commentInput);
              commentInput.classList.add(`connection-error`);
              this._blockInputs(false);
            });
        }

        window.addEventListener(`offline`, () => {
          this._blockInputs(true);

          this.getElement()
            .querySelectorAll(`.film-details__comment-delete`)
            .forEach((button) => {
              button.disabled = true;
            });
        });

        window.addEventListener(`online`, () => {
          this._blockInputs(false);

          this.getElement()
            .querySelectorAll(`.film-details__comment-delete`)
            .forEach((button) => {
              button.disabled = false;
            });
        });
      });

    this.getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((it) => {
        it.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const deleteButton = evt.target;
          const commentToDelete = evt.target.dataset.commentId;
          const indexToDelete = this._filmUpdated.comments
            .findIndex((comment) => comment === commentToDelete);

          deleteButton.innerText = `Deleting...`;
          deleteButton.disabled = true;

          provider.deleteComment(commentToDelete)
            .then(() => {
              this._filmUpdated.comments =
                [...this._filmUpdated.comments.slice(0, indexToDelete), ...this._filmUpdated.comments.slice(indexToDelete + 1)];

              this._onDataChange(ActionType.ADD_COMMENT, this._filmUpdated);
            })
            .catch(() => {
              deleteButton.innerText = `Delete`;
              deleteButton.disabled = false;
            });
        });
      });
  }

  _blockInputs(state) {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .disabled = state;

    this.getElement()
      .querySelectorAll(`input`)
      .forEach((input) => {
        input.disabled = state;
      });
  }

  getTemplate() {
    return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._film.comments.length}</span></h3>

  <ul class="film-details__comments-list">
  ${this._comments
        .map((comment) => {
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
        <span class="film-details__comment-day">${this._formatPostingTime(comment.created)}</span>
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
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ></textarea>
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

  _formatPostingTime(postingTime) {
    return moment.duration(moment(postingTime).diff(moment())).humanize(true);
  }
}
