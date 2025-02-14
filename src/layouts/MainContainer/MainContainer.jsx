import './mainContainer.scss';
import LoadingComponent from '../../components/Loading/LoadingComponent';

const MainContainer = ({ children }) => {
  return <main>{children ?? <LoadingComponent />}</main>;
};

export default MainContainer;
