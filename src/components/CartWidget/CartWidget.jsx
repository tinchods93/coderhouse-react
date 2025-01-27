import { useEffect, useState } from 'react';
import './cartWidget.scss';
import { getCartById } from '../../api/services/cartsService';

const CartItem = ({ item }) => {
  return (
    <div className='cart__items__list__item'>
      <div className='cart__items__list__item-image'>
        <img
          src='https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png'
          alt='item'
        />
      </div>
      <div className='cart__items__list__item-info'>
        <h3>Producto 1</h3>
        <div className='cart__items__list__item-info-quantity'>
          <div className='cart__items__list__item-info-quantity-actions'>
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>
        </div>
      </div>
      <div className='cart__items__list__item-total'>
        <h3>$10.00</h3>
      </div>
    </div>
  );
};
const CartWidget = ({ cartId }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (showCart && cartId) {
      setLoading(true);
      getCartById(cartId)
        .then((data) => {
          setCart(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [cartId, showCart]);

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
            {!loading ? (
              cart?.products?.length > 0 ? (
                <>
                  <div className='cart__items'>
                    <div className='cart__items__list'>
                      <CartItem />
                      <CartItem />
                      <CartItem />
                    </div>
                    <div className='cart__total'>
                      <h2>Subtotal:</h2>
                      <h2>$10.00</h2>
                    </div>
                  </div>
                  <div className='cart__actions'>
                    <button>Ver Carrito</button>
                    <button>Finalizar Compra</button>
                  </div>
                </>
              ) : (
                <>
                  <h2>No hay productos en el carrito</h2>
                </>
              )
            ) : (
              <>
                <h2>Cargando...</h2>
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
