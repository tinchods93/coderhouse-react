import './cardGrid.scss';
import Card from '../Card/Card';

const CardGrid = ({ cards }) => {
  return (
    <section className='card-grid' id='store'>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </section>
  );
};

export default CardGrid;
