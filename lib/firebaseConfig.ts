import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD24XzJcU89Z2QvjMYXJFGIe8iepzkDHAQ",
    authDomain: "favicon-gen.firebaseapp.com",
    projectId: "favicon-gen",
    storageBucket: "favicon-gen.firebasestorage.app",
    messagingSenderId: "254265083622",
    appId: "1:254265083622:web:0907a3c2c6e006a8cddd27",
    measurementId: "G-TV4BLSBNEP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
