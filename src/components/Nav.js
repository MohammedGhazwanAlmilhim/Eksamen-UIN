import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Nav({ user, logOut }) {
  return (
    <nav>
      {user.length > 0 ? (
        <Link to="/dashboard">
          <img src="../assets/logo.png" alt="Logo" />
        </Link>
      ) : (
        <Link to="/">
          <img src="../assets/logo.png" alt="Logo" />
        </Link>
      )}

      {user.length > 0 && (
        <ul>
          <li>
            <Link to="/gameshop">Shop</Link>
          </li>
          <li>
            <Link to="/mygames">My Games</Link>
          </li>
          <li>
            <Link to="/favourites">Favourites</Link>
          </li>
        </ul>
      )}

      <section>
        {user.length > 0 && (
          <li>
            {user[0]}{' '}
            <FontAwesomeIcon
              className="logout"
              type="button"
              onClick={logOut}
              icon={faRightFromBracket}
              size="2x"
            />
          </li>
        )}
      </section>
    </nav>
  );
}
