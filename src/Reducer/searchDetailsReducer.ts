import { GET_SEARCH_RESULTS, GET_SUGGESTION_LIST } from "../Actions/type";

const initialState = {
    searchResult: null,
};

export default (state: any, action: any) => {
    if (!state) {
        state = initialState;
    }
    switch (action.type) {
        case GET_SEARCH_RESULTS:
            return {
                ...state,
                searchResult: action.payload,
            };
        case GET_SUGGESTION_LIST: {
            return {
                ...state,
                suggestionList: action.payload,
            };
        };

        default:
            return state;
    }
};
