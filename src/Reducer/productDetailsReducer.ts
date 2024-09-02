import { GET_ALL_PRODUCTS, } from "../Actions/type";

const initialState = {
    allProductDetails: null,
};

export default (state: any, action: any) => {
    if (!state) {
        state = initialState;
    }
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProductDetails: action.payload,
            };
        default:
            return state;
    }
}