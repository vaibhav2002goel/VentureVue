// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhXAzbLypV-oJ4vuGjmyzbAzclBqQP4SI",
  authDomain: "venturevue-app.firebaseapp.com",
  projectId: "venturevue-app",
  storageBucket: "venturevue-app.appspot.com",
  messagingSenderId: "954032103594",
  appId: "1:954032103594:web:85411d67d522ca2c2530d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
