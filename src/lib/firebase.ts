import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIhSjD11rjU_NbqpNTC6V5eiYKb--eIuk",
  authDomain: "palotem-9d695.firebaseapp.com",
  projectId: "palotem-9d695",
  storageBucket: "palotem-9d695.firebasestorage.app",
  messagingSenderId: "383902842431",
  appId: "1:383902842431:web:9108685a032c395d3bc28a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
