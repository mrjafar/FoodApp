import React, { useEffect, useState } from 'react'
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../api/fetchApi';

export const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const navigate = useNavigate();
    const verifyPayment = async() => {
        const res = await api.post("/api/order/verify",{success,orderId})
        console.log(res.data);
        
        if(res.data.success) {
            navigate("/my-orders")
        }
        else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
    },[])

    return (
        <div className='verify'>
            <div className="spinner">

            </div>
        </div>
    )
}
