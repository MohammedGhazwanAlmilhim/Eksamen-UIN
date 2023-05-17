import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserFavourites } from '../lib/services/userService';
import GameCard from './GameCard';

function MyFavorites() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);

  const storageValue = localStorage.getItem('GamehubUser');
  const arrayValue = JSON.parse(storageValue);
  const name = arrayValue[1];
  const email = arrayValue[0];

  const fetchUserFavoriteGames = async () => {
    try {
      const data = await getUserFavourites(name, email);
      
      if (data.games[0].favoriteGames.length === 0 && data.games[0].count === 0) {
        setGames([]);
        setCount(0);
        setEmpty(true);
      } else if (data) {
        setGames(data.games[0].favoriteGames);
        setCount(data.games[0].count);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFavoriteGames();
  }, []);

  return (
    <aside>
      {error ? (
        <p>Error: Unable to fetch favorite games.</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>My Favorites ({count} games)</h2>
          {empty ? (
            <p>There are no games added to favorites!</p>
          ) : (
            <section className="my-favourites">
              {games.map((item) => (
                <GameCard
                  key={item.apiid}
                  slug={item.slug}
                  id={item.apiid}
                  title={item.title}
                  img={item.bilde}
                  playtime={item.timerspilt}
                  cardLink={true}
                />
              ))}
            </section>
          )}
          {!!games.length && (
            <section className="indicator">
              <Link to="/favorites">Go to favorites</Link>
            </section>
          )}
        </>
      )}
    </aside>
  );
}

export default MyFavorites;