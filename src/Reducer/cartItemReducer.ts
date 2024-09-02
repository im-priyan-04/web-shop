import { SET_CART_ITEMS } from "../Actions/type";

const initialState = {
    cartItems: null,
};

export default (state: any, action: any) => {
    if (!state) {
        state = initialState;
    }

    switch (action.type) {
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload,
            };
        default:
            return state;
    }
}