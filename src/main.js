//import { example } from './data.js';
import data from './data/rickandmorty/rickandmorty.js';


const allCharacters = document.getElementById('allCharacters'),
     modal = document.getElementById('myModal'),
     flex = document.getElementById('flex'),
     open = document.querySelectorAll('#btnDetails'),
     close = document.getElementById('close');
     


window.onload = function characters () {
     let allPersonage = data.results;
     let file = ''
          for (let i = 0; i < allPersonage.length; i++) {
          file += `
               <section class="cont03">
                    <img class ="image_characters" src="${allPersonage[i].image}" alt="rick-and-morty-image">
                    <h2 class="name">${allPersonage[i].name}</h2>
                    <input type="button" value="Details" id="btnDetails" class="informacion"></input>
               </section>`
  };
  allCharacters.innerHTML= file;
};



open.addEventListener('click', () =>{
    modal.style.display = 'block';
});  

close.addEventListener('click', () =>{
     modal.style.display = 'none';
});

window.addEventListener('click', (e) =>{
     if (e.target = flex){
          modal.style.display = 'none'; 
     }
})
 