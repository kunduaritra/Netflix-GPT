// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB5gsqd4IIc1rJbioB6LghYn5CFgP2kSU",
  authDomain: "netflixgpt-a073b.firebaseapp.com",
  projectId: "netflixgpt-a073b",
  storageBucket: "netflixgpt-a073b.appspot.com",
  messagingSenderId: "192969023583",
  appId: "1:192969023583:web:ed89fc8b37a71482d93bea",
  measurementId: "G-LPGDHTHECP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
