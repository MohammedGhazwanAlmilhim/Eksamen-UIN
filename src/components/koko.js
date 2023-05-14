import { useState } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { addFavoriteGame } from '../services/userService';

function GameProfile({ game }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const currentUser = useCurrentUser();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddToFavorites = async () => {
    if (!game || !currentUser) return;

    await addFavoriteGame(currentUser._id, game._id);
    alert(`${game.name} was added to favorites!`);
  };

  return (
    <div>
      {game ? (
        <section id="game-text">
          <h2>{game.name}</h2>
          <img width="500px" src={game.background_image} alt="wow" />
          <p>Rating: {game.rating}</p>
          <br />
          <p>Summary: {game.description_raw}</p>
          <br />
          <p>
            Tags:{' '}
            {game.tags.map((tag) => (
              <span key={tag.id}>{tag.name} </span>
            ))}
          </p>
          <br />
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
          {currentUser && (
            <>
              <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
              <input type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
              <button id="addToFavorites" onClick={handleAddToFavorites}>
                Add to Favourites
              </button>
            </>
          )}
        </section>
      ) : (
        <p>Game not found!</p>
      )}
    </div>
  );
}

export default GameProfile;











const handleAddFavorite = async () => {
    const storageValue = localStorage.getItem('GamehubUser');
    const arrayValue = JSON.parse(storageValue);
    const email = arrayValue[1];
  
    // Get the user from the database
    const user = await getUserByEmail(email);
  
    // Check if the game is already in the user's favorites list
    const isFavorite = user.favoriteGames.some(favGame => favGame._ref === game.id);
  
    // Add the game to the user's favorites list if it's not already there
    if (!isFavorite) {
      await addFavoriteGame(email, game.id);
      setIsFavorited(true);
    } else {
      setIsFavorited(true);
    }
  };
  