import { useContext } from 'react';
import Card from '../Card/Card';
import { CartContext } from '../../contexts/CartContext/CartContextProvider';

const Item = ({ item: product }) => {
  const [, addToCart] = useContext(CartContext);

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
      </a>
      <button onClick={() => addToCart(product)}>Agregar al carrito</button>
    </Card>
  );
};

export default Item;
