import apiConfig from '../config/apiConfig';

const baseDomain = apiConfig.baseUrl;
const basePath = `${baseDomain}/${apiConfig.products}`;

export const getAllProducts = async () => {
  const response = await fetch(basePath);
  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${basePath}/${id}`);
  return response.json();
};
