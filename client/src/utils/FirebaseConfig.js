import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4WE_Kp0vOcQRLg0nA-43hDTH0Tm5RjkY",
  authDomain: "whatsapp-e22db.firebaseapp.com",
  projectId: "whatsapp-e22db",
  storageBucket: "whatsapp-e22db.appspot.com",
  messagingSenderId: "711270608070",
  appId: "1:711270608070:web:51752383304de0d3dd3bc7",
  measurementId: "G-MW13SCXVZP",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
