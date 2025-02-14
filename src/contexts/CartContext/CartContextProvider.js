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
  const addToCart = (product, quantity = 1) => {
    quantity = Number(quantity);
    if (product.stock < quantity) return;

    const productIndex = cart.products.findIndex(
      (item) => item.id === product.id
    );
    const newCart = { ...cart };
    if (productIndex !== -1) {
      // si el producto ya existe, debemos checkear si la cantidad que se quiere agregar resultara en un stock mayor al disponible

      if (newCart.products[productIndex].quantity + quantity <= product.stock) {
        newCart.products[productIndex].quantity += quantity;
      } else {
        return;
      }
    } else {
      newCart.products = [...cart.products, { ...product, quantity: quantity }];
    }
    newCart.total = calculateTotalAmount(newCart);
    saveCart(newCart);
  };

  const calculateTotalAmount = (newCart) => {
    let total = 0;

    if (newCart?.products.length === 0) return total;

    newCart.products?.forEach((product) => {
      product.total_price = Number(
        (product.price * product.quantity).toFixed(2)
      );
      total += product.total_price;
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
    newCart.total = calculateTotalAmount(newCart);
    saveCart(newCart);
  };

  // Elimina el item del carrito
  const deleteFromCart = (product) => {
    const newCart = { ...cart };
    newCart.products = newCart.products.filter(
      (item) => item.id !== product.id
    );
    newCart.total = calculateTotalAmount(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart(JSON.parse(JSON.stringify(initialCart)));
  };

  return (
    <CartContext.Provider
      value={[cart, addToCart, removeFromCart, deleteFromCart, clearCart]}>
      {children}
    </CartContext.Provider>
  );
};
