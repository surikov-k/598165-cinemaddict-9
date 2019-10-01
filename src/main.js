import Search from './components/search';
import Profile from './components/profile';

import {user, getFilms, comments} from './data';
import {render} from './utils';
import PageController from './controllers/page-controller';

const films = getFilms();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, new Search().getElement());
render(header, new Profile(user).getElement());

const pageController = new PageController(main, films, comments);
pageController.init();

