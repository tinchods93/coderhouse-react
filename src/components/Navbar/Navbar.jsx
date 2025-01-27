import CartWidget from '../CartWidget/CartWidget';
import './navbar.scss';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='logo-container'>
        <img
          src='https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png'
          alt='logo'
        />
      </div>
      <ul className='nav-links'>
        <li>
          <a href='/' className='nav-link'>
            Inicio
          </a>
        </li>
        <li>
          <a href='/about' className='nav-link'>
            Nosotros
          </a>
        </li>
        <li>
          <CartWidget />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
