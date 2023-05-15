import React, { useState, useEffect } from 'react';
import { getTenLatestGames } from '../lib/services/gameService';
import GameCard from '../components/GameCard';

//Hent ut de 10 nyeste for visning på /gameshop (når du klikker linken "Visit Shop")

function GameShop() {
const [games, setGames] = useState([]);

useEffect(() => {
  Promise.all([getTenLatestGames()]).then(([games]) => {
    setGames(games);
  });
  
}, []);

  return (
        <main>
          <h1>Gameshop</h1>
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

export default GameShop;
