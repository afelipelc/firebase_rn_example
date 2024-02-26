// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "API_KEY_HERE",
  authDomain: "APP_NAME.firebaseapp.com",
  databaseURL: "https://APP_NAME.firebaseio.com",
  projectId: "APP_NAME",
  storageBucket: "APP_NAME.appspot.com",
  messagingSenderId: "MSG_ID",
  appId: "APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
