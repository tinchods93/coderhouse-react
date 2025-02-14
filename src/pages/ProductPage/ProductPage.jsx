/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import './productPage.scss';
import MainContainer from '../../layouts/MainContainer/MainContainer';
import { useParams } from 'react-router';
import { getProductById } from '../../api/services/products/productsService';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import { CartContext } from '../../contexts/CartContext/CartContextProvider';

const ProductPage = (props) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [, addToCart] = useContext(CartContext);

  useEffect(() => {
    if (params.id && !product) {
      getProductById(params.id).then((data) => {
        setProduct(data);
        setIsLoading(false);
      });
    }
  }, [params?.id]);

  return (
    <MainContainer>
      {isLoading && <LoadingComponent />}
      {product && (
        <div className='product-page'>
          <div className='product-page__container'>
            <section>
              <div className='product-page__image'>
                <img src={product.images?.[0]} alt={product.title} />
              </div>
            </section>
            <section>
              <div className='product-page__header'>
                <h1>{product.title}</h1>
                <p>{product.category}</p>
              </div>
              <div className='product-page__body'>
                <div className='product-page__info'>
                  <p>{product.description}</p>
                </div>
                {product.stock > 0 ? (
                  <>
                    <p>Stock: {product.stock}</p>
                    <div className='product-page__actions'>
                      <input
                        type='number'
                        value={quantity}
                        min={1}
                        max={product.stock}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <button
                        className='custom-button'
                        onClick={() => addToCart(product, quantity)}>
                        Agregar al carrito
                      </button>
                      <p>${product.price}</p>
                    </div>
                  </>
                ) : (
                  <p style={{ color: 'red', fontWeight: 600 }}>Sin stock</p>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </MainContainer>
  );
};

export default ProductPage;
