import React from 'react';
import GameShop from '../components/GameShop';
import MyGames from '../components/MyGames';
import MyFavourites from '../components/MyFavourites';
import Loading from '../layout/Loading';

function Dashboard() {
  return (
    <>
      <Loading />
      <GameShop />
      <MyGames />
      <MyFavourites />
    </>
  );
}

export default Dashboard;