// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite'
import {getStorage} from 'firebase/storage'
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD-9IYirc-Sb_XwL5-KoZ05RPAUIjfKwmE",
  authDomain: "my-vrc.firebaseapp.com",
  projectId: "my-vrc",
  storageBucket: "my-vrc.appspot.com",
  messagingSenderId: "276197547141",
  appId: "1:276197547141:web:6edc9c0a01844efc451dec",
  measurementId: "G-49HYPKJWB3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const storage = getStorage(app)

export {firestore , storage }
