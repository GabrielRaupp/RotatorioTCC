import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';  // Para autenticação
import { getFirestore } from 'firebase/firestore';  // Para Firestore
import { getDatabase } from 'firebase/database';  // Para Realtime Database

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCn7FdIPNBpDJvnLu38Nqk2MvKA4HLW5C8",
  authDomain: "rotatorio-486de.firebaseapp.com",
  projectId: "rotatorio-486de",
  storageBucket: "rotatorio-486de.firebasestorage.app",
  messagingSenderId: "786713643511",
  appId: "1:786713643511:web:f851e60531f90b982906f2",
  measurementId: "G-7NL1XHKK25"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando os serviços Firebase
const auth = getAuth(app);  // Para autenticação
const firestore = getFirestore(app);  // Para Firestore
const database = getDatabase(app);  // Para Realtime Database

export { auth, firestore, database, createUserWithEmailAndPassword, signInWithEmailAndPassword };
