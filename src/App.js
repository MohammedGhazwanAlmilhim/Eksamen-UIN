import './css/main.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import GameShop from './pages/GameShop';
import MyGames from './pages/MyGames';
import MyFavorites from './pages/MyFavorites';
import GamePage from './pages/GamePage';
import Signin from './components/Signin';
import Nav from './components/Nav';
import { useLocalStorage } from './functions/LocalStorage';

<<<<<<< Updated upstream
=======

//Disse komponentene skal linkes til ved hjelp av Routing fra menyen i toppen av applikasjonen, 
//samt fra de respektive knappene på dashboardet

//"/dashboard"
//Vi anbefaler å bruke ruten /game:slug for ett enkelt spill
//"/gameshop"
//"/mygames"
//"/favourites"

/**function redirectToHomePage() {
  const navigate = useNavigate();
  navigate('/');
} */


>>>>>>> Stashed changes
function App() {
  const [user, setUser] = useLocalStorage('GamehubUser', []);
  console.log(user);

  const logOut = () => {
    setUser([]);
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };
<<<<<<< Updated upstream
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
=======

  return (user.length > 0) ? ( 
    <>
    <Nav user={user} logOut={logOut} />
    <Routes>
      <Route element={<Layout user={user} logOut={logOut} />}>
        <Route path="/" element={<Signin user={user} setUser={setUser} />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/game/:id' element={<GamePage/>} />
        <Route path='/gameshop' element={<GameShop />} />
        <Route path='/mygames' element={<MyGames />} />
        <Route path='/favourites' element={<MyFavorites />} />
      </Route>
    </Routes>
    </>
  ) :(
    <>
    <Nav user={user} logOut={logOut} />
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<Signin user={user} setUser={setUser}/>} />
      </Route>
    </Routes>
>>>>>>> Stashed changes
    </>
  );
}

export default App;