import { combineReducers } from "redux";
import { userReducer } from "./user";
import { bookReducer } from "./book";
import { toggleReducer } from "./toggle";

const reducers = combineReducers({
  bookReducer,
  userReducer,
  toggleReducer,
});

export default reducers;
