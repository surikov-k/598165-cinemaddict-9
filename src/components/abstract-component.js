import {unrender, createElement} from "../utils";

export default class AbstractComponet {
  constructor() {
    if (new.target === AbstractComponet) {
      throw new Error(`Can't instantiate an AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    unrender(this._element);
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
}
