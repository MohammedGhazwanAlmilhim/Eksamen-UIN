import React, { useState, useEffect } from 'react';
import { getMyFavourites } from '../lib/services/userService';
import GameCard from './GameCard';

function MyFavourites() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    Promise.all([getMyFavourites()]).then(([response]) => {
      setGames(response.games);
      setCount(response.count);
    });
  }, []);

  return (
    <aside>
      <h2>My Favourites - {count}</h2>
      <div className="my-favourites">
      {games.map((item)=> (
          <GameCard
            key={item.apiid}
            id={item.apiid}
            title={item.title}
            img={item.bilde}
            genres={item.sjangere.map(sjanger => sjanger.navn).join(', ')}
          />
        ))}
      </div>
    </aside>
  );
}

export default MyFavourites;
