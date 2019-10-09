const ANIMATION_TIMEOUT = 600;

export const Position = {
  AFTERBEGING: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, position = Position.BEFOREEND) => {
  switch (position) {
    case Position.AFTERBEGING:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export const encodeHTML = (s) => {
  return s.replace(/&/g, `&amp;`).replace(/</g, `&lt;`).replace(/>/g, `&rt;`).replace(/"/g, `&quot;`);
};

export const formatDuration = (duration) => {
  const hours = parseInt(duration / 60, 10);
  return {h: hours, m: duration - hours * 60};
};

export const shake = (element) => {
  element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    element.style.animation = ``;
  }, ANIMATION_TIMEOUT);
};

export const objectToArray = (object) => {
  return Object.keys(object).map((key) => object[key]);
};
