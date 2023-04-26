import React, { useState, useEffect } from 'react';
import { getNewestGames, getAllGenres } from '../lib/services/service';
import GameCard from './GameCard';

//For GameShop seksjonen, hent ut de tre nyeste spillene for visning i dashboard. 

function GameShop() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    Promise.all([getNewestGames(), getAllGenres()]).then(([games, genres]) => {
      setGames(games);
      setGenres(genres);
    });
  }, []);

  const getGenreNames = (genreIds) => {
    const genreNames = genreIds.map((genreId) => {
      const genre = genres.find((genre) => genre._id === genreId._ref);
      return genre ? genre.navn : '';
    });
    return genreNames.join(', ');
  };

  return (
    <header>
      <h1>Gameshop</h1>
      <div className="latest-games">
        {games.map((item)=> (
          <GameCard
            key={item._id}
            id={item.apiid}
            title={item.title}
            img={item.bilde}
            genres={getGenreNames(item.sjangere)}
          />
        ))}
      </div>
    </header>
  );
}

export default GameShop;
