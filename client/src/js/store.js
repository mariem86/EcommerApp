import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cookies from 'js-cookie'
import rootReducer from "./reducers";


//const userInfo =Cookies.get('userInfo')|| null;
const cartItems = Cookies.get('cartItems') || [];

const initialState = {cart:{cartItems,shipping: {}, payment: {}}  }
const middleware = [thunk];
const devtools =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

const store = createStore(
  rootReducer,initialState,
  compose(applyMiddleware(...middleware), devtools)
);

export default store;