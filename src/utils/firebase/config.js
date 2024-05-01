import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACZnBxTIdDBJy5fzfuNh4zzv0DXM9boMY",
  authDomain: "insightful-4c9ce.firebaseapp.com",
  projectId: "insightful-4c9ce",
  storageBucket: "insightful-4c9ce.appspot.com",
  messagingSenderId: "882388573472",
  appId: "1:882388573472:web:5f4e1ebab3921da27d4b45",
  measurementId: "G-F1QP1QBJXG"
};

const app = initializeApp(firebaseConfig,"Insightful");
export const auth = getAuth(app);
export default app;