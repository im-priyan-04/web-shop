import { GET_CATEGORY, } from "../Actions/type";
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

        default:
            return state;
    }
}