import GameShop from '../components/GameShop';
import MyGames from '../components/MyGames';
import MyFavourites from '../components/MyFavourites';
import GameList from '../components/GameList';

function Dashboard() {
  return (
    <>
      <GameShop />
      <MyGames />
      <MyFavourites />
      <GameList />

    </>
  );
}

export default Dashboard;
