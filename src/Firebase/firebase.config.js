// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA11_bc4rQIM_gPXHmFnPGpT7-bwgF87v4",
  authDomain: "ticketbari-f547f.firebaseapp.com",
  projectId: "ticketbari-f547f",
  storageBucket: "ticketbari-f547f.firebasestorage.app",
  messagingSenderId: "349593238582",
  appId: "1:349593238582:web:d2c741a46eaa7f1e5aac97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);