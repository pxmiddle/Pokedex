const pokemonName = document.querySelector('.pokemon_name');
const pokemonID = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if(APIResponse.status === 200){
    
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) =>{

  pokemonName.innerHTML = 'Loading...';
  pokemonID.innerHTML ='';

  const data = await fetchPokemon(pokemon);

  if (data){
   pokemonImage.style.display = 'block';
   pokemonName.innerHTML = data.name;
   pokemonID.innerHTML =data.id;
   if (data.id < 650){
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    } else {
      pokemonImage.src = data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default'];
    }

   input.value= '';
   searchPokemon =data.id;
  } else{
      pokemonName.innerHTML = 'Not Found';
      pokemonID.innerHTML = '';
      pokemonImage.style.display = 'none';

  }
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value);
});

buttonPrev.addEventListener('click', () => {
  if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon);