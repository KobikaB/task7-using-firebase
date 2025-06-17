import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCclRuTjQwDU-zXrXS0nAbQEs8gn_XPoYM",
  authDomain: "student-management-syste-b8a8b.firebaseapp.com",
  projectId: "student-management-syste-b8a8b",
  storageBucket: "student-management-syste-b8a8b.firebasestorage.app",
  messagingSenderId: "1089837461447",
  appId: "1:1089837461447:web:fcd9950c9996dfa5b073e2",
  measurementId: "G-RMPZT47VRS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
