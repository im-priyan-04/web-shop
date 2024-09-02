import { combineReducers } from "redux";
import searchDetailsReducer from "./searchDetailsReducer";
import categoryDetailsReducer from "./categoryDetailsReducer";
import productDetailsReducer from "./productDetailsReducer";
import cartItemReducer from "./cartItemReducer";
import orderDetailsReducer from "./orderDetailsReducer";


export default combineReducers({
    searchDetailsList: searchDetailsReducer,
    categoryDetailsList: categoryDetailsReducer,
    productDetailsList: productDetailsReducer,
    cartItemsList: cartItemReducer,
    orderDetailsList: orderDetailsReducer
});