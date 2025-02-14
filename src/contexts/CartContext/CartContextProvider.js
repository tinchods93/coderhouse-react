/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

const initialCart = {
  products: [],
  total: 0,
};

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const saveCart = (value) => {
    setCart(value);
    localStorage.setItem('cart', JSON.stringify(value));
  };

  const loadCart = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      saveCart(JSON.parse(cart));
    } else {
      saveCart(JSON.parse(JSON.stringify(initialCart)));
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Si existe el item en el carrito aumenta la cantidad, si no lo agregamos
  const addToCart = (product) => {
    const productIndex = cart.products.findIndex(
      (item) => item.id === product.id
    );
    const newCart = { ...cart };
    if (productIndex !== -1) {
      newCart.products[productIndex].quantity += 1;
    } else {
      newCart.products = [...cart.products, { ...product, quantity: 1 }];
    }
    newCart.total = calculateTotalAmount();
    saveCart(newCart);
  };

  const calculateTotalAmount = () => {
    let total = 0;

    if (cart.products.length === 0) return total;

    cart.products?.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };

  // Si existe el item en el carrito, se disminuye la cantidad en 1
  const removeFromCart = (product) => {
    const productIndex = cart.products.findIndex(
      (item) => item.id === product.id
    );
    const newCart = { ...cart };
    if (productIndex !== -1) {
      if (newCart?.products[productIndex].quantity > 1) {
        newCart.products[productIndex].quantity -= 1;
      } else {
        newCart.products.splice(productIndex, 1);
      }
    }
    newCart.total = calculateTotalAmount();
    saveCart(newCart);
  };

  // Elimina el item del carrito
  const deleteFromCart = (product) => {
    const newCart = { ...cart };
    newCart.products = newCart.products.filter(
      (item) => item.id !== product.id
    );
    newCart.total = calculateTotalAmount();
    saveCart(newCart);
  };

  return (
    <CartContext.Provider
      value={[cart, addToCart, removeFromCart, deleteFromCart]}>
      {children}
    </CartContext.Provider>
  );
};
