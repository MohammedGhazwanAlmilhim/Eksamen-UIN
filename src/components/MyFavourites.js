import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserFavourites } from '../lib/services/userService';
import GameCard from './GameCard';

function MyFavorites() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);

  const storageValue = localStorage.getItem('GamehubUser');
  const arrayValue = JSON.parse(storageValue);
  const name = arrayValue[1];
  const email = arrayValue[0];

  const fetchUserFavoriteGames = async () => {
    const data = await getUserFavourites(name, email);

    if (data.games[0].favoriteGames == null && data.games[0].count == null) {
      setGames([]);
      setCount(0);
    } else if (data) {
      setGames(data.games[0].favoriteGames);
      setCount(data.games[0].count);
    }
  };

  useEffect(() => {
    fetchUserFavoriteGames();
  }, []);

  return (
    <aside>
      <h2>My Favorites ({count} games)</h2>
      <section className="my-favourites">
        {games.length === 0 ? (
          <p>There are no games added to favorites!</p>
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
      {games.length > 0 && (
        <section className="indicator">
          <Link to="/favorites">Go to favorites</Link>
        </section>
      )}
    </aside>
  );
}

export default MyFavorites;
