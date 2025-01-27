import './cardGrid.scss';

const CardGrid = ({ itemList, CardComponent }) => {
  return (
    <section className='card-grid' id='store'>
      <div className='card-grid-container'>
        {itemList.map((card) => (
          <CardComponent key={card.id} item={card} url={card.url} />
        ))}
      </div>
    </section>
  );
};

export default CardGrid;
