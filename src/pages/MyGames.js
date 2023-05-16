import React, { useState, useEffect } from 'react';
import { getTweentyActionGames } from '../lib/services/gameService';
import GameCard from '../components/GameCard';

function MyGames() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);

  const fetchTweentyActionGames = async () => {
    const data = await getTweentyActionGames();
    setGames(data.games);
    setCount(data.count);
  };

  useEffect(() => {
    fetchTweentyActionGames();
  }, []);

  return (
    <main>
      <h1>My Games-Library ({count} games)</h1>
      <section className="game-library">
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
              playtime={item.timerspilt}
              genres={item.sjangere.map((sjanger) => sjanger.navn).join(', ')}
              cardLink={true}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default MyGames;
