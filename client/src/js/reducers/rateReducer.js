import {

    GET_RATE,
   
} from "../const/actionTypes";
const initState = {
 rates:[],

 isLoading: false,
};
export default function (state = initState, { type, payload }) {
    switch (type) {
     /* case SET_LOADING:
        return { ...state, isLoading: true };*/
        case GET_RATE:
      return {
        ...state,
        rates: payload, isLoading: false  };
              default:
                return state;
            }
          }
         