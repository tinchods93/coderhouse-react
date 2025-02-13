const baseUrl = 'https://dummyjson.com';

const apiConfig = {
  baseUrl,
  products: {
    getAll: {
      method: 'GET',
      url: `${baseUrl}/products`,
    },
    getById: {
      method: 'GET',
      url: `${baseUrl}/products/:id`,
    },
  },
  carts: {
    getAll: {
      method: 'GET',
      url: `${baseUrl}/carts`,
    },
    getById: {
      method: 'GET',
      url: `${baseUrl}/carts/:id`,
    },
    addProduct: {
      method: 'POST',
      url: `${baseUrl}/carts/:id/products`,
    },
    deleteProduct: {
      method: 'DELETE',
      url: `${baseUrl}/carts/:id/products/:productId`,
    },
  },
};

export default apiConfig;
