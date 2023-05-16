import React from 'react';
import { Outlet, useLocation, Link, Navigate } from 'react-router-dom';
import Nav from './Nav';

export default function Layout({ user, logOut }) {
  const isLoggedIn = user.length > 0;
  const location = useLocation();

  const isDashboard = location.pathname === '/dashboard';
  let containerId = isDashboard ? 'container-dashboard' : 'container-singlepage';

  if (location.pathname === '/') {
    containerId = 'container-signin';
  }

  if (!isLoggedIn && location.pathname !== '/') {
    return <Navigate to="/" />;
  }

  const isAllowedPage = ['/dashboard', '/game/:slug', '/gameshop', '/mygames', '/favourites'].includes(location.pathname);

  if (isLoggedIn && !isAllowedPage) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div id={containerId}>
      <Nav user={user} logOut={logOut} />
      <Outlet />
      {isLoggedIn && (
        <footer>
          <p>
            Credit to <Link to="https://rawg.io/">rawg.io</Link>
          </p>
        </footer>
      )}
    </div>
  );
}
