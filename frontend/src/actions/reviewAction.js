import { ALL_REVIEW_REQUEST,ALL_REVIEW_SUCCESS,ALL_REVIEW_FAIL,NEW_REVIEW_REQUEST,NEW_REVIEW_SUCCESS,NEW_REVIEW_RESET,NEW_REVIEW_FAIL,CLEAR_ERRORS } from "../constants/reviewConstants";
import axios from "axios";
const apiUrl = 'http://localhost:5000/api/v1';

//Create New Review or Update if allready
export const newReview=(reviewData)=>async(dispatch)=>{

try{
   dispatch({type:NEW_REVIEW_REQUEST});
   const token = localStorage.getItem('token');
const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, } };
   const {data} = await axios.post(`${apiUrl}/review/new`,reviewData,config);
   
   dispatch({type:NEW_REVIEW_SUCCESS,payload:data,})
}catch(error){
    dispatch({type:NEW_REVIEW_FAIL,
        payload:error.response.data.message,});
}
};

export const getAllreviews=()=>async(dispatch)=>{

   try{
      dispatch({type:ALL_REVIEW_REQUEST});
   
      const {data} = await axios.get(`${apiUrl}/reviews`);
      
      dispatch({type:ALL_REVIEW_SUCCESS,payload:data,})
   }catch(error){
       dispatch({type:ALL_REVIEW_FAIL,
           payload:error.response.data.message,});
   }
   };

// CLearing errors
export const clearErrors = () => async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
    };