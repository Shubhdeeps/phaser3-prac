import firebase from "firebase";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAryZ6V3zVK9AgCC6LB0seyvvUNlJ7BRDQ",
  authDomain: "mouse-runner.firebaseapp.com",
  projectId: "mouse-runner",
  storageBucket: "mouse-runner.appspot.com",
  messagingSenderId: "921002608728",
  appId: "1:921002608728:web:db798381b3ce10581b222d",
  databaseURL:
    "https://mouse-runner-default-rtdb.europe-west1.firebasedatabase.app",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();
export const database = firebaseApp.database();
