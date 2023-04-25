//GamePage, som viser et spill med all informasjon

//Et spill i dashboard, My Games-librariet og My Favourites skal kunne klikkes på (enten hele spillkortet, eller med en knapp/lenke til et spill). 

//Tips: lag en ny property i objektene i games-arrayen kalt "slug" med en pen variant av tittelen du kan bruke som parameter i URL/Routing for å peke til ett spill. 

//Når linken åpnes, brukes GamePage for å vise et enkelt spill (må hentes fra arrayen) med all informasjon knyttet til dette spillet fra games-arrayen i games.js.

//Vi anbefaler å bruke ruten /game/gametitle-as-slug for ett enkelt spill


import { useParams } from "react-router-dom";
import { mygames } from '../resources/games.js';
import GameCard from "../components/GameCard";

export default function GamePage() {
  const { id } = useParams();
  const game = mygames.find((game) => game.id === parseInt(id));

  return (
    <>
      {game ? (
        <GameCard
          title={game.title}
          img={game.img}
          genres={game.genres}
          key={game.id}
        />
      ) : (
        <p>Game not found!</p>
      )}
    </>
  );
}
