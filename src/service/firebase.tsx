// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCeaZooQunkSwnQbhErTEqgyoog_UQ7kno',
  authDomain: 'perfitt-footprint.firebaseapp.com',
  projectId: 'perfitt-footprint',
  storageBucket: 'perfitt-footprint.appspot.com',
  messagingSenderId: '389195796117',
  appId: '1:389195796117:web:3e48af4012e7c65d61959c',
  measurementId: 'G-JJRTBFZ6BL',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // Cloud Firestore
