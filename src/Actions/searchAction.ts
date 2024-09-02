import { callApi } from ".";
import { 
  GET_CATEGORY,
  GET_SEARCH_RESULTS, 
  GET_SUGGESTION_LIST,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_BY_CATEGORY,
  SET_CART_ITEMS,
  ORDER_CREATED,
  CLEAR_PRODUCTS_BY_CATEGORY,
  CLEAR_SEARCH_RESULTS
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

  export const getProductDetails = (id: string | null) => async (dispatch: any) => {
    let url = `https://dummyjson.com/products/${id}`;
    const data = await callApi(url, 'GET');
    dispatch({
      type: GET_PRODUCT_DETAILS,
      payload: data
    });
  }

  export const getProductsByCategory = (category: string | null) => async (dispatch: any) => {
    let url = `https://dummyjson.com/products/category/${category}`;
    const data = await callApi(url, 'GET');
    dispatch({
      type: GET_PRODUCT_BY_CATEGORY,
      payload: data
    });
}

export const setCartItems = (cartItems: any) => async (dispatch: any) => {
    return dispatch({
      type: SET_CART_ITEMS,
      payload: cartItems
    });
  }

  export const orderCreatedDetails = (orderDetails: any) => async (dispatch: any) => {
    return dispatch({
      type: ORDER_CREATED,
      payload: orderDetails
    });
  }

  export const resetSearchResults = () => async (dispatch: any) => {
    return dispatch({
      type: CLEAR_SEARCH_RESULTS,
    });
  }
  
  export const resetProductsByCategory = () => async (dispatch: any) => {
   return dispatch({
      type: CLEAR_PRODUCTS_BY_CATEGORY,
    });
  }

  export const resetCart = () => async (dispatch: any) => {
    dispatch(resetProductsByCategory());
    dispatch(resetSearchResults());
    dispatch(setCartItems(null));
  }