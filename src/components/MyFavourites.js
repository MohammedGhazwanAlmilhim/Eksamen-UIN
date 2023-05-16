import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserFavourites } from '../lib/services/userService';
import GameCard from './GameCard';

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
          setCounter(response.count);
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
      <h2>My Favourites  ({counter} games)</h2>
      <section className="my-favourites">
        {games.length === 0 ? (
          <p>Ingen spill å vise</p>
        ) : (
          games.map((item) => (
            <GameCard
              key={item.apiid}
              id={item.apiid}
              title={item.title}
              img={item.bilde}
              playtime={item.timerspilt}
              cardLink={true}
            />
          ))
        )}
      </section>
      <section className="indicator">
        <Link to="/favourites">Go to favourites</Link>
      </section>
    </aside>
  );
}

export default MyFavourites;