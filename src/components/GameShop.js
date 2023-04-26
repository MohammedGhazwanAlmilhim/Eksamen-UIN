import React, { useState, useEffect } from 'react';
import { getNewestGames } from '../lib/services/service';
import GameCard from './GameCard';

//For GameShop seksjonen, hent ut de tre nyeste spillene for visning i dashboard. 

function GameShop() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    Promise.all([getNewestGames()]).then(([games]) => {
      console.log(games);
      setGames(games);
    });
  }, []);

  return (
    <header>
      <h1>Gameshop</h1>
      <div className="latest-games">
        {games.map((item)=> (
          <GameCard
            key={item._id}
            id={item.apiid}
            title={item.title}
            img={item.bilde}
            genres={item.sjangere.navn}
          />
        ))}
      </div>
    </header>
  );
}

export default GameShop;
