import { useContext, useState } from 'react';
import './cartWidget.scss';
import { CartContext } from '../../contexts/CartContext/CartContextProvider';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router';

const CartWidget = () => {
  const [cart] = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = (value) => {
    setShowCart(value);
  };

  return (
    <>
      <>
        {showCart && (
          <div className='cart'>
            <div className='cart__header'>
              <h2>Mi Carrito</h2>
              <button
                className='cart__header-close'
                onClick={() => handleShowCart(false)}>
                X
              </button>
            </div>
            {cart?.products?.length ? (
              <>
                <div className='cart__items'>
                  <div className='cart__items__list'>
                    {cart.products.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                  <div className='cart__total'>
                    <h2>Subtotal:</h2>
                    <h2>${cart.total.toFixed(2)}</h2>
                  </div>
                </div>
                <div className='cart__actions'>
                  <Link className='custom-button' to={'./checkout'}>
                    Pagar
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2>No hay productos en el carrito</h2>
              </>
            )}
          </div>
        )}
      </>
      <>
        <button onClick={() => handleShowCart(true)}>carrito</button>
      </>
    </>
  );
};

export default CartWidget;
