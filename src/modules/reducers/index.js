import { combineReducers } from "redux";
import {bookStore} from "./bookStore";
import { toggleStore } from "./toggleStore";

const reducers = combineReducers({
    bookStore,
    toggleStore
});

export default reducers