import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { assets, food_list } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { api } from "../../api/fetchApi";

export const PlaceOrder = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const getTotalCartAmount = location.state?.getTotalCart ?? 0;

  const { foodList, cartItems, token } = useContext(StoreContext)

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle payment methods----
  const handlePaymentMethods = (e) => {
    setPaymentMethod(e.target.value)
  }


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      setError("Please select a payment method!");
      return;
    }

    let orderItems = [];
    foodList.map((item) => {
      console.log(item);
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: formData,
      items: orderItems,
      amount: Number(getTotalCartAmount + 20),
      paymentMethod
    }

    const headers = { Authorization: `Bearer ${token}` };

    const res = await api.post("/api/order/place", orderData, { headers });
    console.log("API Response:", res.data);
    if (res.data.success) {
      if (paymentMethod === "Cash on Delivery") {
        navigate("/my-orders");
      } else {
        const { session_url } = res.data;
        window.location.replace(session_url)
      }
    } else {
      alert("Error.")
    }

    if (!formData.firstName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields!");
      return;
    }
    setError("");
    console.log("Order Placed:", formData);
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        {error && <p className="error">{error}</p>}
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleInputChange}
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount === 0 ? 0 : getTotalCartAmount + 20}
              </b>
            </div>
          </div>
          <div className="pay">
            <h3>Payment mode:--</h3>
            <div className="payment-methods">
              <div className="field">
                <img src={assets.cod} alt="Cash on delivery" />
                <label htmlFor="cod">Cash On Delivery</label>
                <input
                  type="radio"
                  name="payment"
                  id="cod"
                  value="Cash on Delivery"
                  onChange={handlePaymentMethods}
                />
              </div>
              <hr />
              <div className="field">
                <img src={assets.stripe} alt="stripe" />
                <label htmlFor="stripe">Stripe</label>
                <input
                  type="radio"
                  name="payment"
                  id="stripe"
                  value="Stripe"
                  onChange={handlePaymentMethods}
                />
              </div>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};
