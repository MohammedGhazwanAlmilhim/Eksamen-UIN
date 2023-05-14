import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getNewestGames } from "../lib/services/gameService";
import GameCard from "./GameCard";

//For GameShop seksjonen, hent ut de tre nyeste spillene for visning i dashboard.

function GameShop() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    Promise.all([getNewestGames()]).then(([games]) => {
      setGames(games);
    });
  }, []);

  return (
    <header>
      <section id="indicator">
        <h1>Gameshop</h1>
        <Link to="/gameshop">Visit Gameshop</Link>
      </section>
      <div className="latest-games">
        {games.map((item) => (
          <GameCard
            key={item.apiid}
            id={item.apiid}
            title={item.title}
            img={item.bilde}
            genres={item.sjangere.map((sjanger) => sjanger.navn).join(", ")}
          />
        ))}
      </div>
    </header>
  );
}

export default GameShop;
