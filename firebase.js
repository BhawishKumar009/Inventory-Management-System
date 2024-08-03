// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgoFbPmbpXUFwTc1xdFEm2SupIb2DEXSw",
  authDomain: "inventorymanagementheadstarter.firebaseapp.com",
  projectId: "inventorymanagementheadstarter",
  storageBucket: "inventorymanagementheadstarter.appspot.com",
  messagingSenderId: "944585414234",
  appId: "1:944585414234:web:161e8ec4650a3c3cdeea63",
  measurementId: "G-QD10FKQ06C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export {database}
