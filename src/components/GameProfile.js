import React, { useState } from 'react';
import { addUserFavourites, getUserWithGame } from '../lib/services/userService';
import ReactWordcloud from 'react-wordcloud';

function GameProfile({ game }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddFavorite = async () => {
    const storageValue = localStorage.getItem('GamehubUser');
    const arrayValue = JSON.parse(storageValue);
    const email = arrayValue[1];
  
    // Get the user from the database
    const user = await getUserWithGame(email);
  
    // Check if the user has any favorite games
    const isFavorite = user.favoriteGames && user.favoriteGames.some(favGame => favGame._ref === game.id);
  
    // Add the game to the user's favorites list if it's not already there
    if (!isFavorite) {
      await addUserFavourites(email, game.id);
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };
  

  return (
    <div>
      {game ? (
        <section id="game-text">
          <h2>{game.name}</h2>
          <img width="500px" src={game.background_image} alt="wow" />
          <p>Rating: {game.rating}</p>
          <br></br>
          <p>Summary: {game.description_raw}</p>
          <br></br>
          <p>
            Tags:{' '}
            {game.tags.map((tag) => (
              <span key={tag.id}>{tag.name} </span>
            ))}
          </p>
          <br></br>
          <ReactWordcloud
            words={game.tags.map((tag) => ({ text: tag.name, value: tag.games_count }))}
          />
          <p>Developers: {game.developers.map((dev) => dev.name).join(', ')}</p>
          <p>Publisher: {game.publishers.map((pub) => pub.name).join(', ')}</p>
          <p>Release Year: {game.released.substring(0, 4)}</p>
          <p>
            Platforms:{' '}
            {game.platforms.map((platform) => (
              <span key={platform.platform.id}>{platform.platform.name} </span>
            ))}
          </p>
          <p>
            Stores:{' '}
            {game.stores.map((store) => (
              <span key={store.store.id}>{store.store.name} </span>
            ))}
          </p>
          {isFavorite ? (
            <p>Added to favorites!</p>
          ) : (
            <button onClick={handleAddFavorite}>Add to Favorites</button>
          )}
        </section>
      ) : (
        <p>Game not found!</p>
      )}
    </div>
  );
}

export default GameProfile;
