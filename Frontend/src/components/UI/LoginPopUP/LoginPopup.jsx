/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { RxCross2 } from "react-icons/rx";;
import { toast } from "react-toastify";
import { api } from "../../../api/fetchApi";
import { StoreContext } from "../../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const [curState, setCurState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { token, setToken } = useContext(StoreContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const endPoints = curState === "Login" ? "/api/user/login" : "/api/user/register"
      const res = await api.post(endPoints, data);
      if (res.status === 200) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
        curState === "Login" ?
          toast.success("Your Logged in successfully.")
          : toast.success("Your Registered successfully.")
      } else {
        toast.error("Error")
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleFormSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <RxCross2
            className="cross-icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {curState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="enter you name"
              name="name"
              required={curState === "Sign Up"}
              value={data.name}
              onChange={handleInputChange}
            />
          )}
          <input
            type="email"
            placeholder="enter you email"
            name="email"
            required
            value={data.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={data.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">
          {curState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {curState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurState("Sign Up")}>Click here </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
