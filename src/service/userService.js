import { firebaseDatabase } from "./firebase";

//유저 정보가 변경되면 저장합니다.
export const saveUserProfile = (userId, userInfo) => {
  firebaseDatabase.ref(`${userId}/info`).set(userInfo);
};

//유저 정보를 로드합니다.
export const setUserProfile = (userId, userInfo, getUserInfo) => {
  const ref = firebaseDatabase.ref(`${userId}`);
  ref.on("value", (snapshot) => {
    if (snapshot.exists()) {
      return;
    } else {
      userInfo && getUserInfo(userInfo);
    }
  });
  return () => ref.off();
};

// 첫 접속이면 유저 정보 저장
export const loadUserProfile = (userId, setUserInfo) => {
  firebaseDatabase
    .ref(`${userId}/info`)
    .once("value")
    .then((snapshot) => {
      const user = snapshot.val() && snapshot.val();
      user && setUserInfo(user);
    });
};
