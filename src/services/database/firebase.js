import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjkGRjfm_kZq-UFcIlw2SGlm3UCd4IRcY",
  authDomain: "ugee-1c07c.firebaseapp.com",
  databaseURL: "https://ugee-1c07c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ugee-1c07c",
  storageBucket: "ugee-1c07c.appspot.com",
  messagingSenderId: "981466710956",
  appId: "1:981466710956:web:f6050a50d06eb712297009"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
