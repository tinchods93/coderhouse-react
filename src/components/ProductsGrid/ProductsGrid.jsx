/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import CardGrid from '../../components/CardGrid/CardGrid';
import { getAllProducts } from '../../api/services/productsService';
import ProductCard from '../../components/ProductCard/ProductCard';
import LoadingComponent from '../Loading/LoadingComponent';

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    // este useEffect se ejecuta cuando se monta el componente y cuando cambia el valor de search o pageIndex
    getAllProducts(search, pageIndex)
      .then((data) => {
        // agregamos la propiedad pageUrl a cada producto
        const response = data?.products?.map((product) => {
          product.pageUrl = `./products/${product.id}`;
          return product;
        });
        setProducts(response);
        setTotalProducts(data?.total);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search, pageIndex]);

  useEffect(() => {
    // este useEffect se ejecuta cuando se monta el componente y cuando cambia el valor de products
    if (products?.length && !categories?.length) {
      const tempCategories = [...categories];
      products?.forEach((product) => {
        if (!tempCategories.includes(product.category)) {
          tempCategories.push(product.category);
        }
      });
      setCategories(tempCategories);
    }
  }, [products]);

  return (
    <div className='products-grid'>
      {isLoading && <LoadingComponent />}
      {!isLoading && (
        <>
          {products?.length && (
            <>
              <div className='search-bar'>
                <span>Categoria: </span>
                <select
                  onChange={(e) => setSearch({ category: e.target.value })}>
                  <option value=''>Todos</option>
                  {categories?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {products && (
                <CardGrid itemList={products} CardComponent={ProductCard} />
              )}
              <Pagination
                onChange={(page, pageSize) => {
                  if (pageSize !== search?.limit) {
                    setSearch({ limit: pageSize });
                  }
                  if (pageIndex !== page) {
                    setPageIndex(page);
                  }
                }}
                total={totalProducts}
                pageSize={products.length}
              />
            </>
          )}
          {!products?.length && (
            <h2>
              No hay productos disponibles o no se pudieron cargar. Revisar
              consola.
            </h2>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsGrid;
