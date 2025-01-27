/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './homePage.scss';
import CardGrid from '../../components/CardGrid/CardGrid';
import MainContainer from '../../layouts/MainContainer/MainContainer';
import { getAllProducts } from '../../api/services/productsService';
import ProductCard from '../../components/ProductCard/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // este useEffect se ejecuta cuando se monta el componente y cuando cambia el valor de search
    getAllProducts(search).then((data) => {
      data = data?.map((product) => {
        product.pageUrl = `./products/${product.id}`;
        return product;
      });
      setProducts(data);
    });
  }, [search]);

  useEffect(() => {
    // este useEffect se ejecuta cuando se monta el componente y cuando cambia el valor de products
    if (products.length && !categories.length) {
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
    <MainContainer>
      <h1>Tienda React - Martin dos Santos</h1>
      <div className='search-bar'>
        <span>Categoria: </span>
        <select onChange={(e) => setSearch({ category: e.target.value })}>
          <option value=''>Todos</option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {products && <CardGrid itemList={products} CardComponent={ProductCard} />}
      {!products?.length && <p>Cargando productos...</p>}
    </MainContainer>
  );
};

export default HomePage;
