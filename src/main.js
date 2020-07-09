//import { example } from './data.js';
import data from './data/rickandmorty/rickandmorty.js';

window.onload = function results (allCharacters){
    let allData = data.results;
    let card = ''
         for ( let i = 0;  i < allData.length; i++) {
            card += `
            <li class= card>
            <h2 class="name">${allData[i].name}</h2>
            <img class ="image_pokemon" src="${allData[i].image}" alt="rick-image">
            <button class="btn_aboutMe">About me</button> 
            `
       };
       document.getElementById('listOfPokemon').innerHTML = card;
      };

console.log(example, data);
