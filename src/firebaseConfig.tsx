// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCQgwPNEZG_0VWTbKUSjcTRm9xES-H14AY",
    authDomain: "klikacz-77b0c.firebaseapp.com",
    databaseURL: "https://klikacz-77b0c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "klikacz-77b0c",
    storageBucket: "klikacz-77b0c.appspot.com",
    messagingSenderId: "947584236158",
    appId: "1:947584236158:web:649e330f4717807db6f62f",
    measurementId: "G-4L40TH6QTZ"
};
  

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Realtime Database
export const database = getDatabase(app);
