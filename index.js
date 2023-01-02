import data from './data.json' assert { type: 'json' };
const html = document.querySelector('html');
const menuButton = document.querySelector('.mobile-nav-toggle');
const nav = document.querySelector('.primary-navigation');
const crewParentElement = document.querySelector('.grid-container--crew');
const destinationParentElement = document.querySelector(
  '.grid-container--destination'
);
const technologyParentElement = document.querySelector(
  '.grid-container--technology'
);

// const toggleMenu = function () {};

menuButton.addEventListener('click', e => {
  const visiblity = nav.getAttribute('data-visible');
  console.log('clicked');
  if (visiblity === 'false') {
    nav.setAttribute('data-visible', true);
    menuButton.setAttribute('aria-expanded', true);
  } else {
    nav.setAttribute('data-visible', false);
    menuButton.setAttribute('aria-expanded', false);
  }
});

// Functions for rendering subpages content
const renderCrew = function (data, number) {
  crewParentElement.innerHTML = '';
  const clickedPageData = data[number];

  const markup = `
  
    <h1 class="numbered-title">
      <span aria-hidden="true">02</span> Meet your crew
    </h1>
    <div class="dot-indicators flex ">
      <button data-dot-number="0" class="switch-page" aria-selected="${
        number == '0' ? 'true' : 'false'
      }">
        <span class="sr-only">The commander</span>
      </button>
      <button data-dot-number="1" class="switch-page" aria-selected="${
        number == '1' ? 'true' : 'false'
      }">
        <span class="sr-only">The mission specialist</span>
      </button>
      <button data-dot-number="2" class="switch-page" aria-selected="${
        number == '2' ? 'true' : 'false'
      }">
        <span class="sr-only">The pilot</span>
      </button>
      <button class="switch-page" aria-selected="${
        number == '3' ? 'true' : 'false'
      }" data-dot-number="3">
        <span class="sr-only">The engineer</span>
      </button>
    </div>
    <article class="flow crew-details">
      <header class="flow flow--space-small">
        <h2 class="fs-600 ff-serif uppercase">${clickedPageData.role}</h2>
        <p class="fs-700 uppercase ff-serif">${clickedPageData.name}</p>
      </header>
      <p>
      ${clickedPageData.bio}
      </p>
    </article>
    <picture>
      <source
        srcset="${clickedPageData.images.webp}"
        type="image/webp"
      />
      <img src="${clickedPageData.images.png}" alt="${clickedPageData.name}" />
    </picture>
`;
  crewParentElement.insertAdjacentHTML('afterbegin', markup);
};

const renderDesitnation = function (data, number) {
  destinationParentElement.innerHTML = '';
  const clickedPageData = data[number];
  console.log(clickedPageData);
  const markup = `

    <h1 class="numbered-title">
      <span aria-hidden="true">01</span> Pick your destination
    </h1>

    <picture>
      <source srcset="${clickedPageData.images.webp}" type="image/webp" />
      <img src="${clickedPageData.images.png}" alt="the ${
    clickedPageData.name
  }" />
    </picture>
    <div class="tab-list underline-indicators flex">
      <button
        data-tab-number="0"
        aria-selected="${number == '0' ? 'true' : 'false'}"
        class="uppercase ff-sans-cond text-accent switch-page letter-spacing-2"
      >
        Moon
      </button>
      <button     
        data-tab-number="1"
        aria-selected="${number == '1' ? 'true' : 'false'}"
        class="uppercase switch-page ff-sans-cond text-accent letter-spacing-2"
      >
        Mars
      </button>
      <button
        data-tab-number="2"
        aria-selected="${number == '2' ? 'true' : 'false'}"
        class="uppercase ff-sans-cond switch-page text-accent letter-spacing-2"
      >
        Europa
      </button>
      <button
        data-tab-number="3"
        aria-selected="${number == '3' ? 'true' : 'false'}"
        class="uppercase ff-sans-cond switch-page text-accent letter-spacing-2"
      >
        Titan
      </button>
    </div>

    <article class="destination-info flow">
      <h2 class="fs-800 uppercase ff-serif">${clickedPageData.name}</h2>

      <p>
      ${clickedPageData.description}
      </p>

      <div class="destination-meta flex">
        <div>
          <h3 class="text-accent fs-200 uppercase">Avg. distance</h3>
          <p class="fs-500 ff-serif uppercase">${clickedPageData.distance}</p>
        </div>
        <div>
          <h3 class="text-accent fs-200 uppercase">Est. travel time</h3>
          <p class="fs-500 ff-serif uppercase">${clickedPageData.travel}</p>
        </div>
      </div>
    </article>
`;

  destinationParentElement.insertAdjacentHTML('afterbegin', markup);
};

