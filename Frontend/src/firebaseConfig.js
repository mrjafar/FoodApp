/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyATvlbcVbUaHED_vkCb484_34C24Lbu7sg",
  authDomain: "noshnow-79413.firebaseapp.com",
  projectId: "noshnow-79413",
  storageBucket: "noshnow-79413.firebasestorage.app",
  messagingSenderId: "806326433513",
  appId: "1:806326433513:web:298aa4b1c4282b998f6278",
  measurementId: "G-KKZ9QX11SY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
