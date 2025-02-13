const buildQueryParams = (queryParams) => {
  if (!queryParams || !Object.keys(queryParams)?.length) return '';

  const result = Object.keys(queryParams).reduce((acc, key) => {
    if (![null, undefined].includes(queryParams[key])) {
      return `${acc}${key}=${queryParams[key]}&`;
    }
    return acc;
  }, '?');

  // Eliminar el último &
  return result.slice(0, -1);
};

export default buildQueryParams;
