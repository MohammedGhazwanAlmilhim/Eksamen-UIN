import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ id, title, img, genres }) {
  const imgUrl = img !== 'N/A' ? img : 'https://picsum.photos/200/300';
  const altText = `Image of the ${title} game.`;

  return (
    <Link to={`/game/${id}`}>
      <article className="card">
        <figure>
          <img src={imgUrl} alt={altText} />
        </figure>

        <section className="card-content">
          <h1>{title}</h1>
          <h3>{genres}</h3>
        </section>
      </article>
    </Link>
  );
}

export default GameCard;
