import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ id, title, img, genres, playtime, cardLink = false }) {
  const imgUrl = img !== 'N/A' ? img : 'https://picsum.photos/200/300';
  const altText = `Image of the ${title} game.`;

  const CardContent = (
    <section className="card-content">
      <h1>{title}</h1>
      {genres && <h3>{genres}</h3>}
      {playtime && <p>Hours played: {playtime}</p>}
      {!cardLink && <Link to={`/game/${id}`}>Buy</Link>}
    </section>
  );

  if (cardLink) {
    return (
      <Link to={`/game/${id}`} className="card-link">
        <article className="card">
          <figure>
            <img src={imgUrl} alt={altText} />
          </figure>
          {CardContent}
        </article>
      </Link>
    );
  }

  return (
    <article className="card">
      <figure>
        <img src={imgUrl} alt={altText} />
      </figure>
      {CardContent}
    </article>
  );
}

export default GameCard;
