// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getDatabase } from "firebase/database";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUwVOyJCjexDtBhIfcd27nF3F4hkgXuh4",
  authDomain: "todo-app-40a75.firebaseapp.com",
  databaseURL: "https://todo-app-40a75-default-rtdb.firebaseio.com",
  projectId: "todo-app-40a75",
  storageBucket: "todo-app-40a75.appspot.com",
  messagingSenderId: "235325654480",
  appId: "1:235325654480:web:b81b87363e6c7091bc25d5",
  measurementId: "G-YJH1BH5M1J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();


// firestore stuff

export async function saveTodo(value: string) {
    await setDoc(doc(db, "daily", "main"), { value });
}
export async function getTodo() {
  const docRef = doc(db, "daily", "main");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().value : '';
}

export async function getItems() {
  const items: any[] = []

  const q = query(collection(db, "db"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    items.push(doc.data())
  });

  return items
}

export async function newItem(item: any) {
  if (item.title == '') return;
  const newId = uuidv4();
  await setDoc(doc(db, "db", newId), {id: newId, ...item});
}

export async function editItem(id: string, item: any) {
  await setDoc(doc(db, "db", id), item);
}