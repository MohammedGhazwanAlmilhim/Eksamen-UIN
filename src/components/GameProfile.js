import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { addUserFavourites, getUserByEmail, fetchGamesFromFavorite} from "../lib/services/userService";
import { TagCloud } from "react-tagcloud";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function GameProfile({ game }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const storageValue = localStorage.getItem("GamehubUser");
    const arrayValue = JSON.parse(storageValue);
    const email = arrayValue[0]; //GamehubUser: [0] = email, [1] = username

    const fetchUserAndCheckFavorites = async () => {
      try {
        const user = await getUserByEmail(email);
        //console.log(email)
        //console.log(user)
        if (game) {
          const isGameInFavorites = await checkIfGameInFavorites(user, game);
          //console.log(isGameInFavorites);
          setIsFavorite(isGameInFavorites);
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUserAndCheckFavorites();
  }, [game]);  


  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    if (showFullDescription) {
      return game.description_raw;
    } else {
      return game.description_raw.split('').slice(0, 300).join('') + '...';
    }
  };

  const checkIfGameInFavorites = async (user, game) => {    
    //console.log(user + "   " + game)
    if (user && user.favoriteGames && game) {
      try {
        const favoriteGames = await fetchGamesFromFavorite(user, user.favoriteGames);
        //console.log(favoriteGames);
        var containsFavoriteGame = false;
        Array.from(favoriteGames).forEach((g) => {
          if (game.slug === g.slug.current) {
            containsFavoriteGame = true;
          }
        })
        //console.log(containsFavoriteGame);
        return containsFavoriteGame
      } catch (error) {
        console.error("Error fetching game objects:", error.message);
        return false;
      }
    }
    
    return false;
  };
  

  const handleAddFavorite = async () => {
    const storageValue = localStorage.getItem("GamehubUser");
    const arrayValue = JSON.parse(storageValue);
    const email = arrayValue[0];
    const user = await getUserByEmail(email);
  
    try {
      const isGameInFavorites = await checkIfGameInFavorites(user, game);
      //console.log(isGameInFavorites)
      const updatedUser = await addUserFavourites(email, game.id, isGameInFavorites);
      setIsFavorite(!isGameInFavorites);
      //console.log(updatedUser);
    } catch (error) {
      console.error("Error adding favorite game:", error.message);
    }
  };
  
  return (
    <main>
      {game ? (
        <section className="game-profile-container">
          <section className="game-profile">
            <figure>
              <img src={game.background_image} alt="wow" />
            </figure>
            <section>
              <section className="indicator">
                <h2>{game.name}</h2>
                <section>
                  <span>
                    <p>Rating: {game.rating}</p>
                  </span>
                  <FontAwesomeIcon
                    onClick={handleAddFavorite}
                    icon={faHeart}
                    color={isFavorite ? "red" : "gray"}
                    size="2x"
                  />
                </section>
              </section>

              <br />


            <p className="summary">Summary: {renderDescription()}</p>
            <button onClick={toggleDescription}>
              {showFullDescription ? 'Vis mindre' : 'Les mer'}
            </button>
              <br />
              <p>TagCloud: </p>
              <TagCloud
                tags={game.tags.map((tag) => ({
                  value: tag.name,
                  count: tag.games_count,
                }))}
                minSize={13}
                maxSize={13}
              />
              <br />

              <section className="gameprofile-content">

                <div className="info">
                    <h5>Developers:</h5>
                    <p>{game.developers.map((dev) => dev.name).join(", ")}</p>
                </div>

                <div className="info">
                    <h5>Publisher:</h5>
                    <p>{game.publishers.map((pub) => pub.name).join(", ")}</p>
                </div>

                <div className="info">
                    <h5>Release Year:</h5>
                    <p>{game.released.substring(0, 4)}</p>
                </div>


                <div className="info">
                    <h5>Platforms:</h5>
                    <p>
                      {" "}
                      {game.platforms.map((platform) => (
                        <span key={platform.platform.id}>{platform.platform.name} </span>
                      ))}
                    </p>
                </div>

                <div className="info">
                <h5>Stores:</h5>
                <p>
                  Stores:{" "}
                  {game.stores.map((store) => (
                    <span key={store.store.id}>{store.store.name} </span>
                  ))}
                </p>
                </div>



                <Link className="btn" to={`https://store.steampowered.com/`}>Buy</Link>

              </section>

            </section>
          </section>
        </section>
      ) : (
        <p>Game not found!</p>
      )}
    </main>
  );
}

export default GameProfile;