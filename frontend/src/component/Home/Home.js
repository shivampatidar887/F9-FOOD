import React, { Fragment } from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import MetaData from '../layout/Header/MetaData';
import {MdSlowMotionVideo,MdDeliveryDining,MdFoodBank} from 'react-icons/md';
import {BsFillBagCheckFill} from 'react-icons/bs';
import Loader from '../layout/Loader/Loader';
const Home = () => {
 
   

  return (
    <Fragment>
      <MetaData title="F9-FOOD" />
       <div className="one">
        <div className="first">
        <h1>Fastest Delivery & Easy Pickup</h1>
        
        <div className="first-1">
        <img src={require('./Images/pex.jpg')} alt="Pex.image" />
          <p>when you are too lazy to cook, we are just a click away !</p>
        </div>
        <div className="first-2">
        <a href="#head">
          <button type="button">Order Now</button>
        </a>
        </div>
        </div>
        <div className="second">
          <div className="box-1">
            <div className="circle-2">
            <img src={require('./Images/girls.png')} alt="Pex.image" />
            </div>
            <img src={require('./Images/girls.png')} alt="Pex.image" />
          </div>
        </div>
        <div className="third">
          <div className="in-third">
            <div id="logo-3"><MdDeliveryDining/></div>
          <div className="in-3">
          <h4>Fast delivery</h4>
          <p>Promise to deliver within 30 mins</p>
          </div>
          </div>
          <div className="in-third">
            <div id="logo-3"> <BsFillBagCheckFill/></div>
         
          <div className="in-3">
          <h4>Pick up</h4>
          <p>Pickup delivery at your doorstep</p>
          </div>
          </div>
          <div className="in-third">
            <div id="logo-3"><MdFoodBank/></div>
          <div className="in-3">
          <h4>Dine in</h4>
          <p>Enjoy your food fresh crispy and hot</p>
          </div>
          </div>
        </div>
        </div>
        

      <h2 id='head' className="homeHeading">
        OUR MENU
      </h2>
      <div className="section" id="section">
        <Link className="box" to={{ pathname: '/products', search: `?category=${"Pizza"}` }}>
          <img src={require('./Images/pizza.png')} alt="Pizza.image" />
          <p>Pizza</p>
        </Link>
        <Link className="box" to={{ pathname: '/products', search: `?category=${"Maggi"}` }}>
          <img src={require('./Images/maggi.png')} alt="Maggi.image" />
          <p>Maggi</p>
        </Link>
        <Link className="box" to={{ pathname: '/products', search: `?category=${"Pasta"}` }}>
          <img src={require('./Images/pasta.png')} alt="Pasta.image" />
          <p>Pasta</p>
        </Link>
        <Link className="box" to={{ pathname: '/products', search: `?category=${"Burger"}` }}>
          <img src={require('./Images/burger.png')} alt="Burger.image" />
          <p>Burger</p>
        </Link>
        <Link className="box" to={{ pathname: '/products', search: `?category=${"Sandwich"}` }}>
          <img src={require('./Images/sandwich.png')} alt="Sandwich.image" />
          <p>Sandwich</p>
        </Link>
        <Link className="box" to={{ pathname: '/products', search: `?category=${"Fries"}` }}>
          <img src={require('./Images/fries.png')} alt="Fries.image" />
          <p>Fries</p>
        </Link>
      </div>
      <div className="two">
         <div className="two-1">
         <img src={require('./Images/mobile.png')} alt="Pex.image" />
         </div>
         {/* <img src={require('./Images/pizza.png')} alt="Pex.image" /> */}
         <div className="two-2">
          <h2>Download Our App</h2>
         <img src={require('./Images/icons.png')} alt="Pex.image" />
         <img src={require('./Images/rate.png')} alt="Pex.image" />
         </div>
        </div>
    </Fragment>
  );
};

export default Home;
