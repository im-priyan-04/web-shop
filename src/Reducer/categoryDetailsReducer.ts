import { CLEAR_PRODUCTS_BY_CATEGORY, GET_CATEGORY, GET_PRODUCT_BY_CATEGORY } from "../Actions/type";
const initialState = {
    categoryDetails: null,
};

export default (state: any, action: any) => {
    if (!state) {
        state = initialState;
    }
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                categoryDetails: action.payload,
            };
        case GET_PRODUCT_BY_CATEGORY:
            return {
                ...state,
                productByCategory: action.payload,
            };
            case CLEAR_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                productByCategory: null,
            };
        default:
            return state;
    }
}