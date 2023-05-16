import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNewestGames } from '../lib/services/gameService';
import GameCard from './GameCard';

function GameShop() {
  const [games, setGames] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted

    const fetchNewestGames = async () => {
      const data = await getNewestGames();
      if (isMounted) {
        setGames(data.games);
        setIsLoadingData(false);
      }
    };

    fetchNewestGames();

    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
    };
  }, []);

  return (
    <header>
      <section className="indicator">
        <h1>Gameshop</h1>
        <Link to="/gameshop">Visit Gameshop</Link>
      </section>
      <div className="latest-games">
        {isLoadingData || games.length === 0 ? (
          Array.from({ length: 4 }, (_, index) => (
            <GameCard
              key={index}
              slug=""
              title=""
              img=""
              genres=""
              playtime=""
              cardLink={false}
            />
          ))
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
