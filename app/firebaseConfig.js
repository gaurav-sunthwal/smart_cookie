import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAalSZXTuiEBmAL-VIfVz6b_E4wb2VpvM",
  authDomain: "smart-cookie-29fbc.firebaseapp.com",
  projectId: "smart-cookie-29fbc",
  storageBucket: "smart-cookie-29fbc.appspot.com",
  messagingSenderId: "1031796376807",
  appId: "1:1031796376807:web:62337674171cb98c3a4e42",
  measurementId: "G-8BCGT8VZCH",
};



// Initialize Firebase
export const Firebase_APP = initializeApp(firebaseConfig);
export const Firebase_AUTH = getAuth(Firebase_APP);
export const Firebase_DB = getFirestore(Firebase_APP);