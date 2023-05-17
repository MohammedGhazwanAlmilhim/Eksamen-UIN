import React, { useState, useEffect } from 'react';
import { getTenLatestGames } from '../lib/services/gameService';
import GameCard from '../components/GameCard';
import Loading from '../layout/Loading';

function GameShop() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);

  const fetchTenLatestGames = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const data = await getTenLatestGames();

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
    fetchTenLatestGames();
  }, []);

  return (
    <main>
      <Loading show={loading} />

      {error ? (
        <p>Error: Unable to fetch games.</p>
      ) : !loading ? (
        <>
          <h1>Gameshop ({count} games)</h1>
          {empty ? (
            <p>Gameshop is empty!</p>
          ) : (
            <section className="gameshop-page">
              {games.map((item) => (
                <GameCard
                  key={item.apiid}
                  slug={item.slug}
                  id={item.apiid}
                  title={item.title}
                  img={item.bilde}
                  playtime={item.timerspilt}
                />
              ))}
            </section>
          )}
        </>
      ) : null}
    </main>
  );
}

export default GameShop;
