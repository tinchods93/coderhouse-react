import Card from '../Card/Card';

const ProductCard = ({ item: product }) => {
  const HeaderContent = (
    <>
      <img src={product.thumbnails} alt={product.name} />
      <h2>{product.title}</h2>
    </>
  );

  return (
    <Card header={HeaderContent}>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.category}</p>
    </Card>
  );
};

export default ProductCard;
