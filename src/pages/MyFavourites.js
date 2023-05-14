//MyFavorites som lister opp alle spill fra mygames-array inne i games.js filen hvor "fav:true"

//For MyFavourites, lag funksjonalitet som gjør følgende:
//På visning av ett spill (, ha en knapp "Legg til favoritter".
//Klikk på knappen "Legg til favoritter" skal lagre spillet i en array i en state kalt favourites.
//MyFavourites skal hente/vise spill fra favourites-staten.

import React, { useState, useEffect } from 'react';
import { getUserFavourites } from '../lib/services/userService';
import GameCard from '../components/GameCard';

function MyFavourites() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    Promise.all([getUserFavourites()]).then(([response]) => {
      setGames(response.games);
      setCount(response.count);
    });
  }, []);

  return (
    <main>
      <h1>My Favourites - {count}</h1>
      <section className="game-libary">
      {games.map((item)=> (
          <GameCard
            key={item.apiid}
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

export default MyFavourites;
