import React, { useState } from 'react'
import { url1 } from '../App';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signin = () => {
    const url="http://localhost:4050/Create"
    const navigate=useNavigate();
    const [loginvalue,setvalue]=useState({
        email:'',
        name:'',
        password:''
    })

    const handlechange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setvalue({...loginvalue,[name]:value})
       }
     
       const sumbit=async(e)=>{
        e.preventDefault();
try {
    console.log(loginvalue)
  
    let res= await axios.post(url,loginvalue)
    if(res.data.success)
    {
    
        alert("account created")
    navigate("/")
    }
    else{
      
     
      console.log(res.data.message)
        
    }
} catch (error) {
    alert(error)
}
      
        }

     
  return (
    <div className='container col-3 card my-5'><form>
        <h1>Signin details</h1>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" onChange={handlechange} value={loginvalue.email} name="email" placeholder="Enter email"/>
      <label for="exampleInputEmail1">Name</label>
      <input type="text" class="form-control" onChange={handlechange} value={loginvalue.name} name="name" placeholder="Enter Name"/>
      
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" onChange={handlechange} value={loginvalue.password} name="password" placeholder="Password"/>
    </div>
    
    <button type="submit" class="btn btn-primary" onClick={sumbit}>Submit</button>
  </form></div>
  )
}
