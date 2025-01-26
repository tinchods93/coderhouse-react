import './card.scss';

/*
header: any
content: any
 */
const Card = ({ header, children }) => {
  return (
    <article className='card'>
      <div className='card-header'>{header}</div>
      <div className='card-content'>{children}</div>
    </article>
  );
};

export default Card;
