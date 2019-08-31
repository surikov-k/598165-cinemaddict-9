import AbstractComponet from "./abstract-component";

export default class SearchNoResult extends AbstractComponet {
  getTemplate() {
    return `<div class="no-result">
              There is no movies for your request.
            </div>`;
  }
}
