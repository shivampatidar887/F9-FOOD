import axios from "axios";
import{
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/productConstants";
const apiUrl = 'http://localhost:5000/api/v1';
export const getProduct=(keyword="",price=[0,1000],category="")=>async(dispatch)=>{

try{
   dispatch({type:ALL_PRODUCT_REQUEST});
   let link=`${apiUrl}/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
   if(category){
    link=`${apiUrl}/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
   }
   
   const {data} = await axios.get(link);
   
   dispatch({type:ALL_PRODUCT_SUCCESS,
payload:data,})
}catch(error){
    dispatch({type:ALL_PRODUCT_FAIL,
        payload:error.response.data.message,});
}
};

//Create new product
export const createProduct=(productData)=>async(dispatch)=>{

try{
   dispatch({type:NEW_PRODUCT_REQUEST});
   const token = localStorage.getItem('token');
   const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, } };
   
   const {data} = await axios.post(`${apiUrl}/admin/product/new`,productData,config);
   
   dispatch({type:NEW_PRODUCT_SUCCESS,payload:data})
}catch(error){
    dispatch({type:NEW_PRODUCT_FAIL,
        payload:error.response.data.message,});
}
};
//Update product
export const updateProduct=(id,productData)=>async(dispatch)=>{
try{
   dispatch({type:UPDATE_PRODUCT_REQUEST});
   const token = localStorage.getItem('token');
   const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, } };
   
   const {data} = await axios.put(`${apiUrl}/admin/product/${id}`,productData,config);
   
   dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:data.success})
}catch(error){
    dispatch({type:UPDATE_PRODUCT_FAIL,
        payload:error.response.data.message});
}
};
//Delete new product
export const deleteProduct=(id)=>async(dispatch)=>{
try{
   dispatch({type:DELETE_PRODUCT_REQUEST});
   const token = localStorage.getItem('token');
   const config = { headers: {Authorization: `Bearer ${token}`} };
   
   const {data} = await axios.delete(`${apiUrl}/admin/product/${id}`,config);
   
   dispatch({type:DELETE_PRODUCT_SUCCESS,payload:data.success})
}catch(error){
    dispatch({type:DELETE_PRODUCT_FAIL,
        payload:error.response.data.message,});
}
};
// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const token = localStorage.getItem('token');
      const config = { headers: {Authorization: `Bearer ${token}`} };
      
      const {data} = await axios.get(`${apiUrl}/product/${id}`,config);
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
// CLearing errors
export const clearErrors = () => async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
    };