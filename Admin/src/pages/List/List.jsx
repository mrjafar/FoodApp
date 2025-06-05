import React, { useEffect, useState } from 'react'
import './List.css'
import { getData, removeData } from '../../api/fetchApi';
import { toast } from 'react-toastify';

export const List = () => {
  const [list, setList] = useState([]);

  const url = 'https://foodapp-backend-sc5z.onrender.com';

  const fetchList = async () => {
    try {
      const res = await getData();
      if (res.status === 200) {
        setList(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleRemove = async (foodId) => {
    try {
      const res = await removeData(foodId);
      if (res.status === 200) {
        toast.success(res.data.message);
        fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Sr. No.</p>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Weight</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {
          list.map((curItem, index) => {
            return (
              <div key={index} className='list-table-format'>
                <p>{index+1 }</p>
                <img src={`${url}/images/` + curItem.image} alt="" />
                <p>{curItem.name}</p>
                <p>{curItem.category}</p>
                <p>{curItem.weight}gm</p>
                <p>${curItem.price}</p>
                <p onClick={() => handleRemove(curItem._id)} className='cross'>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
