import Search from './components/search';
import Profile from './components/profile';
import Navigation from './components/navigation';

import {user, getFilms, comments} from './data';
import {render} from './utils';
import FilmsSectonController from './controllers/films-section-controller';

const films = getFilms();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);


render(header, new Search().getElement());
render(header, new Profile(user).getElement());
render(main, new Navigation(films).getElement());

const filmsSectionController = new FilmsSectonController(main, films, comments);

filmsSectionController.init();
