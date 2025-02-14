import FirebaseApp from '../firebase';

const firestoreCollection = 'products';

export const getAllProducts = async () => {
  const response = await FirebaseApp.getItemsDocs(firestoreCollection)
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        products: data,
        total: data.length,
      };
    })
    .catch((error) => {
      console.error('Error obteniendo los productos', error);
    });

  return response;
};

export const getProductById = async (id) => {
  // buscar un producto en firebase por su id
  const response = await FirebaseApp.getItemDoc(firestoreCollection, id)
    .then((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .catch((error) => {
      console.error('Error obteniendo el producto', error);
    });

  return response;
};
