import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../component/layout/Header/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder,clearErrors } from "../actions/orderAction";
import LoginSignUp from "../component/User/LoginSignUp";
const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const {isAuthenticated,loading,user} = useSelector((state) => state.user);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
      const { error } = useSelector((state) => state.newOrder);
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };
    if (cartItems.length === 0) {
        navigate("/cart");
      }
      else if (Object.keys(shippingInfo).length === 0) {
        navigate("/shipping");
      }
      useEffect(() => {
        if (cartItems.length === 0) {
          navigate("/cart");
        }
        else if (Object.keys(shippingInfo).length === 0) {
          navigate("/shipping");
        }
        if (typeof isAuthenticated==="undefined"&&loading===false){
            navigate("/login")
        }
        if(isAuthenticated===false&&loading===false){
          navigate("/login")
        }
      }, [navigate]);
    const apiUrl = 'http://localhost:5000/api/v1';
    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, } };
            const { data } = await axios.post(
                `${apiUrl}/payment/process`,
                paymentData,
                config
            );
            const client_secret = data.client_secret;
            if (!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                        },
                    },
                },
            });
            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    dispatch(createOrder(order));
                    navigate("/success");
                } else {
                    alert.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };

      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
      }, [dispatch, error, alert]);

    return (
        <Fragment>
            {isAuthenticated===true?(<Fragment>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>):(<LoginSignUp/>)}
        </Fragment>
    );
};

export default Payment;
