import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';

//For MyGames seksjon, hent 4 spill fra en valgri sjanger (action) som vises i seksjonen My Games i dashboard, 
//For My Games-biblioteksiden (/mygames) hent 20 spill fra samme sjanger.

function MyGames() {
  //Bruk useState for å lagre 3 spill i en tilstandsvariabel
  const [results, setResults] = useState([]);
  
  //Bruk useState for å lagre 20 spill i en annen tilstandsvariabel

  const API_KEY = '9ef4069dd9d14052ac1ae49bd4da623b';

  const getGames = async () => {
      const response = await fetch(`https://rawg.io/api/games?key=${API_KEY}&lang=en&genres=4&page_size=4`);
      const data = await response.json();
      setResults(data.results);
      console.log(data);
  };

  useEffect(() => {
      getGames();
  }, []);

  return (
    <main>
    <h1>My Games - Libary</h1>
    <section className="game-libary">
          {results && results.map((item)=> (
              <GameCard
                  id={item.id}
                  title={item.name}
                  img={item.background_image}
                  genres={item.genres.map(genre => genre.name).join(', ')}
                  />
          ))}
      </section>
      </main>
  );
}

export default MyGames;
