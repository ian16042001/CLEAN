import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB21tvpZpJwvqrCYnyPID3xhkYaXcjM6bM",
  authDomain: "clean-20adc.firebaseapp.com",
  projectId: "clean-20adc",
  storageBucket: "clean-20adc.appspot.com",
  messagingSenderId: "624458553150",
  appId: "1:624458553150:web:bd6c25b3ca457c1458fe6f"
};

// Initialize Firebase
// let app;
//  if (firebase.app.length === 0){
    app = firebase.initializeApp(firebaseConfig);
//  } //else {
//     app = firebase.app()
// }

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const db = getFirestore(app);

export { firebase }