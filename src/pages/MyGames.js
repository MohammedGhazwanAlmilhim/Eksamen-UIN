import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';

const API_KEY = '9ef4069dd9d14052ac1ae49bd4da623b';

function MyGames() {
  const [results, setResults] = useState([]);

  const getGames = async () => {
    const response = await fetch(`https://rawg.io/api/games?key=${API_KEY}&lang=en&genres=4&page_size=20`);
    const data = await response.json();
    setResults(data.results);
  };

  useEffect(() => {
    getGames();
}, []);

  return (
    <main>
      <h1>My Games - Libary</h1>
          <section className="game-libary">
            {results && results.map((item) => (
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
