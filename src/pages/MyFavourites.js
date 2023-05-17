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

  const storageValue = localStorage.getItem('GamehubUser');
  const arrayValue = JSON.parse(storageValue);
  const name = arrayValue[1];
  const email = arrayValue[0];

  const fetchUserFavouriteGames = async () => {
    const data = await getUserFavourites(name, email);

    if (data.games[0].favoriteGames == null && data.games[0].count == null) {
      setGames([]);
      setCount(0);
    } 
    
    else if(data){
      setGames(data.games[0].favoriteGames);
      setCount(data.games[0].count);
    }
  };

  useEffect(() => {
    fetchUserFavouriteGames();
  }, []);  

  return (
    <main>
      <h1>My Favourites ({count} games)</h1>
      <section className="game-library">
        {games.length == 0 ? (
          <p>There is no games added to favourites!</p>
        ) : (
          games.map((item) => (
            <GameCard
              key={item._id}
              slug={item.slug}
              id={item.apiid}
              title={item.title}
              img={item.bilde}
              playtime={item.timerspilt}
              cardLink={true}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default MyFavourites;