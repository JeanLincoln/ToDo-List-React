import { initializeApp } from "firebase/app";
import {getFirestore ,collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCojMWkNMIltN59Pp_FCYQynxBZuJcBT7U",
  authDomain: "todo-app-a6b9e.firebaseapp.com",
  projectId: "todo-app-a6b9e",
  storageBucket: "todo-app-a6b9e.appspot.com",
  messagingSenderId: "382875941888",
  appId: "1:382875941888:web:abb49db57937d7acc2ace5",
  measurementId: "G-PEH6EMLN2R"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const todosCollection = collection(db, 'todos')

