import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserFavourites } from '../lib/services/userService';
import GameCard from './GameCard';

function MyFavourites() {
  const [games, setGames] = useState([]);

  
  const [count, setCount] = useState(0);

  const storageValue = localStorage.getItem('GamehubUser');
  const arrayValue = JSON.parse(storageValue);
  const name = arrayValue[1];
  const email = arrayValue[0];

  const fetchUserFavouriteGames = async () => {
    const data = await  getUserFavourites(name, email);
    setGames(data.games);
    setCount(data.count);
  };

  useEffect(() => {
    fetchUserFavouriteGames();
  }, []);  
  
  return (
<aside>
  <h2>My Favourites ({count ? count : 0} games)</h2>
  <section className="my-favourites">
    {games && games.length === 0 ? (
      <p>No games to show</p>
    ) : games ? (
      games.map((item) => (
        <GameCard
          key={item.apiid}
          slug={item.slug}
          id={item.apiid}
          title={item.title}
          img={item.bilde}
          playtime={item.timerspilt}
          cardLink={true}
        />
      ))
    ) : null}
  </section>
  <section className="indicator">
    <Link to="/favourites">Go to favourites</Link>
  </section>
</aside>

  );
}

export default MyFavourites;