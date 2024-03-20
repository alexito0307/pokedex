import React, { useEffect, useState } from 'react'
import apiRequest from './apiRequest';

const Content = () => {

  const [userPokemons, setUserPokemons] = useState([]);
  const [initialState, setInitialState] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [fetchSuccessful, setFetchSuccessful] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;
  const localhost = "http://localhost:3500/db/userPokemons";

  //FetchItem function to call API
  const fetchItem = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error ('Did not received expected data');
      if (response.ok) 
      {
        setFetchSuccessful(true);
      }
      else
      {
        setFetchSuccessful(false);
      }
      const critter = await response.json();
      setPokemon(critter);      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // const addPokemon = async (item) =>
  // {
  //   const newPokemon = item;
  //   const postOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newPokemon)
  //   }
  //   const result = await apiRequest(API_URL, postOptions);
  // }

  const handleChange = (e) =>
  {
    setInputValue(e.target.value);
    setInitialState(true);
  }

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    if(inputValue && inputValue.trim() !== '' && inputValue.trim() !== '.' && inputValue.trim() !== './')
    {
      fetchItem();
    } else {
      console.log('Did not received expected data');
    }
  }

  return (
    <main>
      {!initialState && 
        <div className='Content'>
          <div className='InitialStateText'>
            Ingrese el nombre de su pokemon favorito!
          </div>
        </div>
      }

      {isLoading && initialState && !fetchSuccessful && <p style={{ backgroundColor: '#333333' , color: '#B3B8BC', textAlign: 'center', width: '70%', margin: 'auto', marginTop: '20px'}}>Loading..</p>}

      {!isLoading && initialState && pokemon && fetchSuccessful &&
        <div className='Content'>
          <div className='PokemonImage'>
            {pokemon && <img src={pokemon.sprites.front_default} alt="Pokemon Image"/>}
          </div>
          <div className='PokemonInfo'>
            <span style={{ color: '#468CDE', fontSize: '4.375rem' }}>{pokemon.name.toUpperCase()}</span>
            <p>HP: {pokemon.stats[0]['base_stat']}</p>
            <p>Atack Damage: {pokemon.stats[1]['base_stat']}</p>
            <p>Defense: {pokemon.stats[2]['base_stat']}</p>
            <p>Special Atack: {pokemon.stats[3]['base_stat']}</p>
            <p>Special Defense: {pokemon.stats[4]['base_stat']}</p>
            <p>Speed: {pokemon.stats[5]['base_stat']}</p>
          </div>
        </div>
      }

      <div className='FormsSpace' style={{ marginTop: '10px' }}>
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputValue} onChange={handleChange} placeholder='Pokémon...' className='FormsInput'/>
          <button>
            Agregar a mi equipo
          </button>
          <button>
            Ver mi equipo
          </button>
        </form>
      </div>
    </main>

  )
}

export default Content