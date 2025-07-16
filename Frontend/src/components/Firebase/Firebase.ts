// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBBjPDvzPXTvfQTxb9c0L9kqTHzdHpzDGg",
  authDomain: "tc-app-8f8a7.firebaseapp.com",
  projectId: "tc-app-8f8a7",
  storageBucket: "tc-app-8f8a7.firebasestorage.app",
  messagingSenderId: "815499806464",
  appId: "1:815499806464:web:991c381d2edbdfcbc395e5",
  measurementId: "G-LJYDKR0DX0",
  databaseURL: "https://tc-app-8f8a7-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;