import FirebaseApp from '../firebase';

const firestoreCollection = 'products';

export const getAllProducts = async () => {
  const response = await FirebaseApp.getItemsDocs(firestoreCollection);
  console.log('MARTIN_LOG=> getAllProducts -> response', response);
  return response;
};

export const getProductById = async (id) => {
  // buscar un producto en firebase por su id
  const response = await FirebaseApp.getItemDoc(firestoreCollection, id);

  return response;
};

export const updateProductsStockByCart = async (cart) => {
  const promises = cart.products.map((product) => {
    const productQuantity = product.stock - product.quantity;
    return FirebaseApp.updateItemDoc(firestoreCollection, product.id, {
      stock: productQuantity,
    });
  });

  const response = await Promise.all(promises)
    .then(() => {
      console.log('**STOCK ACTUALIZADO**');
      return true;
    })
    .catch((error) => {
      console.error('Error actualizando el stock', error);
    });

  return response;
};
