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
    <main>
      <h1>My Favourites ({counter} games)</h1>
      <section className="game-libary">
        {games.length === 0 ? (
          <p>There is no games added to favourites!</p>
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
    </main>
  );
}

export default MyFavourites;