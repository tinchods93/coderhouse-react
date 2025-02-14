/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './checkoutPage.scss';
import MainContainer from '../../layouts/MainContainer/MainContainer';
import { CartContext } from '../../contexts/CartContext/CartContextProvider';
import CheckoutTicket from '../../components/CheckoutTicket/CheckoutTicket';
import { createPayment } from '../../api/services/checkout/checkoutService';

const CheckoutPage = () => {
  /**
     {
        products:[],
        total:0
    }
     */
  const [cart, , , , clearCart] = useContext(CartContext);
  const [showTicket, setShowTicket] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart?.products.length) {
      navigate('/');
    }
  }, [cart?.products?.length]);

  const handleShowTicket = (value) => {
    setShowTicket(value);
    if (value === false) {
      // limpiar el carrito
      clearCart();
      // redirigir a home
      navigate('/');
    }
  };

  const handleConfirmPayment = async () => {
    cart.payment_date = new Date().toLocaleString();
    await createPayment(cart);
    handleShowTicket(true);
  };

  // deberiamos mostrar todos los productos que hay en el carrito, cantidad, precio por cantidad
  // y el total de la compra
  // deberiamos tener un boton para confirmar la compra
  return (
    <MainContainer>
      <h1>Revisar Compra</h1>
      <div className='checkout-container'>
        {cart?.products?.length ? (
          <>
            <table className='checkout-items-table'>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart?.products.map((item) => (
                  <tr
                    key={item.id}
                    className='checkout-item'
                    onClick={() => {
                      navigate(`/products/${item.id}`);
                    }}>
                    <td>
                      <div className='checkout-item-img-container'>
                        <img src={item.images?.[0]} alt='item' />
                      </div>
                    </td>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='checkout-total'>
              <h2>Subtotal:</h2>
              <h2>${cart.total.toFixed(2)}</h2>
            </div>
            <div className='checkout-actions'>
              <button onClick={handleConfirmPayment}>Pagar</button>
            </div>
            {showTicket && (
              <CheckoutTicket onClose={() => handleShowTicket(false)} />
            )}
          </>
        ) : (
          <h2>No hay productos en el carrito</h2>
        )}
      </div>
    </MainContainer>
  );
};

export default CheckoutPage;
