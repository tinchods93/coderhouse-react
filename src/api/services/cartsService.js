import apiConfig from '../config/apiConfig';

export const getCartById = async (cartId) => {
  const response = await fetch(`${apiConfig.url}/carts/${cartId}`).catch(
    (error) => {
      console.error('Error fetching cart by id', error);
      return undefined;
    }
  );
  const data = await response.json();
  return data;
};

export const addItemToCart = async (cartId, item) => {
  const response = await fetch(`${apiConfig.url}/carts/${cartId}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  return data;
};

export const removeItemFromCart = async (cartId, productId, quantity) => {
  let url = `${apiConfig.url}/carts/${cartId}/products/${productId}`;
  if (quantity) {
    url += `?quantity=${quantity}`;
  }

  const response = await fetch(url, {
    method: 'POST',
  });
  const data = await response.json();
  return data;
};
