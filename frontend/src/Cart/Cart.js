import React, { Fragment,useEffect } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeItemsFromCart } from "../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link,useNavigate } from "react-router-dom";
import LoginSignUp from "../component/User/LoginSignUp";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const {isAuthenticated,loading} = useSelector((state) => state.user);
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/shipping");
  };
  useEffect(() => {
    if (typeof isAuthenticated==="undefined"&&loading===false){
        navigate("/login")
    }
    if(isAuthenticated===false&&loading===false){
      navigate("/login")
    }
  }, [navigate]);
  return (
    <Fragment>
      {isAuthenticated===true?(<Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>Add Product in Your Cart</Typography>
          <Link to="/">Go To Menu</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <div className="CartItemCard">
                    <img src={item.image} alt="ssa" />
                    <div>
                      <h2>{item.name}</h2>
                      <span>{`Price: ₹${item.price}`}</span>
                      <p onClick={() => deleteCartItems(item.product)}>Remove</p>
                    </div>
                  </div>
                  <div className="cartInput">
                    {item.quantity}
                  </div>
                  <p className="cartSubtotal">{`₹${item.price * item.quantity
                    }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
                
              </div>
              
            </div>
            <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Buy Now</button>
              </div>
          </div>
        </Fragment>
      )}
    </Fragment>):(<LoginSignUp/>)}
    </Fragment>
  );
};

export default Cart;
