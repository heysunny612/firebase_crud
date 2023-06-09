import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  updateProfile,

} from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore,  doc,  deleteDoc ,  updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadString ,deleteObject} from "firebase/storage";

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
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
;

// 중복코드 함수처리
const handleAuth = async (
  authFn,
  { email, password, navigate, setLoginError }
) => {
  authFn(auth, email, password)
    .then(() => navigate('/'))
    .catch((error) => {
      console.log(error.code);
      setLoginError(error.message);
    });
};

// 이메일로 계정만들기
export const createUser = async (params) => {
  await handleAuth(createUserWithEmailAndPassword, params);
};

//기존 사용자 로그인
export const login = async (params) => {
  await handleAuth(signInWithEmailAndPassword, params);
};

//소셜 로그인
export const loginWithSocial = async (social) => {
  let provider = null;
  if (social === 'google') {
    provider = new GoogleAuthProvider();
  } else if (social === 'github') {
    provider = new GithubAuthProvider();
  } else {
    throw new Error('Unsupported social provider');  } 

  provider.setCustomParameters({
    prompt: 'select_account',
  });

  return signInWithPopup(auth, provider).catch((error) => {
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
    user ? setUser(user) : setUser(null);
    setIsGettingUser(true);
  });
};

//IMAGE UPLOAD TO STORAGE
const createFileURL = async (uid, url) => {
  try {
    const fileRef = ref(storage, `${uid}/${Date.now()}`);
    const response = await uploadString(fileRef, url, "data_url");
    return await getDownloadURL(response.ref)
  }catch (error) {
    console.log(error);
    throw new Error('Failed to upload file to storage');
  }
}

//CREATE
export const createSweet = async (data) => {
  const sweetData = { ...data };
  if (data.imgURL) {
    sweetData.imgURL = await createFileURL(data.user.id, data.imgURL);
  }
  return await addDoc(collection(db, 'sweet'), sweetData);
};

//READ
export const readSweet = async () => {
  const querySnapshot = await getDocs(collection(db, 'sweet'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

//UPDATE
export const updateSweet = async (sweet, changeData, type) => {
  if (type === 'text') {
    await updateDoc(doc(db, "sweet", sweet.id), { text:changeData });
  } else if (type === 'img') {
    return deleteFile(changeData).then(()=>updateDoc(doc(db, "sweet", sweet.id), { imgURL:null }))
  }
}

//DELETE
export const deleteSweet = async (id) => {
  return await deleteDoc(doc(db, "sweet", id))
}

// DELETE the file
export const deleteFile = async (imgURL) => {
  const urlRef = ref(storage,imgURL );
  return await deleteObject(urlRef)
}

export const updateName = async (user,newName) => {
  await updateProfile(user,{displayName:newName})
}
