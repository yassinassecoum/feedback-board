// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0oLgmmK-QkXDGW4uS__gfBQUZs2tFIz8",
    authDomain: "twetter-38539.firebaseapp.com",
    projectId: "twetter-38539",
    storageBucket: "twetter-38539.appspot.com",
    messagingSenderId: "1016918128917",
    appId: "1:1016918128917:web:fb66a2db0c1790809b111c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);