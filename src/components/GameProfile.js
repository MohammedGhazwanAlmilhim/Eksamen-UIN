function GameProfile({ game, addFavourite}) {
    const handleAddFavourite = () => {
        addFavourite((prevFavourites) => [...prevFavourites, game]);
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
            <button onClick={handleAddFavourite}>Add to Favourites</button>
          </section>
        ) : (
          <p>Game not found!</p>
        )}
      </div>
    );
  }
  
  export default GameProfile;