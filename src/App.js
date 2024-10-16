import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Recupera la lista iniziale di Pokémon (ad esempio, i primi 10)
    fetchPokemonList(10);
  }, []);

  const fetchPokemonList = async (limit) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/pokemon?limit=${limit}`
      );
      setPokemonList(response.data);
    } catch (err) {
      console.error(err);
      setError("Errore nel recupero della lista dei Pokémon");
    }
  };

  const fetchPokemon = async (nameOrId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/pokemon/${nameOrId}`
      );
      setPokemon(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Pokémon non trovato");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      fetchPokemon(query.toLowerCase());
    }
  };

  return (
    <div className='App'>
      <h1>Pokémon App</h1>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          placeholder='Cerca Pokémon per nome o ID'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type='submit'>Cerca</button>
      </form>

      {error && <p className='error'>{error}</p>}

      {pokemon && (
        <div className='pokemon-details'>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>ID: {pokemon.id}</p>
          <p>Altezza: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
        </div>
      )}

      <h2>Lista Pokémon</h2>
      <ul>
        {pokemonList.map((p, index) => (
          <li key={index}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
