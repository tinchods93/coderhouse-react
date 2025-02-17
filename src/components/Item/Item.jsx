import Card from '../Card/Card';

const Item = ({ item: product }) => {
  const HeaderContent = (
    <>
      <img src={product.images?.[0]} alt={product.name} />
    </>
  );

  return (
    <Card header={HeaderContent}>
      <div className='card-item-title'>
        <h2>{product.title}</h2>
        <p className='card-item-category'>{product.category}</p>
      </div>
      <div className='card-item-info'>
        <p className='card-item-product-price'>${product.price}</p>
        <a href={product.pageUrl} className='card-item-button'>
          Más info
        </a>
      </div>
    </Card>
  );
};

export default Item;
