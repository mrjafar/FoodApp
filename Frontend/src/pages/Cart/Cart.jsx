import React, { useContext } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCartAmount, removeFromCart } from "../../features/ItemsSlice/ItemsSlice";
import { api } from "../../api/fetchApi";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Cart = () => {
  const cartItems = useSelector((state) => state.foodItems.cartItems);
  const food_list = useSelector((state) => state.foodItems.foodList);
  const getTotalCart = useSelector((state) => getTotalCartAmount(state.foodItems));
  // console.log(cartItems);
  // console.log(food_list);


  const { url, token } = useContext(StoreContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEmptyCart = !food_list.some((curItem) => cartItems[curItem._id] > 0);

  const headers = { Authorization: `Bearer ${token}` };
  const handleRemoveFromCart = async (itemId) => {
    if (token) {
      const response = await api.post("/api/cart/remove", { itemId }, { headers });
      if (response.status === 200) {
        dispatch(removeFromCart({ itemId }));
        toast.success("item removed from the cart")
      } else {
        toast.error("Failed to remove cart.");
      }
    }
  }

  // handle checkout functionality---------
  const handleCheckout = () => {
    navigate("/order", { state: { getTotalCart: getTotalCart } })
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {isEmptyCart ? (
          <div className="empty-cart-message">
            <p>Your cart is empty. Start adding items to your cart!</p>
          </div>
        ) : (
          food_list.map((curItem, index) => {
            const { _id, name, image, price } = curItem;
            const image_url = url + "/images/" + image;
            if (cartItems[_id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={image_url} alt="" />
                    <p>{name}</p>
                    <p>₹{price}</p>
                    <p>{cartItems[_id]}</p>
                    <p>₹{price * cartItems[_id]}</p>
                    <p
                      onClick={() => handleRemoveFromCart(_id)}
                      className="cross"
                    >
                      X
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCart}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCart === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCart === 0 ? 0 : getTotalCart + 20}
              </b>
            </div>
          </div>
          <button onClick={handleCheckout} disabled={isEmptyCart}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code paste it here</p>
            <div className="cart-promo-code-input">
              <input type="text" placeholder="promo code..." />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
