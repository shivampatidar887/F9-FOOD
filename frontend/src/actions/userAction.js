import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    DETAIL_USER_REQUEST,
    DETAIL_USER_SUCCESS,
    DETAIL_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    CLEAR_FORGOT_PASSWORD,
    RESET_PASSWORD_REQUEST,
   RESET_PASSWORD_SUCCESS,
   RESET_PASSWORD_FAIL,
   ALL_USERS_REQUEST,
   ALL_USERS_SUCCESS,
   ALL_USERS_FAIL,
   DELETE_USER_REQUEST,
   DELETE_USER_SUCCESS,
   DELETE_USER_FAIL,
   DELETE_USER_RESET,
   UPDATE_USER_REQUEST,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_FAIL,
   UPDATE_USER_RESET,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/userConstants";
import axios from "axios";
// import Cookies from "js-cookie";
const apiUrl = 'http://localhost:5000/api/v1';

//Login user
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `${apiUrl}/login`,
            { email, password },
            config
        );
        localStorage.setItem('token',  data.jwt);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};
// register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(
            `${apiUrl}/register`,
            userData,
            config
        );
        localStorage.setItem('token',  data.jwt);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message, });
    }
};

//Load logged in user
export const loadUser = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`, } };
        dispatch({ type: LOAD_USER_REQUEST });
        const { data } = await axios.get(`${apiUrl}/me`, config);
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};

// get logged in user by token
export const getUser = (token) => async (dispatch) => {
    try {
        dispatch({ type: DETAIL_USER_REQUEST });
        const { data } = await axios.get(`${apiUrl}/user/${token}`);
        dispatch({ type: DETAIL_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: DETAIL_USER_FAIL, payload: error.response.data.message });
    }
};



//Log out user
export const logout = () => async (dispatch) => {
    try {
        await axios.post(`${apiUrl}/logout`);
        localStorage.removeItem('token');
        localStorage.removeItem('shippingInfo');
        localStorage.removeItem('cartItems');
    
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const token = localStorage.getItem('token');
        const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`, } };
        const { data } = await axios.put(
            `${apiUrl}/me/update`,
            userData,
            config
        );
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message, });
    }
};
// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const token = localStorage.getItem('token');
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, } };
        const { data } = await axios.put(
            `${apiUrl}/password/update`,
            passwords,
            config
        );
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message, });
    }
};
//forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`${apiUrl}/password/forgot`, email, config );
        
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
        setTimeout(() => {
            dispatch({ type: CLEAR_FORGOT_PASSWORD});
        }, 3000);
    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
    }
};
// reset password
export const resetPassword = (token,passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`${apiUrl}/password/reset/${token}`, passwords, config );
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message});
        setTimeout(() => {
            dispatch({ type: CLEAR_FORGOT_PASSWORD});
        }, 3000);
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
    }
};


// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const token = localStorage.getItem('token');
      const config = { headers: {Authorization: `Bearer ${token}`, } };
      const { data } = await axios.get(`${apiUrl}/admin/users`,config);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
  };
  
  // get  User Details
  export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const token = localStorage.getItem('token');
      const config = { headers: {Authorization: `Bearer ${token}`, } };
      const { data } = await axios.get(`${apiUrl}/admin/user/${id}`,config);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update User
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const token = localStorage.getItem('token');
      const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, } };
  
      const { data } = await axios.put(
        `${apiUrl}/admin/user/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete User
  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
      const token = localStorage.getItem('token');
      const config = { headers: {  Authorization: `Bearer ${token}`, } };
      const { data } = await axios.delete(`${apiUrl}/admin/user/${id}`,config);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
// CLearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};