import { combineReducers } from "redux";
import searchDetailsReducer from "./searchDetailsReducer";


export default combineReducers({
    searchDetailsList: searchDetailsReducer,
});