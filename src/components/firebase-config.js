import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5OewjmOthejN36A3uIkW89DpCihLxFos",
  authDomain: "auth-todo-app-1291e.firebaseapp.com",
  projectId: "auth-todo-app-1291e",
  storageBucket: "auth-todo-app-1291e.appspot.com",
  messagingSenderId: "525916828513",
  appId: "1:525916828513:web:9726680a916758b8944b20",
  measurementId: "G-D33CG4CH55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)
export default app;