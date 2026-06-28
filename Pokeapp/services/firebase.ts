import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRw6pdvfGrCS9rpqfFTKXlSKz2pe_8kDc",
  authDomain: "pokeapp-41dea.firebaseapp.com",
  projectId: "pokeapp-41dea",
  storageBucket: "pokeapp-41dea.firebasestorage.app",
  messagingSenderId: "1090477384024",
  appId: "1:1090477384024:web:86ce0fcc3d4a33793a052d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);