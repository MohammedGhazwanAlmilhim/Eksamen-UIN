import React from 'react';
import GameCard from './GameCard';
import { store } from '../resources/games.js';

function GameShop() {
  const sortedGames = store.sort((a, b) => new Date(b.released) - new Date(a.released)).slice(0, 3);
  return (
    <header>
      <h1>Gameshop</h1>
      <div className="latest-games">
        {sortedGames.map(item => (
          <GameCard
            id={item.id}
            title={item.title}
            img={item.img}
            genres={item.genres.join(', ')}
          />
        ))}
      </div>
    </header>
  );
}

export default GameShop;
