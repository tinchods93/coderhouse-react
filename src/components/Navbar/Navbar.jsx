import CartWidget from '../CartWidget/CartWidget';
import companyImage from '../../assets/images/logo192.png';
import './navbar.scss';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='logo-container'>
        <a href='./'>
          <img src={companyImage} alt='logo' />
        </a>
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
