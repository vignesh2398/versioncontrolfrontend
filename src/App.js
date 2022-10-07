
import './App.css';
import { Login } from './Components/Login';
import { Routes,Route} from 'react-router-dom'
import { Github } from './Components/Github';
import { Repo } from './Components/Repo';
import { NewRepo } from './Components/NewRepo';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Signin } from './Components/Signin';
export const url1 ="https://sample456.herokuapp.com/"
function App() {
  const[val,setval]=useState()
  const navigate = useNavigate();

  const submit=async(id)=>{  
    let email=sessionStorage.getItem('email');

    let token=sessionStorage.getItem('auth-token');
    const ddd= await axios.get(`${url1}repo/${id}`,{headers:{"email":email,"auth-token":token}})
    if(ddd.data.success)
    {
      let token = sessionStorage.setItem('id',id);
      setval(ddd.data.message)
      console.log(ddd.data.message)  
      navigate("/repo")
       
}
    else
    alert(ddd.data.message)
}

  return (
   <>
    <Routes>
      <Route path='/' element ={<Login/>}/>
      <Route path='/Github' element ={<Github submit={submit}/>}/>
      <Route path='/repo' element ={<Repo data={val} />}/>
      <Route path='/NewRepo' element ={<NewRepo/>}/>
      <Route path='/signin' element ={<Signin/>}/>
    </Routes>
   </>
  
  );
}

export default App;
