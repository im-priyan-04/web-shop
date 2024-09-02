import { combineReducers } from "redux";
import searchDetailsReducer from "./searchDetailsReducer";
import categoryDetailsReducer from "./categoryDetailsReducer";


export default combineReducers({
    searchDetailsList: searchDetailsReducer,
    categoryDetailsList: categoryDetailsReducer,
});