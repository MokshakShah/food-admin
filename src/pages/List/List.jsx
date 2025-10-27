import React, { useEffect } from 'react'
import './List.css'
import {toast} from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'

const List = ({url = import.meta.env.VITE_BACKEND_URL}) => {

  // const url="http://localhost:4000"
  const [list,setlist]= useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    
    if(response.data.success){
      setlist(response.data.data)
      
      //data.data is coming from postman, check

    }else{
      toast.error("Error while fetching data")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error("Error removing")

    }
  }


  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list-add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>

      {list.map((item,index)=>{
  return (
    <div key={index} className='list-table-format'>
      <img src={`${url}/images/`+ item.image} />
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>$ {item.price}</p>
      <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
    </div>

  )
})}

    </div>
    </div>
  )
}

export default List


