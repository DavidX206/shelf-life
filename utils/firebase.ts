// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWuSYE2folQ660PfS13c75_vNL46jlg3Y",
  authDomain: "shelf-life-a14ab.firebaseapp.com",
  projectId: "shelf-life-a14ab",
  storageBucket: "shelf-life-a14ab.appspot.com",
  messagingSenderId: "161811010955",
  appId: "1:161811010955:web:2403ead20d412f33b74b8e",
  measurementId: "G-N7QYNETN01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);