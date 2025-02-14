import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyD-j7D49g2JkwCU0-TXsPncF_NUE6etjsk',
  authDomain: 'coderhouse-react-5bec5.firebaseapp.com',
  projectId: 'coderhouse-react-5bec5',
  storageBucket: 'coderhouse-react-5bec5.firebasestorage.app',
  messagingSenderId: '390569457565',
  appId: '1:390569457565:web:61e287e51213551670e174',
};

let instance = null;

class FirebaseApp {
  static getDbInstance() {
    if (!instance) {
      instance = initializeApp(firebaseConfig);
    }
    return getFirestore(instance);
  }
  static async getItemsDocs(collectionName) {
    const db = FirebaseApp.getDbInstance();
    const productsCollection = collection(db, collectionName);
    return getDocs(productsCollection);
  }

  static async getItemDoc(collectionName, docId) {
    const db = FirebaseApp.getDbInstance();
    const docRef = doc(db, collectionName, docId);
    return getDoc(docRef);
  }
}

export default FirebaseApp;
