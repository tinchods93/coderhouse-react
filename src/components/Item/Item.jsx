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
        <p>{product.description}</p>
        <p>${product.price}</p>
        <p>{product.category}</p>
        {product.stock > 0 ? (
          <p>Stock: {product.stock}</p>
        ) : (
          <p style={{ color: 'red', fontWeight: 600 }}>Sin stock</p>
        )}
      </a>
    </Card>
  );
};

export default Item;
