import { Commet } from 'react-loading-indicators';
import './loadingComponent.scss';

const LoadingComponent = () => {
  return (
    <div className='loading-container'>
      <Commet color='#000000' size='medium' text='' textColor='' />
    </div>
  );
};

export default LoadingComponent;
