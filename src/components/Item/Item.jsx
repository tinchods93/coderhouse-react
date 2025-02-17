import Card from '../Card/Card';

const Item = ({ item: product }) => {
  const HeaderContent = (
    <>
      <img src={product.images?.[0]} alt={product.name} />
      <h2>{product.title}</h2>
    </>
  );

  return (
    <Card header={HeaderContent}>
      <a href={product.pageUrl}>
        <p>${product.price}</p>
        <p>{product.category}</p>
      </a>
    </Card>
  );
};

export default Item;
