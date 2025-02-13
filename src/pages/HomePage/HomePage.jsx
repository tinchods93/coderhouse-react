/* eslint-disable react-hooks/exhaustive-deps */
import './homePage.scss';
import CardGrid from '../../components/CardGrid/CardGrid';
import MainContainer from '../../layouts/MainContainer/MainContainer';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';

const HomePage = () => {
  return (
    <MainContainer>
      <h1>Tienda React - Martin dos Santos</h1>
      <>
        <ProductsGrid />
      </>
    </MainContainer>
  );
};

export default HomePage;
