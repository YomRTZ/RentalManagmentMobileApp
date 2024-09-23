// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCM0QIcJaAwZ53BSQ-Fp0yLUMsh02Sx3HU",
  authDomain: "rental-management-system-a6055.firebaseapp.com",
  projectId: "rental-management-system-a6055",
  storageBucket: "rental-management-system-a6055.appspot.com",
  messagingSenderId: "468296418746",
  appId: "1:468296418746:web:75d395c3c0ef64e3cb0983",
  measurementId: "G-0R5KXHRFDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore=getFirestore(app);
const auth=getAuth(app);

export{app, auth, firestore};