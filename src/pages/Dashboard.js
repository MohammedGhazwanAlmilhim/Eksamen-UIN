import GameShop from "../components/GameShop";
import MyGames from "../components/MyGames";
import MyFavourites from "../components/MyFavourites";


// Dashboard (forside), som har tre seksjoner; Gameshop, My Games og My Favourites 

export default function Dashboard() {
  return (
    <>
    <GameShop/>
    <MyGames/>
    <MyFavourites/>
    </>
  );
}
