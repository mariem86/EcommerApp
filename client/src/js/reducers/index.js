import { combineReducers } from "redux";
import { userSigninReducer,userRegisterReducer} from "./authReducer"
import {productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer} from "./productReducer"
  import {cartReducer } from "./cartReducer"
  import{orderCreateReducer, orderDetailsReducer,
    orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer} from "./orderReducer"

    import rateReducer from "./rateReducer"
export default combineReducers({userSigninReducer,userRegisterReducer,productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
  cartReducer,orderCreateReducer, orderDetailsReducer,
  orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer,
  rateReducer
    
  })