import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'

const firebaseConfig = {
    apiKey: "AIzaSyDlL_J8wfCKgx9bTyiBcv2WSVtcbbjL_0I",
    authDomain: "olx-clone-d434d.firebaseapp.com",
    projectId: "olx-clone-d434d",
    storageBucket: "olx-clone-d434d.appspot.com",
    messagingSenderId: "28905723454",
    appId: "1:28905723454:web:4eeb3f10d8daafcb64e36f",
    measurementId: "G-NWMEKRS6TE"
  };

export default firebase.initializeApp(firebaseConfig)