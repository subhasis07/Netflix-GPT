// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//add to gitignore
const firebaseConfig = {
  apiKey: "AIzaSyAIBX11vXjrBJ8UR9Xwwz4CbK5j8ebFaVQ",
  authDomain: "nextflix-gpt-deeca.firebaseapp.com",
  projectId: "nextflix-gpt-deeca",
  storageBucket: "nextflix-gpt-deeca.firebasestorage.app",
  messagingSenderId: "214667892739",
  appId: "1:214667892739:web:7af73f37e523134edfd636",
  measurementId: "G-STM9XJPPL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
