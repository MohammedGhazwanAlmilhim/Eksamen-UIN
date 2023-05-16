import React, { useState, useEffect } from 'react';
import { getTenLatestGames } from '../lib/services/gameService';
import GameCard from '../components/GameCard';

//Hent ut de 10 nyeste for visning på /gameshop (når du klikker linken "Visit Shop")

function GameShop() {
const [games, setGames] = useState([]);
const [count, setCount] = useState(0);

useEffect(() => {
  Promise.all([getTenLatestGames()]).then(([data]) => {
    setGames(data.games);
    setCount(data.count);
  });
  
}, []);

  return (
        <main>
          <h1>Gameshop ({count} games)</h1>
          <section className="gameshop-page ">
            {games.map((item) => (
              <GameCard
                key={item._id}
                slug={item.slug}
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
