import React, { useState, useEffect } from "react";
import {addUserFavourites, getUserWithGame} from "../lib/services/userService";
import { TagCloud } from "react-tagcloud";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function GameProfile({ game }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const storageValue = localStorage.getItem("GamehubUser");
      const arrayValue = JSON.parse(storageValue);
      const email = arrayValue[1];

      // Get the user from the database
      const user = await getUserWithGame(email);

      // Check if the user has any favorite games
      const favoriteStatus =
        user.favoriteGames &&
        user.favoriteGames.some((favGame) => favGame._ref === game.id);

      setIsFavorite(favoriteStatus);
    };

    checkFavoriteStatus();
  }, [game.id]);

  const handleAddFavorite = async () => {
    const storageValue = localStorage.getItem("GamehubUser");
    const arrayValue = JSON.parse(storageValue);
    const email = arrayValue[1];

    // Add the game to the user's favorites list if it's not already there
    if (!isFavorite) {
      await addUserFavourites(email, game.id);
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
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

              <br></br>
              <p>Summary: {game.description_raw}</p>
              <br></br>
              <p>TagCloud: </p>
              <TagCloud
                tags={game.tags.map((tag) => ({
                  value: tag.name,
                  count: tag.games_count,
                }))}
                minSize={12}
                maxSize={35}
              />
              <br></br>

              <p>Developers: {game.developers.map((dev) => dev.name).join(", ")}</p>
              <p>Publisher: {game.publishers.map((pub) => pub.name).join(", ")}</p>
              <p>Release Year: {game.released.substring(0, 4)}</p>
              <p>
                Platforms:{" "}
                {game.platforms.map((platform) => (
                  <span key={platform.platform.id}>
                    {platform.platform.name}{" "}
                  </span>
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
