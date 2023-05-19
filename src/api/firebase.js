import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKETt,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const db = getFirestore(app);

//join with Eamil & password
export const joinWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch(console.error);
};

//Login with social
export const loginWithSocial = async (social) => {
  let provider;
  if (social === 'google') {
    provider = new GoogleAuthProvider();
  } else if (social === 'github') {
    provider = new GithubAuthProvider();
  }

  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.log(error);
  }
};

//Logout
export const logout = async () => {
  signOut(auth).catch(console.error);
};

//로그인 유지
export const stateAuth = (setUser) => {
  return auth.onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    } else {
      console.log('no data');
    }
  });
};

