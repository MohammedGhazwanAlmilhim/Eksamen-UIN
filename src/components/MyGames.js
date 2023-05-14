import React, { useState, useEffect } from 'react';
import { getFourActionGames } from '../lib/services/gameService';
import GameCard from './GameCard';

function MyGames() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    Promise.all([getFourActionGames()]).then(([response]) => {
      setGames(response.games);
      setCount(response.count);
    });
  }, []);

  return (
    <main>
      <h2>My Games Library - {count} games</h2>
        <section className="game-libary">
        {games.map((item) => (
          <GameCard
            key={item._id}
            id={item.apiid}
            title={item.title}
            img={item.bilde}
            genres={item.sjangere.map(sjanger => sjanger.navn).join(', ')}
            />
        ))}
        </section>
    </main>
  );
}

export default MyGames;
