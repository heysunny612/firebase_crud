import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKETt,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 이메일로 계정만들기
export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password) //
    .catch((error) => {
      console.log(error);
    });
};

//기존 사용자 로그인
export const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password) //
    .catch((error) => {
      console.log(error);
    });
};

//로그아웃
export const logout = () => {
  return signOut(auth);
};

//로그인한 상태가 변경될때 마다 가져오기
export const getAuthState = (setUser, setIsGettingUser) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      setIsGettingUser(true);
    } else {
      setUser(null);
      setIsGettingUser(false);
    }
  });
};
