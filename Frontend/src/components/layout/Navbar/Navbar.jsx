import React, { useState, useContext } from "react";
import "./Navbar.css";
import { TiShoppingCart } from "react-icons/ti";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { IoIosArrowDown } from "react-icons/io";
import { MdLogout, MdSearch } from "react-icons/md";
import { Link } from "react-scroll";
import { StoreContext } from "../../../context/StoreContext";
import { RxCross2 } from "react-icons/rx";

export const Navbar = ({ setShowLogin }) => {
  // const [userData, setUserData] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { foodList, searchQuery, setSearchQuery, setSearchFoodItems, token, setToken } = useContext(StoreContext);

  const suggestions = foodList.filter((item) => item.name).map((item) => item.name);

  // LogOut functionality-------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  };

  // const goToProfile = () => {
  //   navigate("profile", { state: { data: userData } })
  // }

  // Search functionality-------------------

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query)
    if (query.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSearch = (query) => {
    setTimeout(() => setSearchQuery(query), 100);
    console.log(`Searching for ${query}`);
  };

  const handleFocus = () => {
    if (searchQuery.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200)
  }

  const handleCross = () => {
    setSearchQuery("")
    setSearchFoodItems(prevState => !prevState)
  }

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    setSearchFoodItems(prevState => !prevState)
  }
  return (
    <div className="navbar">
      <NavLink to="/" style={{ border: "none" }}>
        <img src={assets.logo} alt="logo" className="logo" />
      </NavLink>
      {
        location.pathname === "/search" ?
          (<div className="search-container">
            <form onSubmit={handleSearchFormSubmit}>
              <MdSearch className="input-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Search by food name or category..."
                className="search-input"
              />
              <button type="submit" className="search-btn">search</button>
            </form>
            {searchQuery.length > 0 && <RxCross2 className="search-input-cross" onMouseDown={handleCross} />}
            {showSuggestions && (
              <div className="suggestions-container">
                {suggestions.filter((item) =>
                  item.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((item, index) => (
                  <div key={index} onMouseDown={() => handleSearch(item)} className="suggestion-items">
                    {item}
                  </div>
                ))
                }
              </div>)}
          </div>)
          :
          (<ul className="navbar-menu">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              <li>
                Home
              </li>
            </NavLink>
            {location.pathname === "/" && (<>
              <Link
                to="explore-menu"
                smooth={true}
                duration={5}
                // onClick={() => setMenu("menu")}
                className={(active) => active ? "active" : "hidden"}
              >
                <li>
                  menu
                </li>
              </Link>
              <Link
                to="app-download"
                smooth={true}
                duration={5}
                className={(active) => active ? "active" : "hidden"}
              >
                <li>
                  mobile-app
                </li>
              </Link>
            </>)}

            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <li >
                contact us
              </li>
            </NavLink>
          </ul>)
      }

      <div className="navbar-right">
        <NavLink to="/search" >
          <MdSearch className={location.pathname === "/search" ? "hidden" : "search-icon"} />
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? "isCart" : "")}>
          <TiShoppingCart style={{ fontSize: "2rem" }} />
        </NavLink>

        {token ? (
          <div className="navbar-profile">
            <FaUser
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
              title="profile"
              className="profile-icon"
            />
            <IoIosArrowDown />
            <ul className="profile-dropdown">
              {/* <li><p onClick={goToProfile}>My Profile</p></li> */}
              {/* <hr /> */}
              <NavLink to="/my-orders">
                <li>
                  <FaBagShopping />
                  <p>My Orders </p>
                </li>
              </NavLink>
              <hr />
              <li>
                <MdLogout />
                <p onClick={handleLogout} title="logout">
                  Logout
                </p>
              </li>
            </ul>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)} className="sign-in-btn">Sign In</button>
        )}
      </div>
    </div >
  );
};
