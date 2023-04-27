import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import GameShop from './pages/GameShop';
import MyGames from './pages/MyGames';
import MyFavorites from './components/MyFavourites';
import GamePage from './pages/GamePage';
import SignIn from './components/SignIn';


import './css/main.css';

//Disse komponentene skal linkes til ved hjelp av Routing fra menyen i toppen av applikasjonen, 
//samt fra de respektive knappene på dashboardet

//"/dashboard"
//Vi anbefaler å bruke ruten /game:slug for ett enkelt spill
//"/gameshop"
//"/mygames"
//"/favourites"


function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<SignIn/>}/>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/game/:id' element={<GamePage/>} />
                <Route path='/gameshop' element={<GameShop />} />
                <Route path='/mygames' element={<MyGames />} />
                <Route path='/favourites' element={<MyFavorites />} />
            </Route>
        </Routes>
    )

    }

export default App;
