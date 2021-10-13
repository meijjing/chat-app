// import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

// const firebase = require("firebase/app")

const firebaseConfig = {
  apiKey: "AIzaSyDseHjo7ONzvkloXhS79E0kam2UG_tZ1-U",
  authDomain: "chat-app-161f2.firebaseapp.com",
  projectId: "chat-app-161f2",
  // storageBucket: "chat-app-161f2.appspot.com",
  storageBucket: "https://chat-app-161f2-default-rtdb.asia-southeast1.firebasedatabase.app",
  messagingSenderId: "920879434893",
  appId: "1:920879434893:web:ace70d2fb8f04062aba6c4",
  databaseURL: "https://chat-app-161f2-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb }
