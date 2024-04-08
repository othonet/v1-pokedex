const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonPromises = [];

    for(let i =  1; i <= 150; i++){
        const promisesPokemon = fetch(getPokemonUrl(i)).then(response => response.json());
        pokemonPromises.push(promisesPokemon);
    }

    Promise.all(pokemonPromises).then(pokemons => {

        const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
            const sprites = pokemon.sprites;
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            accumulator += `<li class="card">
            <img loading="lazy" class="card-image ${types[0]}" alt="${pokemon.name}" src="${sprites['front_default']}">
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(" | ")}</p>
            </li>`;
            return accumulator;
        }, '');

        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = lisPokemons;
    }
    )}

fetchPokemon();