// firebaseStorage.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import storage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRqiGJSpzMA6-PS48A6SlfQ8Vvvh28Iho",
  authDomain: "yourfood-fc80b.firebaseapp.com",
  projectId: "yourfood-fc80b",
  storageBucket: "yourfood-fc80b.appspot.com",
  messagingSenderId: "207587116757",
  appId: "1:207587116757:web:48bccade66abccc8dd045c",
  measurementId: "G-24NZHXXWKD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and export it
const storage = getStorage(app);

export { storage };
