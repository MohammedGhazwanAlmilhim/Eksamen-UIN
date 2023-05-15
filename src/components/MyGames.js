import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFourActionGames } from '../lib/services/gameService';
import GameCard from './GameCard2';

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
        <section className="indicator">
        <Link to="/mygames">Go to libary</Link>
      </section>
    </main>
  );
}

export default MyGames;
