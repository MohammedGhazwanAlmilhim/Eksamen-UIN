//GamePage, som viser et spill med all informasjon

//Et spill i dashboard, My Games-librariet og My Favourites skal kunne klikkes på (enten hele spillkortet, eller med en knapp/lenke til et spill). 

//Tips: lag en ny property i objektene i games-arrayen kalt "slug" med en pen variant av tittelen du kan bruke som parameter i URL/Routing for å peke til ett spill. 

//Når linken åpnes, brukes GamePage for å vise et enkelt spill med all informasjon knyttet til dette spillet:

// Rating
// Oppsummering/plot
// Stikkord (tags)
// Utviklere (developers)
// Utgiver (publisher)
// Utgivelsesår (release)
// Plattformer (platforms)
// Kjøpsmuligheter (stores)

//Vi anbefaler å bruke ruten /game:slug for ett enkelt spill

// På visning av ett spill (, ha en knapp "Legg til favoritter".
// Klikk på knappen "Legg til favoritter" skal lagre spillet i en array i en state kalt favourites.


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameProfile from '../components/GameProfile';


  const GamePage = () => {
    const { id } = useParams();
    
    const [game, setGame] = useState('');

  
    const API_KEY = '9ef4069dd9d14052ac1ae49bd4da623b';

    useEffect(() => {
      const getMovies = async () => {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}&lang=en`);
        const data = await response.json();
        console.log(data);
        setGame(data);
      };
      
      getMovies();
    }, [id]);
  
    return <GameProfile game={game}/>;
  };


export default GamePage;