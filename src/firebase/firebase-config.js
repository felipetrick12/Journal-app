import firebase from 'firebase/app';
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth';

var firebaseConfig = {
    apiKey: "AIzaSyDOCavrJLQ3KC0X6Z7MrlJ3LJgj7zVe9Ug",
    authDomain: "journal-ap-1.firebaseapp.com",
    projectId: "journal-ap-1",
    storageBucket: "journal-ap-1.appspot.com",
    messagingSenderId: "1064417502232",
    appId: "1:1064417502232:web:d470cd4b6b0ba97cf0cf6d",
    measurementId: "G-S53XQXM7VG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


  export {
        db,
        googleAuthProvider,
        firebase
  }