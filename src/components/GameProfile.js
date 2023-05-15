import React, { useState } from 'react';
import { addUserFavourites, getUserWithGame } from '../lib/services/userService';
import { TagCloud } from 'react-tagcloud';

function GameProfile({ game }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddFavorite = async () => {
    const storageValue = localStorage.getItem('GamehubUser');
    const arrayValue = JSON.parse(storageValue);
    const email = arrayValue[1];
  
    // Get the user from the database
    const user = await getUserWithGame(email);
  
    // Check if the user has any favorite games
   const hasFavoriteGames = user && user.favoriteGames && user.favoriteGames.length > 0;

  
    // Add the game to the user's favorites list if it's not already there,
    // or create a new user entry if the user doesn't have any favorite games yet
    if (hasFavoriteGames) {
      const isFavorite = user.favoriteGames.some(favGame => favGame._ref === game.id);
      if (!isFavorite) {
        await addUserFavourites(email, game.id);
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } else {
      await addUserFavourites(email, game.id);
      setIsFavorite(true);
    }
  };
  
  

  return (
    <main>
      {game ? (
        <section id="game-text">
          <h2>{game.name}</h2>
          <img width="500px" src={game.background_image} alt="wow" />
          <p>Rating: {game.rating}</p>
          <br></br>
          <p>Summary: {game.description_raw}</p>
          <br></br>
          <p>
            TagCloud:{' '}
          </p>
          <TagCloud
  tags={game.tags.map((tag) => ({ value: tag.name, count: tag.games_count }))}
  minSize={12}
  maxSize={35}
/>
          <br></br>


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
    </main>
  );
}

export default GameProfile;

// addfavorite virker som den skal, men når man lager en ny bruker så klarer man ikke å legge til spil i favorit listen sin.
// løsningen på det er å loge ut og logein igjen med samme gmail adresse så vil brukeren kunne legge til i favorit listen sin.
// dette må fikses 
