/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo, memo } from 'react';
import { Pagination } from 'antd';
import ItemList from '../ItemList/ItemList';
import { getAllProducts } from '../../api/services/products/productsService';
import Item from '../Item/Item';
import LoadingComponent from '../Loading/LoadingComponent';
import paginateProducts from '../../api/services/products/utils/paginateProducts';

const ItemListContainer = () => {
  const [allProducts, setAllProducts] = useState([]); // todas las paginas
  const [selectedProductsPage, setSelectedProductsPage] = useState([]); // la pagina seleccionada
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState({ limit: 20 }); // parametros de busqueda
  const [categories, setCategories] = useState([]); // listado de las categorias, para poder rellenar el dropdown
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // este useEffect se ejecuta cuando se monta el componente y cuando cambia el valor de search o pageIndex
    getAllProducts().then((data) => {
      setAllProducts(data?.products);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    if (search?.category) {
      setPageIndex(1); // si cambia la categoria, volvemos a la pagina 1
      return allProducts?.filter(
        (product) => product.category === search.category
      );
    }

    return allProducts;
  }, [allProducts, search]);

  const pages = useMemo(() => {
    if (filteredProducts.length) {
      const { pages } = paginateProducts(filteredProducts, search?.limit);
      setTotalProducts(filteredProducts.length);
      return pages;
    }
    return [];
  }, [filteredProducts, search]);

  useEffect(() => {
    if (pages.length && pageIndex) {
      updateProductList(pages[pageIndex - 1]);
      setIsLoading(false); // sacamos el estado de loading, una vez que hayamos cargado la pagina de productos
    }
  }, [pages, pageIndex]);

  useEffect(() => {
    // este useEffect se ejecuta cuando se monta el componente y cuando cambia el valor de products
    if (selectedProductsPage?.length && !categories?.length) {
      const tempCategories = [...categories];
      selectedProductsPage?.forEach((product) => {
        if (!tempCategories.includes(product.category)) {
          tempCategories.push(product.category);
        }
      });
      setCategories(tempCategories);
    }
  }, [selectedProductsPage]);

  const updateProductList = (newProducts) => {
    const response = newProducts?.map((product) => {
      product.pageUrl = `./products/${product.id}`;
      return product;
    });
    setSelectedProductsPage(response);
  };

  return (
    <div className='products-grid'>
      {isLoading && <LoadingComponent />}
      {!isLoading && (
        <>
          {selectedProductsPage?.length && (
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
              {selectedProductsPage && (
                <ItemList
                  itemList={selectedProductsPage}
                  CardComponent={Item}
                />
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
                pageSize={search?.limit || 30}
              />
            </>
          )}
          {!selectedProductsPage?.length && (
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

export default memo(ItemListContainer);
