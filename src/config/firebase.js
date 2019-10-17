import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDVog3biXUkVZLSysVGRoe8WQGD4oBtW_w",
    authDomain: "super-list-e658e.firebaseapp.com",
    databaseURL: "https://super-list-e658e.firebaseio.com",
    projectId: "super-list-e658e",
    storageBucket: "super-list-e658e.appspot.com",
    messagingSenderId: "530643065676",
    appId: "1:530643065676:web:1d97a622aeef26dc204de9",
    measurementId: "G-7VYHL64PM9"
  };

firebase.initializeApp(config);


export default firebase;
export const analytics = firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const performance = firebase.performance();