import AbstractComponet from './abstract-component';

export default class FilmsListExtra extends AbstractComponet {
  constructor(filmsListTitle) {
    super();
    this._filmsListTitle = filmsListTitle;
  }

  getTemplate() {
    return `<section class="films-list--extra">
              <h2 class="films-list__title">${this._filmsListTitle}</h2>
              <div class="films-list__container">
              </div>
            </section>`;
  }
}
