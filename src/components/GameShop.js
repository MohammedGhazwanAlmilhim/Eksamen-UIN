import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';

//For GameShop seksjonen, hent ut de tre nyeste spillene for visning i dashboard. 

const API_KEY = '9ef4069dd9d14052ac1ae49bd4da623b';

function GameShop() {
  const [results, setResults] = useState([])

  const getGames = async () => {
      const response = await fetch(`https://rawg.io/api/games?key=${API_KEY}&lang=en`);
      const data = await response.json();
      const sortedGames = data.results.sort((a, b) => new Date(b.released) - new Date(a.released)).slice(0, 3);
      setResults(sortedGames);
  };

  useEffect(() => {
    getGames();
}, []);

  return (
    <header>
      <h1>Gameshop</h1>
      <div className="latest-games">
        {results && results.map((item)=> (
          <GameCard
            key={item.id}
            id={item.id}
            title={item.name}
            img={item.background_image}
            genres={item.genres.map(genre => genre.name).join(', ')}
          />
        ))}
      </div>
    </header>
  );
}

export default GameShop;
