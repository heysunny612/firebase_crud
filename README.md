# 리액트 프로젝트 파이어베이스를 이용한 스위터 

<p align="center">
    <img src="https://github.com/heysunny612/firebase_switter/assets/127499117/de4ca9ab-3fb7-4e82-b61e-f64974a3b6a2" alt="ggg">
</p>

<br/>

## 파이어베이스 Auth를 사용한 계정만들기, 소셜로그인 구현 


 <br/>

```js
//api > firebase.js

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

```

<br/>
<br/>

<p align="center">
    <img src="https://github.com/heysunny612/firebase_switter/assets/127499117/3aad5b1e-f566-401a-ad7d-eca8d231e40c" alt="1">
</p>

<br/>

## 파이어베이스 실시간 데이터를 사용한  CRUD

```js
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

```

<br/>

## 파이어베이스 스토리지를 사용한 이미지 업로드

<p align="center">
    <img src="https://github.com/heysunny612/firebase_switter/assets/127499117/f3ea12f9-7717-4186-b0f7-866e3047adb8" alt="2">
</p>

<br/>

| 제목 | 설명 |
| --- | --- |
| 구현 사항 |-파이어베이스 어센티케이션을 이용한 구글, 깃허브 로그인 및 이메일로 계정생성 구현 <br/> -파이어베이스 실시간 데이터베이스를 이용한 CRUD 구현 <br/> -파이어베이스 스토리지를 사용한 이미지 업로드 구현 <br/> -리액트 쿼리를 이용한 데이터 상태관리 <br/> -리액트 Hook Form을 사용한 계정만들기, 로그인 구현  |
| 라이브러리 |firebase, react-query, react-router-dom, react-hook-form, sass, timeago.js|
| css 및 반응형  | SASS+Post CSS사용 , 반응형 구현  |
| 배포 주소  | Netlify [[https://sunny-trello.netlify.app/ ](https://zero-shop.netlify.app/)](https://suuny-switter.netlify.app/)|
| 소스 코드  | Github https://github.com/heysunny612/firebase_switter|


