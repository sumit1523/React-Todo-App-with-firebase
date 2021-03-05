import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDt2UKqIUMUukF1Vg0YmJ6-65GgTQIT3i8",
    authDomain: "todolist-c5551.firebaseapp.com",
    projectId: "todolist-c5551",
    storageBucket: "todolist-c5551.appspot.com",
    messagingSenderId: "160468697135",
    appId: "1:160468697135:web:402f2f76864502a18006da",
    measurementId: "G-RDFM4R4KEQ"
});

const db = firebaseConfig.firestore();

export default db;