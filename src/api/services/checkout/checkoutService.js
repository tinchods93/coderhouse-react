import FirebaseApp from '../firebase';
import formatCartToPayment from './utils/formatCartToPayment';

const firestoreCollection = 'payments';

/**
 * recibimos todo el carrito y formateamos la informacion
 * para generar un pago y guardarlo en firebase
 */
export const createPayment = async (cart) => {
  const payment = formatCartToPayment(cart);

  try {
    await FirebaseApp.createItemDoc(firestoreCollection, payment);
    console.log('**PAGO CREADO Y SUBIDO A FIRESTORE**');
    console.log('PAGO:', payment);
    return true;
  } catch (error) {
    console.error('createPayment -> error', error);
  }
};
