import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZVXpMFuZmRUfQ5IHXhQuNKF1j-5vzqjA",
    authDomain: "enviro-buddy.firebaseapp.com",
    projectId: "enviro-buddy",
    storageBucket: "enviro-buddy.appspot.com",
    messagingSenderId: "698277801775",
    appId: "1:698277801775:web:f38eb8e1501941e0847bda",
    measurementId: "G-R1CJS92EC4"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
