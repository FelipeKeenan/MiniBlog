
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCUMOGtsWHzkAQ_1IhQ3TTxfrXKaRDY-O8",
    authDomain: "miniblog-a1dd9.firebaseapp.com",
    projectId: "miniblog-a1dd9",
    storageBucket: "miniblog-a1dd9.appspot.com",
    messagingSenderId: "847552022066",
    appId: "1:847552022066:web:78aacc35572394ed271e2b"
};

const app = initializeApp(firebaseConfig);

//Criando o db (BANCO DE DADOS)
const db = getFirestore(app)

export { db }