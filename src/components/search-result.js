import AbstractComponent from "./abstract-component";

export default class SearchResults extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div class="result">
              <p class="result__text">Result <span class="result__count">0</span></p>
            </div>`;
  }

  updateCounter(count) {
    this.getElement().querySelector(`.result__count`).innerHTML = count;
  }
}
