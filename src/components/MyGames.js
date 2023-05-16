import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFourActionGames } from '../lib/services/gameService';
import GameCard from './GameCard';

function MyGames() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);

  const fetchFourActionGames = async () => {
    const data = await getFourActionGames();
    setGames(data.games);
    setCount(data.count);
  };

  useEffect(() => {
    fetchFourActionGames();
  }, []);

  return (
    <main>
      <h2>My Games-Library ({count} games)</h2>
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
      <section className="indicator">
        <Link to="/mygames">Go to library</Link>
      </section>
    </main>
  );
}

export default MyGames;
