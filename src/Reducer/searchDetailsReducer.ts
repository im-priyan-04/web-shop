import { CLEAR_SEARCH_RESULTS, GET_SEARCH_RESULTS, GET_SUGGESTION_LIST, SET_SEARCH_INPUT_VALUE } from "../Actions/type";

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
        case SET_SEARCH_INPUT_VALUE: {
            return {
                ...state,
                searchInputValue: action.payload,
            };
        };
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                searchResult: null,
            };

        default:
            return state;
    }
};
