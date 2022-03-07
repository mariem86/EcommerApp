import axios from "axios";
import {
      GET_RATE,
     
      
  } from "../const/actionTypes";

  //Add rate
  
export const addrate = (id,newrate) => async (dispatch) => {
    //dispatch(setLoading());
    try {
      const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const res = await axios.post(`/api/rate/${id}/addrate`, newrate,options);
     dispatch(getrate());
    } catch (error) {
      console.log(error)
    

    }
  };


  //get rate
  export const getrate= () => async (dispatch) => {
   // dispatch(setLoading());
    try {
      const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
  
      const res = await axios.get("/api/rate/allrate",options);
     dispatch({
        type: GET_RATE,
        payload: res.data, 
      });
    } catch (error) {
    console.log(error)
    }
  };

  
 
 
     /* const setLoading = () => (dispatch) => {
        dispatch({
          type: SET_LOADING,
        });
      };*/

