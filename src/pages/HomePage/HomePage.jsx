/* eslint-disable react-hooks/exhaustive-deps */
import './homePage.scss';
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer';
import MainContainer from '../../layouts/MainContainer/MainContainer';

const HomePage = () => {
  return (
    <MainContainer>
      <h1>Tienda React - Martin dos Santos</h1>
      <ItemListContainer />
    </MainContainer>
  );
};

export default HomePage;
