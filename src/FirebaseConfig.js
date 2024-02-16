
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBroV1yA_XAu_JOFw6iEwvLnS1On3JSbc",
  authDomain: "loginsignupfinal-e176e.firebaseapp.com",
  projectId: "loginsignupfinal-e176e",
  storageBucket: "loginsignupfinal-e176e.appspot.com",
  messagingSenderId: "302482913805",
  appId: "1:302482913805:web:1eb95680a4db364bde3344"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const storage = getStorage(app);

export { auth, database, storage };
