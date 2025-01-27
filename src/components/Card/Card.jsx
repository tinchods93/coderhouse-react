import './card.scss';

/*
header: any
content: any
 */
const Card = ({ header, children, url }) => {
  return (
    <a href={url} className='card'>
      <div className='card-header'>{header}</div>
      <div className='card-content'>{children}</div>
    </a>
  );
};

export default Card;
