import React from 'react';
import GameCard from './GameCard';
import { mygames } from '../resources/games.js'; 

function MyGames() {
  return (
    <main>
    <h1>My Games - Libary</h1>
    <section className="game-libary">
          {mygames.map(item => (
              <GameCard
                  id={item.id}
                  title={item.title}
                  img={item.img}
                  genres={item.genres.join(', ')} />
          ))}
      </section>
      </main>
  );
}

export default MyGames;
