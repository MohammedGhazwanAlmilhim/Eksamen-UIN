import React from 'react';
import './css/main.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import GameShop from './pages/GameShop';
import MyGames from './pages/MyGames';
import MyFavorites from './pages/MyFavourites';
import GamePage from './pages/GamePage';
import Signin from './components/Signin';
import { useLocalStorage } from './functions/LocalStorage';

//Disse komponentene skal linkes til ved hjelp av Routing fra menyen i toppen av applikasjonen, 
//samt fra de respektive knappene på dashboardet

//"/dashboard"
//Vi anbefaler å bruke ruten /game:slug for ett enkelt spill
//"/gameshop"
//"/mygames"
//"/favourites"

function App() {
  const [user, setUser] = useLocalStorage('GamehubUser', []);

  const logOut = () => {
    setUser([]);
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  return (
    <>
      <Routes>
        <Route element={<Layout user={user} logOut={logOut} />}>
          <Route path="/" element={<Signin user={user} setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} logOut={logOut} />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/gameshop" element={<GameShop />} />
          <Route path="/mygames" element={<MyGames />} />
          <Route path="/favourites" element={<MyFavorites />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;


// Det som Abdullah har endreet i app js er:
// Flytt importen av Layout til toppen av filen for bedre organisering.
//Endre <Route>-komponenten som er ansvarlig for /dashboard for å inkludere user og logOut som props til Dashboard-komponenten.
//Endre <Route>-komponenten som er ansvarlig for / (Signin) for å inkludere user og setUser som props til Signin-komponenten.