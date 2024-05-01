import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig2 = {
  apiKey: "AIzaSyDBrFKcfDhlwlELkUQ49esegMSAMOMteUc",
  authDomain: "cloud-point2.firebaseapp.com",
  projectId: "cloud-point2",
  storageBucket: "cloud-point2.appspot.com",
  messagingSenderId: "801146514820",
  appId: "1:801146514820:web:be99cbad70f841eab5c1d1",
  measurementId: "G-NQ9SQYKD93"
};

const application = initializeApp(firebaseConfig2,"CloudPoint");
export const storage = getStorage(application);
export default application;