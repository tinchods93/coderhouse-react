import './card.scss';

/*
header: any
content: any
 */
const Card = ({ header, children }) => {
  return (
    <div className='card'>
      <div className='card-header'>{header}</div>
      <div className='card-content'>{children}</div>
    </div>
  );
};

export default Card;
