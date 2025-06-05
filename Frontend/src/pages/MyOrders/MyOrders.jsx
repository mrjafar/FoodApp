import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { api } from '../../api/fetchApi';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

export const MyOrders = () => {

    const [data, setData] = useState([]);
    const { token } = useContext(StoreContext);

    const fetchUserOrders = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        try {
            const res = await api.post("/api/order/userorders",{}, { headers });
            if (res.data.success) {
                setData(res.data.data)
                // console.log(res.data.data);
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchUserOrders();
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="orders-container">
                {data?.map((order, i) => {
                    return (
                        <div key={i} className="order">
                            <img src={assets.parcel_icon} alt="parcel-icon" />
                            <p>{order.items.map((item, i) => {
                                if (i === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                } else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            <p>₹{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchUserOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

