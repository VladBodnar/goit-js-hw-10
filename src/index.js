import './css/styles.css';
import { FetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');

const fetchCountrie = new FetchCountries();

const searchContry = () => {
  listRef.innerHTML = '';
  const searchQuery = inputRef.value.trim().toLowerCase();
  fetchCountrie
    .getCountries(searchQuery)
    .then(results => {
      if (results.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (results.length === 1) {
        const markupOne = createMarkurOne(results);
        listRef.insertAdjacentHTML('beforeend', markupOne);
        return;
      }
      const markup = createMarkur(results);
      listRef.insertAdjacentHTML('beforeend', markup);
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
};

inputRef.addEventListener(
  'input',
  debounce(() => {
    searchContry();
  }, DEBOUNCE_DELAY)
);

function createMarkur(countriesInfo) {
  return countriesInfo
    .map(({ name, flags }) => {
      return /*html*/ `<li class="countries__item">      
      <h1 class = countries__name-official><img src = "${flags[0]}" alt = "flag" class = countries__flag width = "50 px">${name.official}</h1>      
      `;
    })
    .join('');
}

function createMarkurOne(countriesInfo) {
  return countriesInfo
    .map(({ name, flags, capital, population, languages }) => {
      let countryLanguage = Object.values(languages);
      return /*html*/ `<li class="countries__item">          
          <h1 class = countries__name-official>  <img src = "${flags[0]}" alt = "flag" class = countries__flag width = "50 px" >${name.official}</h1>
          <p class = countries__capital>Capital: ${capital}</p>
          <p class = countries__population>Population: ${population}</p>
          <p class = countries__languages>Languages: ${countryLanguage}</p>          
          `;
    })
    .join('');
}
