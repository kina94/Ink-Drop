import { combineReducers } from "redux";
import { userReducer } from "../user";
import { bookReducer } from "../book";
import { toggleStore } from "./toggleStore";

const reducers = combineReducers({
  bookReducer,
  toggleStore,
  userReducer,
});

export default reducers;
