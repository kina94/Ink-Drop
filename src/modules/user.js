/* ------------ 액션 타입 --------------- */
const SET = "user/SET";

/* ------------ 액션 생성 함수 ---------------*/
export const setUser = (user) => ({ type: SET, user });

/* ------------ 초기 상태 ---------------*/
const initState = {
  user: {
    uid: "", // 유저 토큰
    displayName: "", // 유저 이름
    email: "", // 유저 이메일
  },
};

/* ------------ 리듀서 ---------------*/
export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET:
      return { ...state, user: action.user };

    default:
      return state;
  }
};
