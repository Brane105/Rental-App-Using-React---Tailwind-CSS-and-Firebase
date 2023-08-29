// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnxTa23C3GR3P-gQHJKBYgXiroupot2Aw",
    authDomain: "realtor-app-backend.firebaseapp.com",
    projectId: "realtor-app-backend",
    storageBucket: "realtor-app-backend.appspot.com",
    messagingSenderId: "475339688874",
    appId: "1:475339688874:web:e43637554a38b65e9479d3"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();