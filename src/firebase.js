
import firebase from 'firebase/app';
import "firebase/database"



  const firebaseConfig = {
    apiKey: "AIzaSyAtbnpJst7LDk5L5ShPxmUeP2YKR6tYVr8",
    authDomain: "crud-prueba-42d4e.firebaseapp.com",
    databaseURL: "https://crud-prueba-42d4e-default-rtdb.firebaseio.com",
    projectId: "crud-prueba-42d4e",
    storageBucket: "crud-prueba-42d4e.appspot.com",
    messagingSenderId: "1021298860334",
    appId: "1:1021298860334:web:9761fbe2bd48fb2f451abf"
  };
    // Initialize Firebase
 const fireDb = firebase.initializeApp(firebaseConfig);


 export default fireDb.database().ref();