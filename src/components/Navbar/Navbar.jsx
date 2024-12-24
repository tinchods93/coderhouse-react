import './navbar.scss';

const Navbar = () => {
  return (
    <nav>
      <div className='logo-container'>
        <img
          src='https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png'
          alt='logo'
        />
      </div>
      <ul className='nav-links'>
        <li>
          <a href='#top' className='nav-link'>
            Inicio
          </a>
        </li>
        <li>
          <a href='#about' className='nav-link'>
            Nosotros
          </a>
        </li>
        <li>
          <a href='#store' className='nav-link'>
            Tienda
          </a>
        </li>
        <li>
          <a href='#contact' className='nav-link'>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
