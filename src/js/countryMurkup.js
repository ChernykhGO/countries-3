import '../css/style.css'
import countyCardTpl from '../templates/country-cards.hbs'
import debounce from 'lodash.debounce';
import API from './fetchCountries';
import getRefs from './refs';
const refs = getRefs();


const outputRef = document.querySelector('.img-card');

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import {success, error} from '@pnotify/core';
refs.searchForm.addEventListener('input', debounce(onSearch, 1000));

function onSearch (e) {
    // Получаем значение импута и вставляем значение в функцию
    const form = e.target;
    const searchQuery = form.value.trim().toLowerCase();
    // console.log(searchQuery);

    API.fetchCountryByName(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError);
};

import countriesHbs from '../templates/countries.hbs';

// Когда промис выполнится с результатом выполняем фунцию, рендерим
function renderCountryCard(country) {

      if (country.length > 1 && country.length < 11) {
        const markupList = countriesHbs(country);
        refs.cardContainer.innerHTML = markupList;
          console.log('есть, вводите дальше');
        return;
      }

      if (country.status === 404) {
        getClear();
        error({
          text: 'Not Found country!',
          addClass: 'error',
          delay: 300,
        });
        console.log('ошибка'); 
        return;
      }

      if (country.length > 10) {
        getClear();
        // onFetchError();
        error({
            title: 'Ok!',
            text: 'Please enter a more spesific query.',
            delay: 700,
          });
          console.log('вводить дальше');
        return;
      }

      const markup = countyCardTpl(country);
      // console.log(markup)
      outputRef.innerHTML = markup;
      // searchForm.input.value = '';
      document.getElementById('keyword').value = '';
      success({
          title: 'Success!',
          text: 'That thing that you were trying to do worked.'
        });
        console.log('успех');
        // refs.searchForm.value.innerHTML = '';
        return
  };


function getClear() {
    refs.cardContainer.innerHTML = '';
  }

function onFetchError(){
    error({
        title: 'Oh No!',
        text: 'Not Found country!',
        delay: 500,
      });
      console.log('такой страны не найдено');
      return
}









// const r = fetch('https://restcountries.eu/rest/v2/name/a')
// .then(response => {
//     return response.json()
// }).then(country => {
//     console.log(country);
//     const markup = countyCardTpl(country)
//     // console.log(markup)
//     refs.cardContainer.innerHTML = markup;
// }).catch(error => {
//     console.log(error)
// });

// if (country) {
//     getClear();
//     const markup = countryTpl(country);
//     refs.cardContainer.innerHTML = markup;
//     return;
//   }