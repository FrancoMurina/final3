// Import the functions you need from the SDKs you need
import app  from "firebase/app";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmkXngh4QqYmDzmasXGUEDHUW3blTD4eo",
  authDomain: "final-3-90fad.firebaseapp.com",
  projectId: "final-3-90fad",
  storageBucket: "final-3-90fad.appspot.com",
  messagingSenderId: "943745808878",
  appId: "1:943745808878:web:a2bb6de87a2e069e91b6ff"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const storage = app.storage();
export const auth = firebase.auth();
export const db = app.firestore();