const renderTechonology = function (data, number) {
  technologyParentElement.innerHTML = '';
  const clickedPageData = data[number];

  const markup = `

  <h1 class="numbered-title">
    <span aria-hidden="true">03 </span> Space launch 101
  </h1>
  <picture>
    <source
      media="(min-width:45em)"
      srcset="${clickedPageData.images.portrait}"
    />

    <img
      src="${clickedPageData.images.landscape}"
      alt="${clickedPageData.name}"
    />
  </picture>
  <div class="number-indicators flex">
    <button data-number="0" class="switch-page" aria-selected="true">
      1
    </button>
    <button data-number="1" class="switch-page" aria-selected="false">
      2
    </button>
    <button data-number="2" class="switch-page" aria-selected="false">
      3
    </button>
  </div>
  <article class="flow technology-details">
    <header class="flow flow--space-small">
      <h2 class="ff-sans-cond uppercase letter-spacing-2">
        The terminology...
      </h2>
      <p class="fs-700 uppercase ff-serif">${clickedPageData.name}</p>
    </header>
    <p class="technology-paragraph">
    ${clickedPageData.description}
    </p>
  </article>
`;
  technologyParentElement.insertAdjacentHTML('afterbegin', markup);
};

// Event listeners
if (crewParentElement)
  crewParentElement.addEventListener('click', function (e) {
    const link = e.target.closest('.switch-page');

    if (!link) return;

    const dotNumber = link.dataset.dotNumber;

    renderCrew(data.crew, dotNumber);
  });

if (destinationParentElement)
  destinationParentElement.addEventListener('click', function (e) {
    const link = e.target.closest('.switch-page');

    if (!link) return;

    const tabNumber = link.dataset.tabNumber;
    renderDesitnation(data.destinations, tabNumber);
  });

if (technologyParentElement)
  technologyParentElement.addEventListener('click', function (e) {
    const link = e.target.closest('.switch-page');
    if (!link) return;

    const NumberPage = link.dataset.number;
    renderTechonology(data.technology, NumberPage);
  });

// Tab keyboard navigation
if (destinationParentElement)
  destinationParentElement.addEventListener('keydown', e => {
    const link = e.target.closest('.switch-page');
    console.log('first');
    if (!link) return;
    console.log(link);
    link.focus();
    let tabNumber = link.dataset.tabNumber;

    const keyboardLeft = 37;
    const keyboardRight = 39;
    if (keyboardLeft === e.keyCode) {
      if (tabNumber == 0) tabNumber = 3;
      else tabNumber--;
      renderDesitnation(data.destinations, tabNumber);
    }

    if (keyboardRight === e.keyCode) {
      if (tabNumber == 3) tabNumber = 0;
      else tabNumber++;
      renderDesitnation(data.destinations, tabNumber);
    }
    document.querySelector(`[data-tab-number="${tabNumber}"]`).focus();
  });

if (crewParentElement)
  crewParentElement.addEventListener('keydown', e => {
    const link = e.target.closest('.switch-page');

    if (!link) return;
    link.focus();
    let dotNumber = link.dataset.dotNumber;

    const keyboardLeft = 37;
    const keyboardRight = 39;
    if (keyboardLeft === e.keyCode) {
      if (dotNumber == 0) dotNumber = 3;
      else dotNumber--;

      renderCrew(data.crew, dotNumber);
    }

    if (keyboardRight === e.keyCode) {
      if (dotNumber == 3) dotNumber = 0;
      else dotNumber++;

      renderCrew(data.crew, dotNumber);
    }
    document.querySelector(`[data-dot-number="${dotNumber}"]`).focus();
  });
