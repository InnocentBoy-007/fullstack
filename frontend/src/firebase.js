// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmieM7pTbV4agpe_QyVoy-6UuV5IOVkek",
    authDomain: "instagram-ib.firebaseapp.com",
    projectId: "instagram-ib",
    storageBucket: "instagram-ib.appspot.com",
    messagingSenderId: "458261623475",
    appId: "1:458261623475:web:debebfac685160bd5d36c6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
