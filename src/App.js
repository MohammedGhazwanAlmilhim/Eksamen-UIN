import './css/main.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import GameShop from './pages/GameShop';
import MyGames from './pages/MyGames';
import MyFavorites from './pages/MyFavourites';
import GamePage from './pages/GamePage';
import Signin from './pages/Signin';
import { useLocalStorage } from './functions/LocalStorage';

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game/:slug" element={<GamePage />} />
          <Route path="/gameshop" element={<GameShop />} />
          <Route path="/mygames" element={<MyGames />} />
          <Route path="/favourites" element={<MyFavorites />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;