import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';

//For GameShop seksjonen, hent ut de tre nyeste spillene for visning i dashboard. 
//Hent ut de 10 nyeste for visning på /gameshop (når du klikker linken "Visit Shop")

function GameShop() {
  //Bruk useState for å lagre 3 spill i en tilstandsvariabel
  const [results, setResults] = useState([]);
  
  //Bruk useState for å lagre 10 spill i en annen tilstandsvariabel

  const API_KEY = '9ef4069dd9d14052ac1ae49bd4da623b';

  const getGames = async () => {
      const response = await fetch(`https://rawg.io/api/games?key=${API_KEY}&lang=en`);
      const data = await response.json();
      console.log(data);
      const sortedGames = data.results.sort((a, b) => new Date(b.released) - new Date(a.released)).slice(0, 3);
      setResults(sortedGames);
  };

  useEffect(() => {
      getGames();
  }, []);

  return (
    <header>
      <h1>Gameshop</h1>
      <div className="latest-games">
        {results && results.map((item)=> (
          <GameCard
            id={item.id}
            title={item.name}
            img={item.background_image}
            genres={item.genres.map(genre => genre.name).join(', ')}
          />
        ))}
      </div>
    </header>
  );
}

export default GameShop;
