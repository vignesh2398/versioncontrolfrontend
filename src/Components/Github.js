import React, { useEffect, useState } from 'react'
import { url1 } from '../App'
import axios from 'axios'
import { Repo } from './Repo'
import moment from 'moment'
import { Route, Routes, useNavigate } from 'react-router-dom'

export const Github = (props) => {
    const navigate = useNavigate();
    var url=`${url1}`
    const [value,setvalue]=useState()
    const [value2,setvalue2]=useState()
    const [set2,setdata2]=useState()
    const [val,setval]=useState(false)
    const [val1,setval1]=useState(true)
    const [ref,setref]=useState()
    const [data,setdata]=useState({RepoName:""})
   
   


    const Delete=async(id)=>{
        let token=sessionStorage.getItem('auth-token');
        let email=sessionStorage.getItem('email');

        const del= await axios.delete(`${url}user/delete/${id}`,{headers:{"email":email,"auth-token":token}})
        
        if(del.data.success)
        {
            alert(del.data.message)
            setref(del.data)
            
        }
        else{

          alert(del.data.message)
          navigate('/')
        }
    }

    const CreateRepo=()=>{
        setval(true)
        setval1(false)
    }
    const Create=async(e)=>{
        let email=sessionStorage.getItem('email');
        let token=sessionStorage.getItem('auth-token');
        console.log(data)
        console.log(token)
            const NewRepo= await axios.post(`${url}repo`,data,{headers:{"email":email,"auth-token":token}})
            if(NewRepo.data.success)
            {
                alert(NewRepo.data.message)

                setval1(true)
                setval(false)
                setref(NewRepo.data)
            }
            else
            alert(NewRepo.data.message)
       
        console.log(data)
    }
    const handleChange=(e)=>{
        var name=e.target.name
        setdata({...data,[name]:e.target.value})
        console.log(e.target.value)
    }
    const refresh=async()=>{
            
        let email=sessionStorage.getItem('email');
        let token=sessionStorage.getItem('auth-token');
        const fecthdata= await axios.get(`${url}user/allrepo`,{headers:{"email":email,"auth-token":token}})
        
        var data=fecthdata.data.repo
        var data2=(fecthdata.data)
        console.log(data2)
        setdata2(data2)
        setvalue(data)
        setvalue2(fecthdata.data.name)
        
       
    }  
    useEffect(()=>{

        refresh();
    },[ref]);
    
  return (
    <>
    
    <div class="container col-6"><h1 center>{value2} Repository</h1></div>
<div class="card container-fluid col-6 my-5  ">
    <div >{val1?<td><button type="button" class="btn btn-outline-success" onClick={CreateRepo} >New </button></td>:<></>}
    {val?<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Enter repo Name" name="RepoName" 
  onChange={handleChange} value={data.RepoName}/>
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button"  onClick={Create} 
    >New</button>
  </div>
</div>:<span> </span>}</div>
   
<table class="table">
  <thead>
    
      
      <th scope="col-sm">RepoName</th>
      <th scope="col-sm">Owner</th>
      <th scope="col-sm">Last Modified</th>
      <th scope="col-sm">Created date</th>
      
      
   
  </thead>
  {value?
    value.map((user,index)=>{
      const date= moment(user.createdate).format("YYYY/MM/DD kk:mm:ss");
         
return(


  <tbody>
    
    <tr>
      
      <td>{user?.RepoName}</td>
      <td>{value2}</td>
      <td>{date}</td>
      <td>{date}</td>
      <td><button type="button" class="btn btn-outline-success" onClick={()=>props.submit(user?._id)}>View </button></td>
      <td><button type="button" class="btn btn-outline-danger" onClick={()=>Delete(user?._id)}>Delete </button></td>
    </tr>



  </tbody>
  )
})

:<p>no data found</p>}
</table>

</div>

    </>
  )
}

