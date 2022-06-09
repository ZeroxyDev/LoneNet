// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfasXLGrgfSbXS5cyQMUP2Z85hwNc0VGo",
  authDomain: "lonenet-a11c5.firebaseapp.com",
  projectId: "lonenet-a11c5",
  storageBucket: "lonenet-a11c5.appspot.com",
  messagingSenderId: "444275648643",
  appId: "1:444275648643:web:b16f628a5b4231d07bd3b6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

//SignUp

export function signup(email, password){

  return createUserWithEmailAndPassword(auth, email, password);

}

//login

export function login(email, password){

  return signInWithEmailAndPassword(auth, email, password);

}

//logout

export function logout(){
  return signOut(auth);
}

//Custom Hook

export function useAuth(){
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}


// Storage

export async function upload(file, currentUser, setLoading){

  const fileRef = ref(storage, currentUser.uid + "png");

 setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
 setLoading(false);
 alert("uploaded")

}

export default app;
export { db, storage };
