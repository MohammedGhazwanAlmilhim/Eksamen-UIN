import React, { useState, useEffect } from 'react';
import { getTenLatestGames } from '../lib/services/gameService';
import GameCard from '../components/GameCard';

function GameShop() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);

  const fetchTenLatestGames = async () => {
    const data = await getTenLatestGames();
    setGames(data.games);
    setCount(data.count);
  };

  useEffect(() => {
    fetchTenLatestGames();
  }, []);

  return (
    <main>
      <h1>Gameshop ({count} games)</h1>
      <section className="gameshop-page">
        {games.length === 0 ? (
          <p>No games to show</p>
        ) : (
          games.map((item) => (
            <GameCard
              key={item._id}
              slug={item.slug}
              id={item.apiid}
              title={item.title}
              img={item.bilde}
              genres={item.sjangere.map((sjanger) => sjanger.navn).join(', ')}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default GameShop;
