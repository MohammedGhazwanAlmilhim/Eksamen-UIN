function MyFavourites({ favourites }) {
  return (
    <aside>
      <h2>My Favourites</h2>
      <div className="my-favourites">
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
    </aside>
  );
}

export default MyFavourites;
