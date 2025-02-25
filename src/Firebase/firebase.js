import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { 
  getAuth, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBOZihPHMWzQTwKyzbjbryJkndKOArxdHM",
  authDomain: "super-admin-salenutpam.firebaseapp.com",
  projectId: "super-admin-salenutpam",
  storageBucket: "super-admin-salenutpam.appspot.com",
  messagingSenderId: "652064989942",
  appId: "1:652064989942:web:80dacea08bfaf0bf9b82d7",
  measurementId: "G-SJ93XGFTMF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { 
  app,
  db, 
  storage, 
  auth, 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
};