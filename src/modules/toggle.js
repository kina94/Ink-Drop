/* ------------ 액션 타입 --------------- */
const MODAL_TOGGLE = "toggle/MODAL_TOGGLE";
const EDIT_TOGGLE = "toggle/EDIT_TOGGLE";

/* ------------ 액션 생성 함수 ---------------*/
export const setModalToggle = (bool) => ({ type: MODAL_TOGGLE, bool });
export const setEditToggle = (bool) => ({ type: EDIT_TOGGLE, bool });

/* ------------ 초기 상태 ---------------*/
const initState = {
  modalToggle: false,
  editToggle: false,
};

/* ------------ 리듀서 ---------------*/
export const toggleReducer = (state = initState, action) => {
  switch (action.type) {
    case MODAL_TOGGLE:
      return { ...state, modalToggle: action.bool };
    case EDIT_TOGGLE:
      return { ...state, editToggle: action.bool };
    default:
      return state;
  }
};
