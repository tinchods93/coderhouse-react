import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router';
import './styles/global.scss';
import ProductPage from './pages/ProductPage/ProductPage';
import AboutPage from './pages/AboutPage/AboutPage';
import { CartContextProvider } from './contexts/CartContext/CartContextProvider';

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path='*'
            element={
              <div style={{ textAlign: 'center', marginTop: '20%' }}>
                <h1 style={{ fontSize: '6rem', color: '#ff0000' }}>404</h1>
                <p style={{ fontSize: '1.5rem' }}>
                  Lo sentimos, la página que buscas no existe.
                </p>
                <a href='/' style={{ fontSize: '1.2rem', color: '#007bff' }}>
                  Volver a la página principal
                </a>
              </div>
            }
          />
          <Route path='/' element={<HomePage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
