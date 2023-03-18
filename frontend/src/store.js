import {legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { deleteproductReducer, newproductReducer, productDetailsReducer, productReducer } from "./reducers/productReducers";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
import { allreviewReducer, newreviewReducer, newReviewReducer } from "./reducers/reviewReducer";
const reducer = combineReducers({
    products:productReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrderReducer,
    orderDetails:orderDetailsReducer,
    reviews:allreviewReducer,
    newReview:newreviewReducer,
    newProduct:newproductReducer,
    product:deleteproductReducer,
    productDetails: productDetailsReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
});
let initialState={
    cart:{
      cartItems:localStorage.getItem("cartItems")?
      JSON.parse(localStorage.getItem("cartItems")):[],
      shippingInfo:localStorage.getItem("shippingInfo")?
      JSON.parse(localStorage.getItem("shippingInfo")):{},
    },
};
const middleware = [thunk];
const store = createStore(
reducer,
initialState,
composeWithDevTools(applyMiddleware(...middleware))
);
export default store 