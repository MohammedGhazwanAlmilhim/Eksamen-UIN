import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import GameShop from './components/GameShop';
import MyGames from './components/MyGames';
import MyFavorites from './components/MyFavourites';
import GamePage from './pages/GamePage';
import Signin from './components/Signin';
import './css/main.css';

//Disse komponentene skal linkes til ved hjelp av Routing fra menyen i toppen av applikasjonen, 
//samt fra de respektive knappene på dashboardet

//"/dashboard"
//"/gameshop"
//"/mygames"
//"/favourites"
//"<Route path="/" element={<Signin/>} />"
function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/game/:id' element={<GamePage/>} />
                <Route path='/gameshop' element={<GameShop />} />
                <Route path='/mygames' element={<MyGames />} />
                <Route path='/favourites' element={<MyFavorites />} />
            </Route>
        </Routes>
    );
}

export default App;
