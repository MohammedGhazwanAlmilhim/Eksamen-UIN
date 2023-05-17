import React, { useState, useEffect } from 'react';
import { getTweentyActionGames } from '../lib/services/gameService';
import GameCard from '../components/GameCard';

function MyGames() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);


  const fetchTweentyActionGames = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      
      const data = await getTweentyActionGames();
      
      if (data.games.length === 0 && data.count === 0) {
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
    fetchTweentyActionGames();
  }, []);

  return (
    <main>
      {error ? (
        <p>Error: Unable to fetch games.</p>
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
                  img={item.bilde}
                  playtime={item.timerspilt}
                  cardLink={true}
                />
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default MyGames;
