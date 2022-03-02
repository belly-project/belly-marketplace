// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-fUvK6HJA5mj4goAwhz9QSQTptfwVIBk",
  authDomain: "marketplace-belly.firebaseapp.com",
  projectId: "marketplace-belly",
  storageBucket: "marketplace-belly.appspot.com",
  messagingSenderId: "105448039539",
  appId: "1:105448039539:web:1fae34bb291040bab3f606",
  measurementId: "G-NDY970X817",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
