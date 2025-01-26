import { useEffect, useState } from 'react';
import CardGrid from '../../components/CardGrid/CardGrid';
import MainContainer from '../../layouts/MainContainer/MainContainer';
import { getAllProducts } from '../../api/services/productsService';
import ProductCard from '../../components/ProductCard/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data));
  }, []);

  return (
    <MainContainer>
      <h2>Home h1</h2>
      {products && <CardGrid itemList={products} CardComponent={ProductCard} />}
    </MainContainer>
  );
};

export default HomePage;
