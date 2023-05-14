import React, { useState, useEffect } from 'react';
import { getUserFavourites } from '../lib/services/userService';
import GameCard from './GameCard2';

function MyFavourites() {
  const [games, setGames] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const storageValue = localStorage.getItem('GamehubUser');
    const arrayValue = JSON.parse(storageValue);
    const name = arrayValue[0];
    const email = arrayValue[1];
  
    getUserFavourites(name, email)
      .then(response => {
        if (Array.isArray(response.games) && response !== null) {
          setGames(response.games);
          setCounter(response.counter);
        } else {
          setGames([]);
          setCounter(0);
        }
      })
      .catch(error => {
        console.error('Kan ikke hente favorittspill:', error);
      });
  }, []);
  return (
    <aside>
      <h2>My Favourites - {counter}</h2>
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