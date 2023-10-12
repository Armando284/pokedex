"use strict";
const pokeContainer = document.getElementById('poke-container');
const POKEMONS_TO_FETCH = 10; // * Cambia este numero para sacar mas son como 2000

/**
 * Esta funcion se ejecuta automaticamente,es una IFEE
 * con ella llamo los datos iniciales
 */
(function () {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMONS_TO_FETCH}`)
    .then(response => response.json())
    .then(allpokemon => {
      allpokemon.results.forEach(fetchPokemonData);
    });
})();

/**
 * con esta funcion obtengo los datos de cada pokemon
 * se llama una vez por cada pokemon recivido 
 * @param {object} pokemon 
 */
function fetchPokemonData(pokemon) {
  const url = pokemon.url;
  fetch(url)
    .then(response => response.json())
    .then(function (pokeData) {
      pokeContainer.innerHTML += createPokeCard(pokeData);
    });
}

/**
 * Esta funcion genera el card de cada pokemon con un template literal
 * y lo retorna como string para añadirlo al contenedor
 * @param {object} pokemon 
 * @returns 
 */
function createPokeCard(pokemon) {
  return `<div class="poke-card col-1">
    <img src="${createPokeImage(pokemon.id)}" />
    <h3>${pokemon.name}</h3>
  </div>`;
}

/**
 * Esta funcion genera el src de las imagenes de los pokemones
 * es aparte porque la url puede cambiar
 * @param {number} pokeID 
 * @returns 
 */
function createPokeImage(pokeID) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;
}