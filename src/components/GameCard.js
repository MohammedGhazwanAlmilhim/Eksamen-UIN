import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ slug, title, img, genres, hoursplayed, cardLink = false }) {
  const imgUrl = img !== 'N/A' ? img : 'https://picsum.photos/200/300';
  const altText = `Image of the ${title} game.`;

  const CardContent = (
    <section className="card-content">
      <h1>{title}</h1>
      {genres && <h3>{genres}</h3>}
      {hoursplayed && <p>Hours played: {hoursplayed}</p>}
      {!cardLink && <Link to={`/game/${slug}`}>Buy</Link>}
    </section>
  );

  if (cardLink) {
    return (
      <Link to={`/game/${slug}`} className="card-link">
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