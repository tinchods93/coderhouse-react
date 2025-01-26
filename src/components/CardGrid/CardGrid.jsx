import './cardGrid.scss';

const CardGrid = ({ itemList, CardComponent }) => {
  return (
    <section className='card-grid' id='store'>
      {itemList.map((card) => (
        <CardComponent key={card.id} item={card} />
      ))}
    </section>
  );
};

export default CardGrid;
