import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Nav from './Nav';

export default function Layout({ user, logOut }) {
  console.log(user)
  const isLoggedIn = user !== null || user !== undefined;
  const location = useLocation();
  
  const isDashboard = location.pathname === '/dashboard';
  let containerId = isDashboard ? 'container-dashboard' : 'container-singlepage' ;

  if (location.pathname === '/') {
    containerId = 'container-signin';
  }

  return (
<<<<<<< Updated upstream
    <div id={containerId}>
      <Nav user={user} logOut={logOut} />
=======
    <div id={containerClass}>
>>>>>>> Stashed changes
      <Outlet />
      {isLoggedIn && (
        <footer>
          <p>Credit to <Link to='https://rawg.io/'>rawg.io</Link></p>
        </footer>
      )}
    </div>
  );
}
