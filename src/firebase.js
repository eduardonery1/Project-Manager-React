import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCc0uPibjbj8FdGq7EDn6yjTxEoeNCpTF8",
    authDomain: "productivity-f370f.firebaseapp.com",
    projectId: "productivity-f370f",
    storageBucket: "productivity-f370f.appspot.com",
    messagingSenderId: "17540415058",
    appId: "1:17540415058:web:d5a0bd8ab9554081bf298b"
};


if (process.env.NODE_ENV === 'development') {
    firebaseConfig.host = 'localhost';
    firebaseConfig.port = 8080; // Port of your Firestore emulator
}


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };







