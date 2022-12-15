import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBMsw2SldCHFoLbLwmVVZ0sjMz6pOWAZEg",
  authDomain: "chattyapp-bde91.firebaseapp.com",
  projectId: "chattyapp-bde91",
  storageBucket: "chattyapp-bde91.appspot.com",
  messagingSenderId: "794398833404",
  appId: "1:794398833404:web:db1096ac18a5f39467f579",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
