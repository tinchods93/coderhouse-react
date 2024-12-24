import CardGrid from '../../components/CardGrid/CardGrid';
import MainContainer from '../../layouts/MainContainer/MainContainer';
import fakeProductsData from '../../assets/fakeProducts.json';

const HomePage = () => {
  return (
    <MainContainer>
      <h2>Home h1</h2>
      <CardGrid cards={fakeProductsData} />
    </MainContainer>
  );
};

export default HomePage;
