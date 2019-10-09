import {render} from "../utils";

export default class SortController {
  constructor(container, sorting) {
    this._container = container;
    this._sorting = sorting;
  }

  init() {
    render(this._container, this._sorting.getElement());
    this._sorting
      .getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    this._sorting
      .getElement()
      .querySelectorAll(`.sort__button`)
      .forEach((button) => button.classList.remove(`sort__button--active`));
    evt.target.classList.add(`sort__button--active`);
  }
}
