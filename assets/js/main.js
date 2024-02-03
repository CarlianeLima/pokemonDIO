const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="abrirModal('vis-modal', this)">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

//----- modal informartions -------
function abrirModal(abrirModal, clickedPokemon) {
    let modal = document.getElementById(abrirModal);

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Encontrar o elemento .name dentro do elemento clicado
    let pokemonName = clickedPokemon.querySelector('.name').innerText;
    console.log('pokemonName: ' + pokemonName);

    document.getElementById('pokemonName').innerText = pokemonName;

    //image
    let pokemonImage = clickedPokemon.querySelector('img').src;
    document.getElementById('pokemonImage').src = pokemonImage;

    //number
    let pokemonNumber = clickedPokemon.querySelector('.number').innerText;
    document.getElementById('pokemonNumber').innerText = pokemonNumber;

    //types
    let pokemonTypes = clickedPokemon.querySelectorAll('.type');
    let types = '';
    pokemonTypes.forEach(type => {
        types += type.innerText + ' ';
    });
    document.getElementById('pokemonTypes').innerText = types;
    
}

function fecharModal(fecharModal) {
    let modal = document.getElementById(fecharModal);

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}