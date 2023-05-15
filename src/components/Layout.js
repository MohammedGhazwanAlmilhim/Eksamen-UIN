import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';

export default function Layout({ user, logOut }) {
  const isLoggedIn = user.length > 0;
  const location = useLocation();
  
  const isDashboard = location.pathname === '/dashboard';
  const containerClass = isDashboard ? 'container' : 'container-full';

  return (
    <div id={containerClass}>
      <Nav user={user} logOut={logOut} />
      <Outlet />
      {isLoggedIn && (
        <footer>
          <p>Laget av GameHub</p>
        </footer>
      )}
    </div>
  );
}
