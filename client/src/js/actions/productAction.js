
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_REVIEW_SAVE_REQUEST,
    PRODUCT_REVIEW_SAVE_FAIL,
    PRODUCT_REVIEW_SAVE_SUCCESS,
  } from '../const/actionTypes';
  import axios from 'axios';

  const listProducts = (
    category = '',
    searchKeyword = '',
    sortOrder = ''
  ) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        '/api/products?category=' +
          category +
          '&searchKeyword=' +
          searchKeyword +
          '&sortOrder=' +
          sortOrder
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

 /* const listProducts = () => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const res = await axios.get(
        '/api/products/all'
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload:res.data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };*/


 const saveProduct =  (product) => async (dispatch, /*getState*/) => {
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
     /* const {
       userSigninReducer: { userInfo },
      } = getState();*/
      if (!product._id) {
        const res = await axios.post('/api/products/add', product, {/*headers: {
          Authorization: 'Bearer ' + userInfo.token,
        }, */
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: res.data });
      } else {
        const res = await axios.put(
          '/api/products/' + product._id,
          product,
          {/*headers: {
          Authorization: 'Bearer ' + userInfo.token,
        }, */
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: res.data });
      }
    } catch (error) {
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
  };
  const detailsProduct = (productId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
      const res = await axios.get('/api/products/' + productId);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
  };
  
  const deleteProdcut = (productId) => async (dispatch,/* getState*/) => {
    try {
     /* const {
        userSigninReducer: { userInfo },
      } = getState();*/
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
      const res = await axios.delete('/api/products' + productId, {
        /*headers: {
          Authorization: 'Bearer ' + userInfo.token,
        }, */  headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: res.data, success: true });
    } catch (error) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
    }
  };
  const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try {
      /*const {
        userSignin: {
          userInfo: { token },
        },
      } = getState();*/
      dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
         /* headers: {
            Authorization: 'Bearer ' + token,
          },*/
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
      // report error
      dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
    }
  };
  export {
    listProducts,
    detailsProduct,
    saveProduct,
    deleteProdcut,
    saveProductReview
  };