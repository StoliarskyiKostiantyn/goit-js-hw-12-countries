import './sass/main.scss';

import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import debounce from 'lodash.debounce';

import fetchCountries from './js/fetchCountries';
import countriesListMarkup from './templates/countriesList.hbs';
import countriesCardMarkup from './templates/countriesCard.hbs';

const refs = {
  input: document.querySelector('.input_country'),
  countryCard: document.querySelector('.block_card'),
};

refs.input.addEventListener('input', debounce(onInputSearch, 500));

let inputValue = '';

function onInputSearch(evt) {
  inputValue = evt.target.value.trim();
  refs.countryCard.innerHTML = '';

  if (!inputValue) {
    return;
  } else {
    fetchCountries(inputValue)
      .then(updateNameNotification)
      .catch(error => console.log(error));
  }
}

function addCountriesList(countries) {
  const markup = countriesListMarkup(countries);
  refs.countryCard.insertAdjacentHTML('beforeend', markup);
}

function addCountriesCard(countries) {
  const markup = countriesCardMarkup(countries[0]);
  refs.countryCard.insertAdjacentHTML('beforeend', markup);
}

function updateNameNotification(name) {
  if (name.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
    return;
  }
  if (name.length >= 2 && name.length <= 10) {
    addCountriesList(name);
    return;
  }
  addCountriesCard(name);
}
