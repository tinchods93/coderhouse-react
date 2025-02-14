import Card from '../Card/Card';

const ProductCard = ({ item: product }) => {
  const HeaderContent = (
    <>
      <img src={product.images?.[0]} alt={product.name} />
      <h2>{product.title}</h2>
    </>
  );

  return (
    <Card header={HeaderContent} url={product.pageUrl}>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>{product.category}</p>
    </Card>
  );
};

export default ProductCard;
