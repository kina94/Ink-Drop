import { combineReducers } from "redux";
import { userReducer } from "../user";
import {bookStore} from "./bookStore";
import { toggleStore } from "./toggleStore";

const reducers = combineReducers({
    bookStore,
    toggleStore,
    userReducer,
});

export default reducers