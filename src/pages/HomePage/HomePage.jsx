/* eslint-disable react-hooks/exhaustive-deps */
import './homePage.scss';
import ItemList from '../../components/ItemList/ItemList';
import MainContainer from '../../layouts/MainContainer/MainContainer';
import Item from '../../components/Item/Item';
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer';

const HomePage = () => {
  return (
    <MainContainer>
      <h1>Tienda React - Martin dos Santos</h1>
      <>
        <ItemListContainer />
      </>
    </MainContainer>
  );
};

export default HomePage;
