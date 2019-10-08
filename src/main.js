import Search from './components/search';
import Profile from './components/profile';

import {user} from './data';
import {render} from './utils';
import PageController from './controllers/page-controller';
import API from './api';

const AUTHORIZATION = `Basic sdfasdf0yq34`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;
export const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, new Search().getElement());
render(header, new Profile(user).getElement());
api.getFilms().then((films) => {
  const pageController = new PageController(main, films);
  pageController.init();
});


