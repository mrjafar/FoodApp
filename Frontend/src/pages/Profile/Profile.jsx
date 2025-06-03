import "./Profile.css";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from "../../api/fetchApi";
import { StoreContext } from "../../context/StoreContext";

export const Profile = () => {
  const [input, setInput] = useState({
    phone: "",
    gender: "",
    dob: "",
    add: "",
  });
  const navigate = useNavigate();
  // const location = useLocation();
  const { token } = useContext(StoreContext);
  const [userData, setUserData] = useState([]);
  
  const fetchUserData = async () => {
    const res = await api.get("/api/order/list");
    console.log(res.data.data);
    const filteredUser = res.data.data.map((user) => {
      return user ? user.userId : "not found"
    })
    const filteredName = filteredUser.map((user) => {
      return user === token ? user : "not found"
    })
    console.log(filteredName);

    setUserData(filteredUser);
  }

  useEffect(() => {
    fetchUserData();
  }, [])



  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="img-container">
        <figure>
          {userData?.photoURL ? (
            <img src={userData?.photoURL} alt="Profile" className="profile-image" />
          ) : (
            <FaRegUserCircle style={{ fontSize: "5rem" }} />
          )}
        </figure>
        <div>
          <h2>{userData?.name}</h2>
          <p>{userData?.email}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="information">
        <div className="profile-info">
          {/* Phone Input */}
          <div className="grid-two">
            <div>

              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={input.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                placeholder="Enter your date of birth"
                value={input.dob}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid-two">
            <div>
              <label htmlFor="gender">Gender:</label>
              <select name="gender" onChange={handleInputChange} value={input.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor="add">Address:</label>
              <input
                type="text"
                name="add"
                placeholder="Enter your address"
                value={input.add}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="profile-btn">
          <button type="submit" disabled={!input.phone && !input.add}>
            Save
          </button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};