import React, { useState, useEffect } from 'react';
import { getActionGames } from '../lib/services/service';
import GameCard from './GameCard';

function MyGames() {
const [games, setGames] = useState([]);

useEffect(() => {
  Promise.all([getActionGames()]).then(([games]) => {
    setGames(games);
  });
  
}, []);

  return (
    <main>
      <h1>My Games - Libary</h1>
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
