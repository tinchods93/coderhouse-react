import apiConfig from '../config/apiConfig';
import buildQueryParams from './utils/buildQueryParams';

const getSearchValues = (pageIndex = 1, limit) => {
  // obtenemos el valor de skip y limit del localStorage
  const cachedPayload = JSON.parse(localStorage.getItem('cachedPayload')) || {
    skip: 0,
    total: 0,
    limit: 30,
  };

  // si limit es null, entonces usamos el valor de limit del localStorage
  const limitValue = limit ?? cachedPayload?.limit;

  // calculamos el valor de skip
  let skip = (pageIndex - 1) * limitValue;

  if (skip > cachedPayload?.total) {
    skip = cachedPayload?.total;
  }

  if (skip < 0) {
    skip = 0;
  }

  let remainingProductsCount = cachedPayload?.total - (skip || limitValue);

  return { skip, remainingProductsCount, limit: limitValue };
};

export const getAllProducts = async (searchQuery = {}, pageIndex) => {
  let url = apiConfig.products.getAll.url;

  // obtenemos los valores de skip y limit
  const searchValues = getSearchValues(pageIndex, searchQuery?.limit);
  const queryParams = {
    ...searchQuery,
    skip: searchValues.skip,
    limit: searchValues.limit,
  };

  // construimos la url final
  const finalUrl = `${url}${buildQueryParams(queryParams)}`;

  const response = await fetch(finalUrl)
    ?.then((res) => res.json())
    .catch((error) => {
      console.error('Error fetching all products', error);
    });

  // esto lo hacemos para poder guardar el total real de cantidad de productos
  const result = {
    ...response,
    remainingProductsCount: searchValues.remainingProductsCount,
  };
  localStorage.setItem('cachedPayload', JSON.stringify(result));

  return result;
};

export const getProductById = async (id) => {
  const finalUrl = apiConfig.products.getById.url.replace(':id', id);
  const response = await fetch(finalUrl)
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error fetching product by id', error);
    });

  return response;
};
