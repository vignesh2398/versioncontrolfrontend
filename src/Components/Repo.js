import axios from 'axios'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { url1 } from '../App'

export const Repo = (props) => {
    const navigate = useNavigate();
    console.log((props.data.description))
    const[val,setval]=useState({description:"",commit:""})
    const[emptrepo,setrepo]=useState("")
   
    const len=(props.data)
    const len1=(props.data.description).length

     
    
    
   
    const HandelChange=(e)=>{
        const name=e.target.name
        const value=e.target.value
        setval({...val,[name]:value})

    } 

    const sumbit=async(e)=>{
        console.log(val)
        if(val.commit==""||val.description=="")
        {
            alert("please fill all details name")
        }
        else
        {
          let token=sessionStorage.getItem('auth-token');
          
          
            const id= sessionStorage.getItem('id')
            let email=sessionStorage.getItem('email');
            let res= await axios.put(`${url1}user/commit`,val,{headers:{"id":id,"email":email,"auth-token":token}},{new:true})
            console.log(res.data)
            if(res.data.success)
            navigate('/Github') 
        }
    }
    const edit=(descriptions)=>{
        const name="description"
        const value=descriptions
        setval({...val,[name]:value})

    }
  return (
    <>
    
    <table class="table container col-6">
  <thead>
        <h2>Repo Name {len?.RepoName}</h2>
    <tr>

      <th scope="col-sm">index</th>
      <th scope="col-sm">Created Date</th>
      <th scope="col-sm">Commit Name</th>
      
    </tr>
  </thead>
  <tbody>
    {len.description.map((val,index)=>{
        const date= moment(val.timestamp).format("YYYY/MM/DD kk:mm:ss");
        return(

            <tr>

      <td>{index+1}</td>
      <td>{date}</td>
      <td>{val?.commit}</td>
      
      <td><button class="btn btn-outline-secondary" type="button"  onClick={()=>edit(val?.description)}>View</button></td>
      
    </tr>
        )
    })}
  
  </tbody>
</table>
    <div class="form-group container">
    <label htmlFor="exampleFormControlTextarea1">Description</label>
    <textarea class="form-control" name="description" onChange={HandelChange} value={val.description} rows="3"></textarea>
    
    <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Enter commit Name" name="commit" onChange={HandelChange} value={val.commit}
   aria-describedby="basic-addon2"/>
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" onClick={sumbit}>Commit</button>
  </div>
</div>
  </div>
    </>
  )
}
