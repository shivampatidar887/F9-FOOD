import { ALL_REVIEW_REQUEST,ALL_REVIEW_SUCCESS,ALL_REVIEW_FAIL,NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_RESET, NEW_REVIEW_FAIL, CLEAR_ERRORS } from "../constants/reviewConstants";

export const newreviewReducer = (state={review:{}},action)=>{
    switch(action.type){
     case NEW_REVIEW_REQUEST:
         return{
             ...state,
             loading:true,
         }
     case NEW_REVIEW_SUCCESS:
         return{
             loading:false,
             success:action.payload.success,
             review:action.payload.review,
         }
     case NEW_REVIEW_FAIL:
         return{
             ...state,
             loading:false,
             error:action.payload,
         }
     case NEW_REVIEW_RESET:
         return{
             ...state,
             success:false,
         }
     case CLEAR_ERRORS:
         return {
             ...state,
             error:null,
         }    
     default: return state;
    }
 };
export const allreviewReducer = (state={reviwes:[]},action)=>{
    switch(action.type){
     case ALL_REVIEW_REQUEST:
         return{
             loading:true,
             reviews:[]
         }
     case ALL_REVIEW_SUCCESS:
         return{
             loading:false,
             reviews:action.payload.reviews,
         }
     case ALL_REVIEW_FAIL:
         return{
             loading:false,
             error:action.payload,
         }
     case CLEAR_ERRORS:
         return {
             ...state,
             error:null,
         }    
     default: return state;
    }
 };