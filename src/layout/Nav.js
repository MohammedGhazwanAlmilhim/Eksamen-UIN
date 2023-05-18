import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Nav({ user, logOut }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavFixed, setIsNavFixed] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className={isNavFixed ? "fixed" : ""}>
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
        <ul className={isMobileMenuOpen ? "active" : ""}>
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

      {user.length > 0 && (
        <section className={isMobileMenuOpen ? "active" : ""}>
          <p>Signed in as: {user[1]}</p>
          <FontAwesomeIcon
            className="logout"
            type="button"
            onClick={logOut}
            icon={faRightFromBracket}
            size="2x"
          />
        </section>
      )}

      {user.length > 0 && (
        <div className={`hamburger ${isMobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      )}
    </nav>
  );
}
