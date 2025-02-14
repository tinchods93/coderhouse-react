import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext/CartContextProvider';
import '../CartWidget/cartWidget.scss';

const CartItem = ({ item }) => {
  const [, addToCart, removeFromCart, deleteFromCart] = useContext(CartContext);

  return (
    <div className='cart__items__list__item'>
      <div className='cart__items__list__item-image'>
        <img src={item.images?.[0]} alt='item' />
      </div>
      <div className='cart__items__list__item-info'>
        <h3>{item.title}</h3>
        <div className='cart__items__list__item-info-quantity'>
          <div className='cart__items__list__item-info-quantity-actions'>
            <button onClick={() => removeFromCart(item)}>-</button>
            <span>{item.quantity || 1}</span>
            <button onClick={() => addToCart(item)}>+</button>
          </div>
          <button onClick={() => deleteFromCart(item)}>Eliminar</button>
        </div>
      </div>
      <div className='cart__items__list__item-total'>
        <h3>${(item.price * item.quantity).toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CartItem;
