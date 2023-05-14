import React, { useState, useEffect } from 'react';
import { getMyFavourites } from '../lib/services/userService';
import GameCard from './GameCard';

function MyFavourites() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storageValue = localStorage.getItem('GamehubUser');
    const arrayValue = JSON.parse(storageValue);
    const email = arrayValue[1];
  
    getMyFavourites(email)
      .then(response => {
        if (Array.isArray(response.games)) {
          setGames(response.games);
          setCount(response.count);
        } else {
          setGames([]);
          setCount(0);
        }
      })
      .catch(error => {
        console.error('Error retrieving favourites:', error);
      });
  }, []);
  return (
    <aside>
      <h2>My Favourites - {count}</h2>
      <div className="my-favourites">
        {games.length === 0 ? (
          <p>Ingen spill å vise</p>
        ) : (
          games.map((item) => (
            <GameCard
              key={item.apiid}
              id={item.apiid}
              title={item.title}
              img={item.bilde}
              genres={item.sjangere.map(sjanger => sjanger.navn).join(', ')}
            />
          ))
        )}
      </div>
    </aside>
  );
}

export default MyFavourites;
