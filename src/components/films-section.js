import AbstractComponet from './abstract-component';

export default class FilmsSection extends AbstractComponet {

  getTemplate() {
    return `<section class="films"></section>`;
  }
}
