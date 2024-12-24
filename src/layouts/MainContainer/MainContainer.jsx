import './mainContainer.scss';

const MainContainer = ({ children }) => {
  return <main>{children ?? <h2>Este es un Header 3</h2>}</main>;
};

export default MainContainer;
