import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAy7Arh2eNX9BpgKZGFXNmoz4ygRDkS8n0",
    authDomain: "wildtrails-60d05.firebaseapp.com",
    projectId: "wildtrails-60d05",
    storageBucket: "wildtrails-60d05.firebasestorage.app",
    messagingSenderId: "830817617971",
    appId: "1:830817617971:web:047a57bbc5e6cdbcf7bb46",
    measurementId: "G-LWNT8CW6B3"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
