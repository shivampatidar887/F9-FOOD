import React, { useState, Fragment } from 'react'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Header.css';
import {BsFillCartCheckFill} from 'react-icons/bs';
import { useAlert } from 'react-alert';
import { RiAccountCircleFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
const Header = () => {
  
  const {isAuthenticated} = useSelector((state)=>state.user);
  const alert = useAlert();
  const [keyword,setKeyword]=useState("");
  const navigate = useNavigate();

  const searchSubmitHandler=(e)=>{
    e.preventDefault();
    if(keyword.trim()){
      navigate(`/products/${keyword}`);
    }
    else{
      // navigate("/products");
      alert.show("Please Enter Something to Search Product... ");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark transparent-navbar">
  <div className="container-fluid">
    
  {!isAuthenticated && <a href="/login" id='login-logo'><RiAccountCircleFill/><h4>Login</h4></a>}
  {isAuthenticated && <a href="/cart" id='cart-logo'><BsFillCartCheckFill/></a>}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='/' className="nav-link active home-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to='/about' className="nav-link active about-link">About</Link>
        </li>
        <li className="nav-item">
          <Link to='/reviews' className="nav-link active">Reviews</Link>
        </li>
      </ul>
      <form className="d-flex" role="search" onSubmit={searchSubmitHandler}>
        <input className="form-control me-2" type="search" placeholder='Search Product...' aria-label="Search"
        onChange={(e)=>setKeyword(e.target.value)}/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>




  )
}

export default Header
