import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAl5JtNEsp66qhkiOIUAhuttl3tAc7hRsE",
  authDomain: "biolab-bd5dc.firebaseapp.com",
  projectId: "biolab-bd5dc",
  storageBucket: "biolab-bd5dc.appspot.com",
  messagingSenderId: "413746217969",
  appId: "1:413746217969:web:6790ff544e05304cdeba50",
  storageBucket: "biolab-bd5dc.appspot.com"

};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const db = getFirestore(app);

export { db, storage };