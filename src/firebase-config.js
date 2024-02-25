import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD5e1DxyBSsZcmFQbH3imMUU4iYZq3cW9s",
    authDomain: "minutes-ec85a.firebaseapp.com",
    projectId: "minutes-ec85a",
    storageBucket: "minutes-ec85a.appspot.com",
    messagingSenderId: "1035494020870",
    appId: "1:1035494020870:web:006878f058516924e6f087",
    measurementId: "G-6B575WD4LZ"
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const db = firebase.firestore();

// // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };