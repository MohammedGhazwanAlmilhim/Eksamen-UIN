import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';

//Hent ut de 10 nyeste for visning på /gameshop (når du klikker linken "Visit Shop")

const API_KEY = '9ef4069dd9d14052ac1ae49bd4da623b';

function GameShop() {
  const [results, setResults] = useState([]);
  const getGames = async () => {
      const response = await fetch(`https://rawg.io/api/games?key=${API_KEY}&lang=en`);
      const data = await response.json();
      const sortedGames = data.results.sort((a, b) => new Date(b.released) - new Date(a.released)).slice(0, 10);
      setResults(sortedGames);
  };
    useEffect(() => {
        getGames();
    }, []);

  return (
        <main>
          <h1>Gameshop</h1>
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

export default GameShop;
