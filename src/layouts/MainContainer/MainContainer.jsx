import './mainContainer.scss';

const MainContainer = ({ children }) => {
  return <main>{children ?? <h1>Este es un Header 3</h1>}</main>;
};

export default MainContainer;
