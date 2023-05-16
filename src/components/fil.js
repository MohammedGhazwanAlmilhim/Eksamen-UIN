function App() {

    const [user, setUser] = useLocalStorage('GamehubUser', [])
    const logOut = () => {
        setUser([])
        setTimeout(() => {
          window.location.href="/"
        }, 500)
      }


      return user.length > 0 ? (
   
        <>
        <Header user={user} logOut={logOut} />
        <Routes>
          <Route element={<Layout />}>
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
        <Header user={user} logOut={logOut} />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Signin user={user} setUser={setUser} />} />
          </Route>
        </Routes>
        </>
      )
    }