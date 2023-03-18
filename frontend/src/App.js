import React, { useState,useEffect } from 'react';
import './App.css';
import Header from "./component/layout/Header/Header";
import UserOptions from "./component/layout/Header/UserOption";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from './component/layout/Footer/Footer';
import About from './pages/About/About';
import Home from './component/Home/Home';
import Products from './component/Products/Products';
import LoginSignUp from './component/User/LoginSignUp';
import Profile from './component/User/Profile';
import { getUser, loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from './Cart/Cart';
import Shipping from './Cart/Shipping';
import ConfirmOrder from './Cart/ConfirmOrder';
import OrderSuccess from './Cart/OrderSuccess';
import axios from 'axios';
import Payment from './Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyOrders from "../src/component/Order/MyOrders";
import OrderDetails from './component/Order/OrderDetails';
import NewReview from './component/Review/NewReview';
import Dashboard from '../src/component/Admin/Dashboard'
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import Reviews from './component/Review/Reviews';
import NotFound from './component/layout/Not Found/NotFound';
function App() {
  const dispatch = useDispatch();
  
  // React.useEffect(()=>{
  // store.dispatch(loadUser());
  // },[]);

  const jwt = localStorage.getItem('token');
  const token = jwt ? jwt : null;
  const [stripeapikey,setStripeApiKey]=useState("");
  const apiUrl = 'http://localhost:5000/api/v1';
  async function getStripeApiKey(){
  
    const config = { headers: {Authorization: `Bearer ${token}`}};
    const {data} = await axios.get(`${apiUrl}/stripeapikey`,config);
    setStripeApiKey(data.StripeApiKey);
  }
  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
    getStripeApiKey();
  }, [dispatch]);
  const {isAuthenticated,user} = useSelector((state)=>state.user);
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/about' element={ <About />} />
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:keyword' element={<Products/>}/>
        <Route path="/login" element={<LoginSignUp/>}/>
        <Route path="/account" element={<Profile/>}/>
        <Route path="/me/update" element={<UpdateProfile/>}/>
        <Route path="/password/update" element={<UpdatePassword/>}/>
        <Route path="/password/forgot" element={<ForgotPassword/>}/>
        <Route path="/password/reset/:token" element={<ResetPassword/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path="/order/confirm" element={<ConfirmOrder/>}/>
       {stripeapikey&& <React.Fragment>
      <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeapikey)}><Payment/></Elements>} />
       </React.Fragment>}
       <Route path="/success" element={<OrderSuccess/>}/>
       <Route path="/orders" element={<MyOrders/>}/>
       <Route path="/order/:id" element={<OrderDetails/>}/>
       <Route path="/review/new" element={<NewReview/>}/>
       <Route path="/reviews" element={<Reviews/>}/>
       
       <Route path="/admin/dashboard" element={<Dashboard/>}/>
       <Route path="/admin/products" element={<ProductList/>}/>
       <Route path="/admin/product" element={<NewProduct/>}/>
       <Route path="/admin/update/:id" element={<UpdateProduct/>}/>
       <Route path="/admin/orders" element={<OrderList/>}/>
       <Route path="/admin/order/:id" element={<ProcessOrder/>}/>
       <Route path="/admin/users" element={<UsersList/>}/>
       <Route path="/admin/user/:id" element={<UpdateUser/>}/>
       <Route  path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
