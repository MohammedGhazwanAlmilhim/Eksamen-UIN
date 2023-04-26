import React, { useState, useEffect } from 'react';
import { getAllGenres, getActionGames } from '../lib/services/service';
import GameCard from './GameCard';

function MyGames() {
const [games, setGames] = useState([]);
const [genres, setGenres] = useState([]);

useEffect(() => {
  Promise.all([getActionGames(), getAllGenres()]).then(([games, genres]) => {
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
    <main>
      <h1>My Games - Libary</h1>
        <section className="game-libary">
        {games.map((item) => (
          <GameCard
            key={item._id}
            id={item.apiid}
            title={item.title}
            img={item.bilde}
            genres={getGenreNames(item.sjangere)}
            />
        ))}
        </section>
    </main>
  );
}

export default MyGames;
