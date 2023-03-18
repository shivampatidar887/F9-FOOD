import React, { Fragment, useState, useEffect } from "react";
import "./Reviews.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/Header/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import {useNavigate } from "react-router-dom";
import { newReview } from "../../actions/reviewAction";
import LoginSignUp from "../User/LoginSignUp";
import {TfiWrite} from 'react-icons/tfi';
import {AiOutlineStar} from 'react-icons/ai';
const NewReview = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  const {isAuthenticated,user,loading } = useSelector((state) => state.user);
  const {error,success} = useSelector((state) => state.newReview);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("description", description);
    myForm.set("rating", rating);
    if(rating>=0&&rating<=5){
    dispatch(newReview( myForm));
    }
    else{
      alert.success("Rate between 0 to 5");
    }
  };

  useEffect(() => {
    if (typeof isAuthenticated==="undefined"&&loading===false){
      navigate("/login")
  }
  if(isAuthenticated===false&&loading===false){
    navigate("/login")
  }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      navigate("/reviews");
    }
  }, [dispatch, error, alert,success, navigate]);

  return (
    <Fragment>
    {isAuthenticated===true?(
        <Fragment>
          <MetaData title="SUBMIT REVIEW" />
          <div className="newReviewContainer">
            <div className="newReviewboxBox">
              <h2 className="newreviewHeading">PUBLISH REVIEW</h2>
              <form
                className="newreviewform"
                onSubmit={resetPasswordSubmit}
              >
                <div id="desc">
                  <TfiWrite/>
                  <input
                    type="text"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div >
                <div className="rating">
                <AiOutlineStar/>
                  <input
                    type="number"
                    placeholder="Rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="reviewsubmitBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>):(<LoginSignUp/>)}
     </Fragment>
  );
};



export default NewReview
