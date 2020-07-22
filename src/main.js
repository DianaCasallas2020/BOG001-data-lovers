//import { example } from './data.js';

const invocation = new XMLHttpRequest();
const fileCharacter = document.getElementById('fileCharacters');
const fileEpisodes = document.getElementById('fileEpisodes');

async function get(url) {
   try {
      let data = await fetch(url)
      return await data.json()
   } catch (error) {
    console.log(`error con el servicio ${url}`);
   }
}

const fetchCharacters = async () => {
  const promises = [];
   for (let i = 1; i < 494; i++){
      const url = `https://rickandmortyapi.com/api/character/${i}`;
   promises.push(fetch(url).then(res => res.json()));
}

      Promise.all(promises).then(results => {
         const allCharacters = results.map((data, index) => ({
            name: data.name,
            id: index + 1,
            image: data.image,
            species: data.species,
            episode: data.episode,
         }));
         displayCharacters(allCharacters);
      });

};

const displayCharacters = (allCharacters) =>{
   console.log(allCharacters);
   const characterHTMLString = allCharacters.map ((allPersonage) =>

   `<li class="cont03" onclick="selectCharacter(${allPersonage.id})">
      <img class="imgCharacteres" src="${allPersonage.image}" alt="rick-and-morty-image">
      <h2 class="name">${allPersonage.name}</h2>
   </li>`

   )

   .join('');
   
      fileCharacter.innerHTML = characterHTMLString;

};



window.selectCharacter = async (id) => {
   const url = `https://rickandmortyapi.com/api/character/${id}`;
   const res = await fetch(url);
   const allPersonage = await res.json();
   loadModal(allPersonage);
}

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
                  <p class="textModal"><small>Status: </small><br>${allPersonage.status}</p>
                  <p class="textModal"><small>Specie: </small><br>${allPersonage.species}</p>
                  <p class="textModal"><small>Gender: </small><br>${allPersonage.gender}</p>
                  <p class="textModal"><small>First seen in: </small><br>${allPersonage.origin.name}</p>
                  <p class="textModal"><small>Last known location: </small><br>${allPersonage.location.name}</p>
                  <p class="text"><small>Episodes: </small><br>${allPersonage.episode}</p>
               </article>
            </div>
         </div>
      </section>`;
      fileCharacter.innerHTML = htmlString + fileCharacter.innerHTML;
      console.log(htmlString);   
};

window.closeModal = async () => {
   const modal = document.querySelector('#myModal');
   modal.parentElement.removeChild(modal);
};

fetchCharacters();