import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import "./Footer.css";
import Insta from './Insta';
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftfooter">
        <p>Copyrights 2023 &copy; Mrshiv_987</p>
      </div>
      <div className="midfooter">
        <h1>F9-FOOD</h1>
        <p>Best Quality Is our First Priority</p>
      </div>
      <div className="rightfooter">
        {/* <BsInstagram className='insta' /> */}
        <Insta />
       <p> Follow Me</p>
      </div>
    </footer>
  )
}

export default Footer
