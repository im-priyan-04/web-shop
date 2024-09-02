import { callApi } from ".";
import { 
  GET_CATEGORY,
  GET_SEARCH_RESULTS, 
  GET_SUGGESTION_LIST,
  GET_ALL_PRODUCTS
} from "./type";

export const getSearchResults = (value: string | null) => async (dispatch: any) => {
  let url = `https://dummyjson.com/products/search?q=${value}`;
  const data = await callApi(url, 'GET');
  dispatch({
    type: GET_SEARCH_RESULTS,
    payload: data
  });
};
export const searchSuggetion = (value: string | null) => async (dispatch: any) => {
  let url = `https://dummyjson.com/products/search?q=${value}`;
  const data = await callApi(url, 'GET');
  dispatch({
    type: GET_SUGGESTION_LIST,
    payload: data
  });
};

export const getCategory = () => async (dispatch: any) => {
    let url = `https://dummyjson.com/products/categories`;
    const data = await callApi(url, 'GET');
    dispatch({
      type: GET_CATEGORY,
      payload: data
    });
  }

  export const getAllProducts = () => async (dispatch: any) => {
    let url = `https://dummyjson.com/products`;
    const data = await callApi(url, 'GET');
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: data
    });
  }