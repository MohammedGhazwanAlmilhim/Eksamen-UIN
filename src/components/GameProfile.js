import React, { useState, useEffect } from "react";
import { addUserFavourites, getUserByEmail, fetchGamesFromFavorite} from "../lib/services/userService";
import { TagCloud } from "react-tagcloud";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function GameProfile({ game }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storageValue = localStorage.getItem("GamehubUser");
    const arrayValue = JSON.parse(storageValue);
    const email = arrayValue[1];

    const fetchUserAndCheckFavorites = async () => {
      try {
        const user = await getUserByEmail(email);
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

  const checkIfGameInFavorites = async (user, game) => {    
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
    const email = arrayValue[1];
    const user = await getUserByEmail(email);
  
    try {
      const isGameInFavorites = await checkIfGameInFavorites(user, game);
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
              <p>Summary: {game.description_raw}</p>
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