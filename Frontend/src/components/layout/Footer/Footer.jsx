import React from "react";
import "./Footer.css";
import { assets } from "../../../assets/assets";
import { MdFacebook, MdGrid3X3, MdOutlineKebabDining } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Cupcake ipsum dolor sit amet macaroon chocolate cake. Sugar plum
            cake toffee candy toffee. Pie lollipop sweet cheesecake pudding.
            Liquorice candy shortbread dragée jelly sugar plum carrot cake
            chocolate cake candy.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            {/* <MdFacebook className="icon"/> */}
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@noshnow.com</li>
            <NavLink to="/contact">
              <li><button>click here for any query:-</button></li>
            </NavLink>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 &copy; - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
