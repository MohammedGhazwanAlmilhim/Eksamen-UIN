import { useState, useEffect } from 'react';
import { getAllGames, getAllGenres } from '../lib/services/service';

export default function GameList() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    Promise.all([getAllGames(), getAllGenres()]).then(([games, genres]) => {
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
    <ul>
      {games.map((game) => (
        <li key={game._id}>
          {game.title} - {game.timerspilt} - {getGenreNames(game.sjangere)}
          <img width={300} src={game.bilde} alt={game.title} />
        </li>

      ))}
    </ul>
  );
}
