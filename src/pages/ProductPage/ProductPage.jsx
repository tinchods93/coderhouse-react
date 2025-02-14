/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './productPage.scss';
import MainContainer from '../../layouts/MainContainer/MainContainer';
import { useParams } from 'react-router';
import { getProductById } from '../../api/services/products/productsService';
import LoadingComponent from '../../components/Loading/LoadingComponent';

const ProductPage = (props) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

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
                <div className='product-page__actions'>
                  <button>Agregar al carrito</button>
                  <p>${product.price}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </MainContainer>
  );
};

export default ProductPage;
