// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const apiKeyApp = process.env["EXPO_PUBLIC_FIREBASE_API_KEY"];
const authDomain = process.env["EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"];
const projectId = process.env["EXPO_PUBLIC_FIREBASE_PROJECT_ID"];
const storageBucket = process.env["EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"];
const messagingSenderId = process.env["EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"];
const appId = process.env["EXPO_PUBLIC_FIREBASE_APP_ID"];
const measurementId = process.env["EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID"];
const firebaseConfig = {
  apiKey: apiKeyApp,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP)