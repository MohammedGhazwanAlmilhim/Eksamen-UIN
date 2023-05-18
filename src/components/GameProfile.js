import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { addUserFavourites, getUserByEmail, fetchGamesFromFavourite} from "../lib/services/userService";
import { TagCloud } from "react-tagcloud";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function GameProfile({ game, steamLink }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);


  useEffect(() => {
    const storageValue = localStorage.getItem("GamehubUser");
    const arrayValue = JSON.parse(storageValue);
    const email = arrayValue[0]; //GamehubUser: [0] = email, [1] = username

    const fetchUserAndCheckFavourites = async () => {
      try {
        const user = await getUserByEmail(email);
        if (game) {
          const isGameInFavourites = await checkIfGameInFavourites(user, game);
          setIsFavourite(isGameInFavourites);
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUserAndCheckFavourites();
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

  const checkIfGameInFavourites = async (user, game) => {    
    if (user && user.favouriteGames && game) {
      try {
        const favouriteGames = await fetchGamesFromFavourite(user, user.favouriteGames);
        var containsFavouriteGame = false;
        Array.from(favouriteGames).forEach((g) => {
          if (game.slug === g.slug.current) {
            containsFavouriteGame = true;
          }
        })
        return containsFavouriteGame
      } catch (error) {
        console.error("Error fetching game objects:", error.message);
        return false;
      }
    }
    
    return false;
  };
  

  const handleAddFavourite = async () => {
    const storageValue = localStorage.getItem("GamehubUser");
    const arrayValue = JSON.parse(storageValue);
    const email = arrayValue[0];
    const user = await getUserByEmail(email);
  
    try {
      const isGameInFavourites = await checkIfGameInFavourites(user, game);
      const updatedUser = await addUserFavourites(email, game.id, isGameInFavourites);
      setIsFavourite(!isGameInFavourites);

    } catch (error) {
      console.error("Error adding favourite game:", error.message);
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
                    onClick={handleAddFavourite}
                    icon={faHeart}
                    color={isFavourite ? "red" : "gray"}
                    size="2x"
                  />
                </section>
              </section>

              <br />


              <p>Summary: {renderDescription()}</p>
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
                minSize={12}
                maxSize={35}
              />
              <br />

              <p>Developers: {game.developers.map((dev) => dev.name).join(", ")}</p>
              <p>Publisher: {game.publishers.map((pub) => pub.name).join(", ")}</p>
              <p>Release Year: {game.released.substring(0, 4)}</p>
              <p>
                Platforms:{" "}
                {game.platforms.map((platform) => (
                  <span key={platform.platform.id}>{platform.platform.name} </span>
                ))}
              </p>
              <p>
                Stores:{" "}
                {game.stores.map((store) => (
                  <span key={store.store.id}>{store.store.name} </span>
                ))}
              </p>

              <a className="btn" href={steamLink}>Buy</a>
              
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