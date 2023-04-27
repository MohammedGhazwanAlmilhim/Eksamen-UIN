import React, { useState, useEffect } from 'react';
import { getMyFavourites } from '../lib/services/userService';
import GameCard from './GameCard';

function MyGames() {
  const [games, setGames] = useState([]);


  useEffect(() => {
    getMyFavourites().then((response) => {
      setGames(response.games);
    });
  }, []);

  return (
    <aside>
      <h2>My Favourites </h2>
      <div className="my-favourites">
        {games && games.length > 0 ? (
          games.map((item) => (
            <GameCard
              key={item._id}
              id={item.apiid}
              title={item.title}
              img={item.bilde}
            
            />
          ))
        ) : (
          <p>You have no favourites yet!</p>
        )}
      </div>
    </aside>
  );
}

export default MyGames;
