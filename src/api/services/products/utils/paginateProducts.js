const paginateProducts = (products, limit = 20) => {
  // dividir products en paginas de acuerdo al limite
  const paginatedProducts = [];
  // con esto calculamos cuantas paginas vamos a tener
  const pages = Math.ceil(products.length / limit);

  for (let i = 0; i < pages; i++) {
    paginatedProducts.push(products.slice(i * limit, (i + 1) * limit));
  }

  return {
    pages: paginatedProducts,
    page_count: paginatedProducts.length,
  };
};

export default paginateProducts;
