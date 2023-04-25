import React from 'react';
import GameCard from './GameCard';
import { mygames } from '../resources/games.js';


//For MyFavourites, lag funksjonalitet som gjør følgende:
//På visning av ett spill (, ha en knapp "Legg til favoritter".
//Klikk på knappen "Legg til favoritter" skal lagre spillet i en array i en state kalt favourites.
//MyFavourites skal hente/vise spill fra favourites-staten.

function MyFavourites() {
  const filteredGames = mygames.filter(game => game.fav);
  return (
    <aside>
      <h1>Favourites</h1>
      <div className="my-favourites">
        {filteredGames.map(item => (
          <GameCard
            key={item.id}
            title={item.title}
            img={item.img}
            genres={item.genres.join(', ')}
          />
        ))}
      </div>
    </aside>
  );
}

export default MyFavourites;
