import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDJo8-qoc6Zi37Nz_Jof8hSR40JRPXfpwQ",
  authDomain: "porte-eba32.firebaseapp.com",
  databaseURL:
    "https://porte-eba32-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "porte-eba32",
  storageBucket: "porte-eba32.firebasestorage.app",
  messagingSenderId: "59456550097",
  appId: "1:59456550097:web:7a8c3c65c1394bffe381f0",
  measurementId: "G-S92MV5YM8P",
};

const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6LejcDMrAAAAAHO62ijGRjr4V8LiB0l1Y8V5g4Op"
  ),
  isTokenAutoRefreshEnabled: true,
});

getAnalytics(app);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const notesRef = ref(database, "notes/");
