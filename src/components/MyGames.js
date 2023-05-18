import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFourActionGames } from '../lib/services/gameService';
import GameCard from './GameCard';

function MyGames() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);

  const fetchFourActionGames = async () => {
    try {
      const data = await getFourActionGames();

      if (data.games.length == 0 && data.count == 0) {
        setGames([]);
        setCount(0);
        setEmpty(true);
      } else if (data) {
        setGames(data.games);
        setCount(data.count);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFourActionGames();
  }, []);

  return (
    <main>
      {error ? (
        <p>Error: Unable to fetch favorite games.</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>My Games-Library ({count} games)</h1>
          {empty ? (
            <p>My Games-Library is empty!</p>
          ) : (
            <section className="game-library">
              {games.map((item) => (
                <GameCard
                  key={item.apiid}
                  slug={item.slug}
                  id={item.apiid}
                  title={item.title}
                  img={item.img}
                  genres={item.genres.map((genres) => genres.name).join(', ')}
                  hoursplayed={item.hoursplayed}
                  cardLink={true}
                />
              ))}
            </section>
          )}
          {!!games.length && (
            <section className="indicator">
              <Link to="/mygames">Go to library</Link>
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default MyGames;