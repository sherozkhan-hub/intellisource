// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogging-application-d3c87.firebaseapp.com",
  projectId: "blogging-application-d3c87",
  storageBucket: "blogging-application-d3c87.appspot.com",
  messagingSenderId: "1083857924499",
  appId: "1:1083857924499:web:30088ce2d120ce4d273866"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);