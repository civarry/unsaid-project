// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCatwMMHirADJOXsOrqiVtNT_bfik3k2fc",
  authDomain: "unsaidproject-2f857.firebaseapp.com",
  projectId: "unsaidproject-2f857",
  storageBucket: "unsaidproject-2f857.appspot.com",
  messagingSenderId: "187711122746",
  appId: "1:187711122746:web:4b68cbd02b527ef903b403",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
