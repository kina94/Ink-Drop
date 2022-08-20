import { combineReducers } from "redux";
import { userReducer } from "./user";
import { bookReducer } from "./book";

const reducers = combineReducers({
  bookReducer,
  userReducer,
});

export default reducers;
