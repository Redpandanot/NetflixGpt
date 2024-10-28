// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgkB-99ll8efEuRLwzi1Tt8PF992DixU8",
  authDomain: "netflixgpt-ba12e.firebaseapp.com",
  projectId: "netflixgpt-ba12e",
  storageBucket: "netflixgpt-ba12e.appspot.com",
  messagingSenderId: "465675547501",
  appId: "1:465675547501:web:c7b4e95676deebcf192064",
  measurementId: "G-6ENKWBDQL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();