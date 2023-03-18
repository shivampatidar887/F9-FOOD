import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import MetaData from '../layout/Header/MetaData';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import './Reviews.css';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import { clearErrors, getAllreviews } from '../../actions/reviewAction';
const Reviews = () => {
  
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, reviews } = useSelector((state) => state.reviews);
  function StarRating({ rating }) {
    const stars = [];
  
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<StarIcon key={i} style={{ color: '#f7d43c' }} />);
      } else {
        stars.push(<StarBorderIcon key={i} />);
      }
    }
    return <>{stars}</>;
  }
  
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllreviews());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
        <MetaData title="REVIEWS" />
      {loading ? <Loader /> :
        <Fragment>
          
          <div className="reviews">
            <a href='/review/new'>Publish Review</a>
            {reviews &&
              reviews.map((review) => (
               <div className="review-box">
                <div className="review-desc">
                <p>{review.description}</p>
                </div>
                <div className="review-publish">
                <h4><StarRating rating={review.rating} /></h4>
                <p>Published At: {new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
               </div>
              ))}
          </div>
        </Fragment>
      }
    </Fragment>
  );
};


export default Reviews
