function MyFavourites({ favourites }) {
  return (
    <div>
      <h2>My Favourites:</h2>
      {favourites && favourites.length > 0 ? (
        <ul>
          {favourites.map((game) => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      ) : (
        <p>You have no favourites yet!</p>
      )}
    </div>
  );
}

export default MyFavourites;
