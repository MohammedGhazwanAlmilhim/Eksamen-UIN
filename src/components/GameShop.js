import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNewestGames } from '../lib/services/gameService';
import GameCard from './GameCard';

function GameShop() {
  const [games, setGames] = useState([]);

  const fetchNewestGames = async () => {
    const data = await getNewestGames();
    setGames(data.games);
  };

  useEffect(() => {
    fetchNewestGames();
  }, []);

  return (
    <header>
      <section className="indicator">
        <h1>Gameshop</h1>
        <Link to="/gameshop">Visit Gameshop</Link>
      </section>
      <div className="latest-games">
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
      </div>
    </header>
  );
}

export default GameShop;
