import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../context/StoreContext';
import "./ViewMore.css";
import { assets } from '../../../assets/assets';
import { toast } from 'react-toastify';
import { GiCrossedBones } from 'react-icons/gi';
import { FaCartPlus } from 'react-icons/fa';
import { MdPreview } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../features/ItemsSlice/ItemsSlice';
import { api} from '../../../api/fetchApi';


export const ViewMore = ({ curItem, setIsModalOpen }) => {
    const cartItems = useSelector((state) => state.foodItems.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useContext(StoreContext);
    const headers = { Authorization: `Bearer ${token}` };
    

    const { _id, name, price, description, image, category, material, weight } = curItem;
    const image_url = "http://localhost:5000/images/" + image;

    // handle quantity functionality------
    const handleAddToCartImage = async () => {
        if (cartItems[_id]) { // ✅ Only allow update if the item is in the cart
            // const headers = { Authorization: `Bearer ${token}` };
            try {
                const response = await api.post("/api/cart/add", { itemId: _id }, { headers });
                if (response.status === 200) {
                    dispatch(addToCart({ itemId: _id }));
                }
            } catch (error) {
                console.error("API Error:", error);
                toast.error("Server error while updating the cart.");
            }
        } else {
            toast.info(`${name} not in cart. Add via 'Add to Cart' button first.`);
        }
    };

    // handle add to cart button functionality------
    const handleAddToCartButton = async () => {
        if (!token) {
            toast.error("User not authenticated.");
            return;
        }
        // const headers = { Authorization: `Bearer ${token}` };
        // console.log("Sending Headers:", headers); 
        try {
            if (!cartItems[_id]) {
                const response = await api.post("/api/cart/add", { itemId: _id }, { headers });
                console.log("API Response:", response);
                if (response.status === 200) {
                    dispatch(addToCart({ itemId: _id }));
                    toast.success(`${name} added to cart`);
                    console.log(_id);
                } else {
                    toast.error("Failed to add item to cart.");
                }
            } else {
                toast.success("Cart Items updated successfully.")
            }
        } catch (error) {
            console.error("API Error:", error); // ✅ Debugging Log
            toast.error("Server error while adding to cart.");
        }
    };

    const handleCartRemove = async () => {
        if (cartItems[_id]) {
            if (token) {
                const response = await api.post("/api/cart/remove", { itemId: _id }, { headers });
                if (response.status === 200) {
                    dispatch(removeFromCart({ itemId: _id }));
                    // toast.success("item removed")
                } else {
                    toast.error("Failed to remove cart.");
                }
            }
        } else {
            toast.info(`${name} not in cart. Add via 'Add to Cart' button first.`);
        }
    }

    if (!curItem) {
        return <p>Loading...</p>;
    }
    if (!curItem._id) {
        return <p>Order not found. Please check the URL or go back to the main page.</p>;
    }
    return (
        <>
            <div className='view-more'>
                <GiCrossedBones
                    onClick={() => setIsModalOpen(false)} className='cross-icon' />
                <figure>
                    <img src={image_url} alt={name} width="400px" />
                </figure>
                <div className="item-detail">
                    <h1>{name}</h1>
                    <p className='food-item-description'>{description}</p>
                    <div className="other-content">
                        <div className='category-weight'>
                            <p className='category'>Category: {category}</p>
                            <p>Weight : {weight}gm</p>
                        </div>
                        {/* <p className='material'>Material: {material}</p> */}
                    </div>
                    <div className='food-item-rating'>
                        <p className='food-item-price'>₹{price}</p>
                        <img src={assets.rating_starts} alt="" />
                    </div>
                    <div className='qty'>Quantity: <br />
                        {cartItems[_id] !== undefined ? (
                            <div className="food-item_counter">
                                <img
                                    onClick={() => handleCartRemove(_id)}
                                    aria-disabled={cartItems[_id] === 0}
                                    src={assets.remove_icon_red}
                                    alt="Remove from cart"
                                />
                                <p>{cartItems[_id]}</p>
                                <img
                                    onClick={handleAddToCartImage}
                                    src={assets.add_icon_green}
                                    alt="Add to cart"
                                />
                            </div>
                        ) : (
                            <div className="food-item_counter">
                                <img
                                    src={assets.remove_icon_red}
                                    alt="Remove from cart"
                                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                />
                                <p>1</p>
                                <img
                                    onClick={handleAddToCartImage}
                                    src={assets.add_icon_green}
                                    alt="Add to cart"
                                />
                            </div>
                        )}
                    </div>

                    <div className='cart-btn'>
                        <button onClick={handleAddToCartButton}>
                            <FaCartPlus className='icon plus' />
                            {cartItems[_id] ? 'Update Cart' : ' Add to Cart'}
                        </button>
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                navigate('/cart');
                            }}
                            className='view-cart-btn'>
                            <MdPreview className='icon view' />
                            View Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}