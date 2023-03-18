import React, { Fragment, useState, useEffect } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../actions/cartAction";
import MetaData from "../component/layout/Header/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
// import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
// import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
// import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import LoginSignUp from "../component/User/LoginSignUp";
const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  // const [state, setState] = useState(shippingInfo.state);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  if (cartItems.length === 0) {
    navigate("/cart");
  }
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
    if (typeof isAuthenticated === "undefined" && loading === false) {
      navigate("/login")
    }
    if (isAuthenticated === false && loading === false) {
      navigate("/login")
    }

  }, [navigate]);
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      {isAuthenticated === true ? (<Fragment>
        <MetaData title="Shipping Details" />

        <CheckoutSteps activeStep={0} />

        <div className="shippingContainer">
          <div className="shippingBox">
            <h2 className="shippingHeading">Shipping Details</h2>

            <form
              className="shippingForm"
              encType="multipart/form-data"
              onSubmit={shippingSubmit}
            >
              <div>
                <HomeIcon />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <LocationCityIcon />
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <PinDropIcon />
                <input
                  type="number"
                  placeholder="Pin Code"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>

              <div>
                <PhoneIcon />
                <input
                  type="number"
                  placeholder="Phone Number"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size="10"
                />
              </div>

              <input
                type="submit"
                value="Continue"
                className="shippingBtn"
                // disabled={state ? false : true}
              />
            </form>
          </div>
        </div>
      </Fragment>) : (<LoginSignUp />)}
    </Fragment>
  );
};

export default Shipping;
