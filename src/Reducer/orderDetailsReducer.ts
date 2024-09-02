import { ORDER_CREATED } from "../Actions/type";

const initialState = {
    orderDetails: null,
};

export default (state: any, action: any) => {
    if (!state) {
        state = initialState;
    }
    switch (action.type) {
        case ORDER_CREATED:
            return {
                ...state,
                orderDetails: action.payload,
            };
        default:
            return state;
    }
}