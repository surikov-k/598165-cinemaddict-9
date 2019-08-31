import AbstractComponet from './abstract-component';

export default class ShowMore extends AbstractComponet {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}
