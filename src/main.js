import data from './data/rickandmorty/rickandmorty.js';

let listCharacters = document.getElementById('allListOfCharacters')

window.onload =  function allCharacters () {
    let allData = data.results;
    let file = ''
         for ( let i = 0;  i < allData.length; i++) {
            file += `
            <li class= card>
            <h2 class="name">${allData[i].name}</h2>
            <img class ="image_pokemon" src="${allData[i].img}" alt="pokemon-image">
            `
       };
       listCharacters.innerHTML = file;
      };

      