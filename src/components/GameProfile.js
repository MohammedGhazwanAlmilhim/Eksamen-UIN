function GameProfile({ game }) {
    return (
        <div>
            {game ? (
                <section id='movie-text'>
                    <h2>{game.name}</h2>
                </section>
            ) : (
                <p>Game not found!</p>
            )}
        </div>
    );
}

export default GameProfile;