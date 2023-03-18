import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/Header/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import './Products.css';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useLocation } from 'react-router-dom';
import { addItemsToCart } from '../../actions/cartAction';
const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const alert = useAlert();
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 1000]);
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const { loading, error, products, productsCount } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState({});
  const increaseQuantity = (productId, stock) => {
    if (stock <= quantity[productId]) return;
    const newQuantity = { ...quantity };
    newQuantity[productId] = newQuantity[productId] ? newQuantity[productId] + 1 : 1;
    setQuantity(newQuantity);
  };

  const decreaseQuantity = (productId) => {
    if (quantity[productId] === 1) return;
    const newQuantity = { ...quantity };
    newQuantity[productId] = newQuantity[productId] ? newQuantity[productId] - 1 : 1;
    setQuantity(newQuantity);
  };

  const addToCartHandler = (productId, stock) => {
    if (stock >= 1) {
      if (isAuthenticated === true) {
        dispatch(addItemsToCart(productId, quantity[productId] ? quantity[productId] : 1));
        alert.success("Item Added to Cart")
      }
      else {
        alert.show("Please Login")
      }
    }
    else {
      alert.show("SORRY! Product is Out of Stock");
    }
  };
  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, price, category));
  }, [dispatch, error, alert, keyword, price, category]);

  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="filter">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby='range-slider'
              min={0}
              max={800}
            />
          </div>
          <div className="products">
            {products &&
              products.map((product) => (
                <div className="productCard" key={product._id}>
                  <div className="first">
                    <img src={product.image.url} alt={product.name} />
                  </div>
                  <div className="second">
                    <div className="second-1">
                      <h2>{product.name}</h2>
                      <p>Product # {product._id}</p>
                    </div>
                    <div className="second-2">
                      <h1>{`₹${product.price}`}</h1>
                      <div className="second-2-1">
                        <div className="second-2-1-1">
                          <button onClick={() => decreaseQuantity(product._id)}>-</button>
                          <input readOnly value={quantity[product._id] || 1} type="number" />
                          <button onClick={() => increaseQuantity(product._id, product.stock)}>+</button>
                        </div>
                        <button onClick={() => addToCartHandler(product._id, product.stock)}>Add to Cart</button>
                      </div>
                      <p>
                        Status:
                        <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                          {product.stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                      </p>
                    </div>

                  </div>
                </div>
              ))}
          </div>


        </Fragment>
      }
    </Fragment>
  );
};
export default Products
