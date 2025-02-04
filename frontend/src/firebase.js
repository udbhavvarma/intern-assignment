import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADT3IJcTGMdXqUodbav7AJ5Cc07HJW9ig",
  authDomain: "intern-project-f96cb.firebaseapp.com",
  projectId: "intern-project-f96cb",
  storageBucket: "intern-project-f96cb.firebasestorage.app",
  messagingSenderId: "493240612191",
  appId: "1:493240612191:web:a229733dfb2dd671feb2ea",
  measurementId: "G-VP9QPK027R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };