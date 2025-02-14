import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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
