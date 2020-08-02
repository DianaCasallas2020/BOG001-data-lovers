//import { numOfCharacters } from './data.js';

const fileCharacter = document.getElementById('fileCharacters');
const pagination = document.getElementById('pagination');
const searchBar = document.getElementById('searchBar');
const totalCharacters = document.getElementById('totalCharacters');
let allCharacters = [];
let defaultPage = 1;
let allPages = [];


searchBar.addEventListener('keyup', (e) => {
   const searchString = e.target.value.toLowerCase();
   const filterCharacters = allCharacters.filter(character =>{
      return character.name.toLowerCase().includes(searchString) ||
      character.status.toLowerCase().includes(searchString) ||
      character.species.toLowerCase().includes(searchString);
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

const Characters = async () => {
   const promises = [];

   const url = `https://rickandmortyapi.com/api/character/?page=${defaultPage}`;
   promises.push(fetch(url).then(res => res.json().then(data => {
      allPages = data.info.pages;
      allCharacters = data.results;
      allCharacters.map(result => ({
         name: result.name,
         id: result.id,
         image: result.image,
         species: result.species,
         episode: result.episode,
         status: result.status,
         origin: result.origin.name,
         location: result.location.name,  
      }));
      //console.log(allCharacters);
      displayCharacters(allCharacters)
   })))
};

window.more = async () => {
   if (defaultPage <= allPages) {
      defaultPage += 1;
      Characters();
   }
};

window.less = async () => {
      defaultPage -= 1;
      Characters();
};

const forPages = async () => {
   const pagesHTMLString = allPersonage => {
   `<section>
   <button id="seeMore" onclick="less()">Previus</button>
   <button id="seeMore" onclick="more()">Next</button>
   </section>`
   };

   pagination.innerHTML = pagesHTMLString;

};

const displayCharacters = (allCharacters) => {
   const characterHTMLString = allCharacters.map((allPersonage) =>

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
   const allPersonage = await res.json();

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
               <article class="contEpisodes">
               <a type="button" class="btnEpisodios" onclick=episodesHide()>Episodes</a>
               </article>
               <article id="showHide">
                  <p class="textEpisodes">${allPersonage.episode.join(', ')}</p>
               </article>
            </div>
         </div>
      </section>`;
   fileCharacter.innerHTML = htmlString + fileCharacter.innerHTML;

};

window.closeModal = async () => {
   const modal = document.querySelector('#myModal');
   modal.parentElement.removeChild(modal);
};

const openEpisodes = () => {
   document.getElementById('showHide').style.display = 'block';
};
const closeEpisodes = () => {
   document.getElementById('showHide').style.display = 'none';
};

window.episodesHide = () => {
   let showHide = document.getElementById('showHide');

   if(showHide.style.display == 'none'){
      openEpisodes();
   }else{
      closeEpisodes();
   };
};




forPages();

Characters();






