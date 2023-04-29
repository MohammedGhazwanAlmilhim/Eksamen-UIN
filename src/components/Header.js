import React from "react";
import { Link } from "react-router-dom";

export default function Header({ user, logOut }) {
  return (
    <>
      <nav>
        <Link to="/dashboard">
          <img src="../assets/logo.png" alt="Logo" />
        </Link>

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
          <figure>
            <img src="../assets/user.png" />
          </figure>
          <li>
            {user.length > 0 ? (
              `${user}`
            ) : (
              <Link to="/">Sign In</Link>
            )}{" "}
            {user.length > 0 ? (
              <button className="logout" type="button" onClick={logOut}>
                Sign Out
              </button>
            ) : null}
          </li>
        </section>
      </nav>
    </>
  );
}
