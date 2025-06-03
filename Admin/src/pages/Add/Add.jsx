import React, { useState } from 'react'
import axios from "axios";
import './Add.css'
import { assets } from '../../assets/assets'
import { postData } from '../../api/fetchApi';
import { toast } from 'react-toastify';

export const Add = () => {
    const url = "http://localhost:5000";
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "salad",
        weight: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        formData.append("weight", Number(data.weight));

        try {
            const res = await postData(formData)
            if (res.status === 201) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "salad",
                    weight: ""
                });
                setImage(false);
                toast.success(res.data.message);
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='add'>
            <form onSubmit={handleSubmit} className='flex-col'>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={handleInputChange} value={data.name} type="text" name='name' placeholder='Type here...' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={handleInputChange} value={data.description} name="description" id="" rows="6" placeholder='write content here...' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={handleInputChange} name="category">
                            <option value="salad">Salad</option>
                            <option value="rolls">Rolls</option>
                            <option value="deserts">Deserts</option>
                            <option value="sandwich">Sandwich</option>
                            <option value="cake">Cake</option>
                            <option value="pure Veg">Pure Veg</option>
                            <option value="pasta">Pasta</option>
                            <option value="noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Weight</p>
                        <input onChange={handleInputChange} value={data.weight} type="number" name="weight" placeholder='250gm' required />
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={handleInputChange} value={data.price} type="number" name='price' placeholder='$20' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

