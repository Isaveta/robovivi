import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCDwMrOMlFNO_mnrRwSo9uskZvgBW_1Ius",
    authDomain: "robovivi-diploma.firebaseapp.com",
    projectId: "robovivi-diploma",
    storageBucket: "robovivi-diploma.firebasestorage.app",
    messagingSenderId: "947955399555",
    appId: "1:947955399555:web:b376058bfc7697a07fd4b6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);