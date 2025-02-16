import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

class FirebaseApp {
  static getCollection = async (collectionName) => {
    // hice que se guarde en el localStorage para evitar consumir la quota gratis de firebase
    const cachedCollection = localStorage.getItem(collectionName);
    if (cachedCollection) {
      return JSON.parse(cachedCollection);
    }

    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map((doc) => doc.data());

    localStorage.setItem(collectionName, JSON.stringify(data));
    return data;
  };

  static async getItemsDocs(collectionName) {
    const itemCollection = FirebaseApp.getCollection(collectionName);
    return itemCollection;
  }

  static async getItemDoc(collectionName, docId) {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  // crear un nuevo documento en la coleccion
  static async createItemDoc(collectionName, data) {
    const itemCollection = FirebaseApp.getCollection(collectionName);
    const docRef = doc(itemCollection);
    await setDoc(docRef, data);
    localStorage.removeItem(collectionName); // Invalidamos la cache
  }

  // actualizar un documento en la coleccion
  static async updateItemDoc(collectionName, docId, data) {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data, { merge: true });
    localStorage.removeItem(collectionName); // Invalidamos la cache
  }
}

export default FirebaseApp;
