/* eslint-disable react/prop-types */
import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../../assets/assets";

export const ExploreMenu = ({ category, setCategory }) => {

  const handleCategoryChange = (menuName) => {
    setCategory((prev) => (prev === menuName ? "All" : menuName));
  };


  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((curItem, index) => {
          return (
            <div onClick={() => handleCategoryChange(curItem.menu_name)} key={index} className="explore-menu-list-items">
              <img className={category === curItem.menu_name ? "active" : ""} src={curItem.menu_image} alt="menu-image" />
              <p>{curItem.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};
