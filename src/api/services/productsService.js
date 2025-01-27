import apiConfig from '../config/apiConfig';

export const getAllProducts = async (searchQuery) => {
  let url = apiConfig.products.getAll.url;
  if (searchQuery?.category) {
    url += `?category=${searchQuery.category}`;
  }
  const response = await fetch(url)?.then((res) => res.json());

  return response;
};

export const getProductById = async (id) => {
  const finalUrl = apiConfig.products.getById.url.replace(':id', id);
  const response = await fetch(finalUrl);
  return response.json();
};
