import { Link } from 'react-router-dom';

//GameCard, som viser et spillkort med alle informasjon inne i GamePage

function GameCard({id, title, img, genres }) {
  const imgUrl = img !== 'N/A' ? img : 'https://picsum.photos/200/300';
  const altText = `Image of the ${title} game.`;
  return (
    <article className="card">
    <figure>
        <img src={imgUrl} alt={altText} />
    </figure>

    <section className="card-content">
        <h1>{title}</h1>
        <h3>{genres}</h3>
        <Link to={`/game/${id}`}>Buy</Link>
    </section>
</article>
  );
}

export default GameCard;