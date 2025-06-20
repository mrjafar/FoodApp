import React from 'react'
import './Orders.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { toast } from "react-toastify"
import { api, fetchOrders, orderStatus } from '../../api/fetchApi';
import { assets } from "../../assets/assets"

export const Orders = () => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await fetchOrders();
      if (res.status === 200) {
        setOrders(res.data.data)
      } else {
        toast.error("Error")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleStatus = async (e, orderId) => {
    try {
      const res = await api.post("/api/order/status",{
        orderId,
        status: e.target.value
      })
      if(res.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="parcel-icon" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city}", "+{order.address.state + ", " + order.address.country + ", " + order.address.zipCode} </p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e) => handleStatus(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Our for Delivery">Our for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

