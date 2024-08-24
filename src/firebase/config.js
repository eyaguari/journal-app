// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqL2WX_VDerdzTORi-JPRqMMGPpyskLUY",
  authDomain: "react-cursos-c0d21.firebaseapp.com",
  projectId: "react-cursos-c0d21",
  storageBucket: "react-cursos-c0d21.appspot.com",
  messagingSenderId: "910715055452",
  appId: "1:910715055452:web:3a7848f72a25b2ffeb6599"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseAppFirestore = getFirestore(FirebaseApp);