import './card.scss';
const Card = ({ card }) => {
  return (
    <article className='card'>
      <img src={card.image_url} alt={card.name} />
      <h2>{card.name}</h2>
      <p>{card.description}</p>
      <p>{card.price}</p>
      <p>{card.category}</p>
    </article>
  );
};

export default Card;
