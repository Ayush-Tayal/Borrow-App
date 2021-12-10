import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCzUqJjRTxgoJblrJVLkIQk-L8_3CTwuXk",
  authDomain: "borrow-app-94790.firebaseapp.com",
  projectId: "borrow-app-94790",
  storageBucket: "borrow-app-94790.appspot.com",
  messagingSenderId: "332649218689",
  appId: "1:332649218689:web:78c322b1b416751a388380"
};

firebase.initializeApp(firebaseConfig);
export const database = firebase.database();


export default firebase;