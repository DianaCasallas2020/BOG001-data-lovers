//import { example } from './data.js';
import data from './data/rickandmorty/rickandmorty.js';

let charactersCard = document.getElementById('allCharacters'),
     boton = document.getElementById('btnDetails');


window.onload = function characters () {
  let allData = data.results;
  let card = ''
  for (let i = 0; i < allData.length; i++) {
    card += `
          <article class="cont03">
               <img class ="image_characters" src="${allData[i].image}" alt="rick-and-morty-image">
               <h2 class="name">${allData[i].name}</h2>
               <button id="btnDetails" class="informacion">Details</button>
          </article>`
  };
  charactersCard.innerHTML= card;
};


boton.addEventListener('click', () => {
     
})






/*boton.addEventListener('click', () => {
     let allData = data.results;
    let card = '';
         for ( let i = 0;  i < allData.length; i++) {
            card += `<h2 class="name">${allData[i].species}</h2>`
       };
       document.getElementById('allSpecies').innerHTML= card;
      });*/
