import React, { useState, useEffect, useCallback } from 'react';
import { getUserFavourites } from '../lib/services/userService';
import GameCard from '../components/GameCard';
import Loading from '../layout/Loading';


function MyFavorites() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  const storageValue = localStorage.getItem('GamehubUser');
  const arrayValue = JSON.parse(storageValue);
  const name = arrayValue[1];
  const email = arrayValue[0];

  const fetchUserFavoriteGames = useCallback(async () => {
    try {
      const data = await getUserFavourites(name, email);
  
      if (data.games[0].favouriteGames && data.games[0].favouriteGames.length === 0) {
        setGames([]);
        setEmpty(true);
      } else if (data) {
        setGames(data.games[0].favouriteGames || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [name, email]);
  

  useEffect(() => {
    fetchUserFavoriteGames();
  }, [fetchUserFavoriteGames]);
  

  return (
    <main>
      <Loading show={loading} />
      <h1>My Favourites ({games.length} games)</h1>
      {empty || games.length === 0 ? (
        <p>There are no games added to favourites!</p>
      ) : (
        <>
          
          <section className="game-library">
            {games.map((item) => (
              <GameCard
                key={item.apiid}
                slug={item.slug}
                id={item.apiid}
                title={item.title}
                img={item.img}
                hoursplayed={item.hoursplayed}
                cardLink={true}
              />
            ))}
          </section>
        </>
      )}
    </main>
  );
}

export default MyFavorites;
