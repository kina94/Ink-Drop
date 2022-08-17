import { firebaseDatabase } from "./firebase";

//기 로그인 여부 판별
export const isNewUser = (userId) => {
  const ref = firebaseDatabase.ref(`${userId}`);
  ref.once("value", (snapshot) => {
    if(snapshot.exists){
      return true
    }
  });
};

// 첫 접속이면 유저 정보 저장
export const setNewUserToDB = (userId, userInfo) => {
  firebaseDatabase.ref(`${userId}/info`).set(userInfo);
};