//import { orderNames } from './data.js';

const fileCharacter = document.getElementById('fileCharacters');
const pagination = document.getElementById('pagination');
const fileEpisodes = document.getElementById('fileEpisodes');
const searchBar = document.getElementById('searchBar');
let allCharacters = [];
let allPersonage =[];
let allPages = [];

searchBar.addEventListener('keyup', (e) => {
   const searchString = e.target.value.toLowerCase();
   console.log(searchString);
   const filterCharacters = allCharacters.filter(character => {
      return character.name.toLowerCase().includes(searchString) ||
      character.species.toLowerCase().includes(searchString) ||
      character.status.toLowerCase().includes(searchString) ||
      character.origin.toLowerCase().includes(searchString)||
      character.location.toLowerCase().includes(searchString)
   });
   displayCharacters(filterCharacters);
});

async function get(url) {
   try {
      let data = await fetch(url)
      return await data.json()
   } catch (error) {
    console.log(`error con el servicio ${url}`);
   };
};

const fetchCharacters = async () => {
  const promises = [];
   for (let i = 1; i < 494; i++){
      const url = `https://rickandmortyapi.com/api/character/${i}`;
   promises.push(fetch(url).then(res => res.json()));
};

      Promise.all(promises).then( results => {

         allCharacters = results.map( data => ({
            name: data.name,
            id: data.id,
            image: data.image,
            species: data.species,
            episode: data.episode,
            status: data.status,
            origin: data.origin.name,
            location: data.location.name,
         }));
         displayCharacters(allCharacters);
      });

};

const fetchAllPages = () => {
   const url = `https://rickandmortyapi.com/api/character/`;
   fetch(url)
   .then (res => res.json())
   .then (data => {
      allPages = data.info;
   });
   forPages(allPages)
};

const forPages = (allPages) =>{
   const pagesHTMLString = allPersonage => {

   `<section>
   <button id="seeMore">Previus</button>
   <button id="seeMore">Next</button>
   </section>
   `
   };

   pagination.innerHTML = pagesHTMLString;

};

fetchAllPages();

const displayCharacters = (allCharacters) =>{
   const characterHTMLString = allCharacters.map ((allPersonage) =>

   `<li class="cont03" onclick="selectCharacter(${allPersonage.id})">
      <img class="imgCharacteres" src="${allPersonage.image}" alt="rick-and-morty-image">
      <h2 class="name">${allPersonage.name}</h2>
   </li>`)

   .join('');
   
   fileCharacter.innerHTML = characterHTMLString;

};

window.selectCharacter = async (id) => {
   const url = `https://rickandmortyapi.com/api/character/${id}`;
   const res = await fetch(url);
   allPersonage = await res.json();

   loadModal(allPersonage);
};

const loadModal = (allPersonage) => {
   const htmlString = `
      <section class="modal" id="myModal">
         <div class="flex" id="flex">
            <div class="contenido-modal">
               <article class="modal-header flex">
                  <h2 class="nameModal">${allPersonage.name}</h2>
                  <button class="close" onclick="closeModal()">&times;</button>
               </article>
               <article class="imgPersonaje">
                  <img class="imgCharacteres" src="${allPersonage.image}" alt="rick-and-morty-image">
               </article>
               <article class="infoPersonaje">
                  <p class="textModal"><small>Status </small><br>${allPersonage.status}</p>
                  <p class="textModal"><small>Specie </small><br>${allPersonage.species}</p>
                  <p class="textModal"><small>Gender </small><br>${allPersonage.gender}</p>
                  <p class="textModal"><small>First seen in </small><br>${allPersonage.origin.name}</p>
                  <p class="textModal"><small>Last known location </small><br>${allPersonage.location.name}</p>
               </article>
               <button class="btnEpisodios" onclick="openEpisodes()">Episodes</button>
            </div>
         </div>
      </section>`;
      fileCharacter.innerHTML = htmlString + fileCharacter.innerHTML;
};

window.closeModal = async () => {
   const modal = document.querySelector('#myModal');
   modal.parentElement.removeChild(modal);
};


fetchCharacters();

