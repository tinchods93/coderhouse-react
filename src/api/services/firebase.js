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

let instance = null;

class FirebaseApp {
  static cacheDuration = 3600000; // 1 hora en milisegundos

  static getDbInstance() {
    if (!instance) {
      instance = initializeApp(firebaseConfig);
    }
    return getFirestore(instance);
  }

  static async getItemsDocs(collectionName) {
    const cachedData = localStorage.getItem(collectionName);
    const now = Date.now();

    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);
      if (now - parsedCache.timestamp < FirebaseApp.cacheDuration) {
        return parsedCache.data;
      }
    }

    const db = FirebaseApp.getDbInstance();
    const itemCollection = collection(db, collectionName);
    const snapshot = await getDocs(itemCollection);
    const data = snapshot.docs.map((doc) => doc.data());

    const cacheObject = {
      data,
      timestamp: now,
    };

    localStorage.setItem(collectionName, JSON.stringify(cacheObject));
    console.log(
      'MARTIN_LOG=> FirebaseApp -> getItemsDocs -> cacheObject',
      cacheObject
    );
    return data;
  }

  static async getItemDoc(collectionName, docId) {
    const cachedData = localStorage.getItem(collectionName);
    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);
      const items = parsedCache.data;
      return items.find((item) => `${item.id}` === docId);
    }
    const db = FirebaseApp.getDbInstance();
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    console.log('MARTIN_LOG=> FirebaseApp -> getItemDoc -> docSnap', docSnap);
    return docSnap.data();
  }

  // crear un nuevo documento en la coleccion
  static async createItemDoc(collectionName, data) {
    const db = FirebaseApp.getDbInstance();
    const itemCollection = collection(db, collectionName);
    const docRef = doc(itemCollection);
    await setDoc(docRef, data);
    localStorage.removeItem(collectionName); // Invalidamos la cache
  }

  // actualizar un documento en la coleccion
  static async updateItemDoc(collectionName, docId, data) {
    const db = FirebaseApp.getDbInstance();
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data, { merge: true });
    localStorage.removeItem(collectionName); // Invalidamos la cache
  }
}

export default FirebaseApp;
