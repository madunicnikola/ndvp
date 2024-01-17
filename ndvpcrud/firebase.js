import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "ndvpapp.firebaseapp.com",
  projectId: "ndvpapp",
  storageBucket: "ndvpapp.appspot.com",
  messagingSenderId: "863326471915",
  appId: "1:863326471915:web:266abc5baf77c68a54e0ae",
};

export const app = initializeApp(firebaseConfig);
