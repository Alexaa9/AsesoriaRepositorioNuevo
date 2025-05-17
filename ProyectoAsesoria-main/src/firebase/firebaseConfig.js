// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwbWttJSgmtgh3v7IAZIgSiwdGCItdIJU",
  authDomain: "asesorias-32539.firebaseapp.com",
  projectId: "asesorias-32539",
  storageBucket: "asesorias-32539.firebasestorage.app",
  messagingSenderId: "857123942429",
  appId: "1:857123942429:web:c3f9cd78678074b10916f4",
  measurementId: "G-25GV9Y89CB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };