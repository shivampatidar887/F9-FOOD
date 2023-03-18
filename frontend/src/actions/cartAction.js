import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO,RESET_CART } from "../constants/cartConstants";
import axios from "axios";
const apiUrl = 'http://localhost:5000/api/v1';
// Add to cart 
export const addItemsToCart = (id,quantity)=>async(dispatch,getState)=>{
    const {data} = await axios.get(`${apiUrl}/product/${id}`);
    dispatch({
      type:ADD_TO_CART,
      payload:{
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.image.url,
        stock:data.product.stock,
        quantity,
      }
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};
// remove from cart
export const removeItemsFromCart = (id)=>async(dispatch,getState)=>{
  const {data} = await axios.get(`${apiUrl}/product/${id}`);
  dispatch({
    type:REMOVE_CART_ITEM,
    payload:id,
  });
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};
//SAVE SHIPPING INFO
export const saveShippingInfo = (data)=>async(dispatch)=>{
  dispatch({
    type:SAVE_SHIPPING_INFO,
    payload:data,
  });
  localStorage.setItem("shippingInfo",JSON.stringify(data));
};
// reset cart
export const resetCart = () => ({
  type: RESET_CART,
});