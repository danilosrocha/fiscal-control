import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA3tQLyr1m7cdJcit2IEPbO_IgAvk6RYjk",
    authDomain: "fiscalcontrol-bdd66.firebaseapp.com",
    projectId: "fiscalcontrol-bdd66",
    storageBucket: "fiscalcontrol-bdd66.appspot.com",
    messagingSenderId: "894989047058",
    appId: "1:894989047058:web:25f5738f4f472bcef74fcb"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }
