import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function Signup() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [rePassword,setRePassword]=useState('')
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const handleSubmit= async (e)=>{
    e.preventDefault();
   
    try{
      setLoading(true)
      const signupData={
        name:name,
        email:email,
        password:password,
        // re_password:rePassword
        
      }
      
      const response=await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`,signupData);
      console.log("Signup Sucessfully",response.data);
      navigate('/login')
    }catch(error){
      console.log("Signup failed",error.response.data)
    }finally{
      setLoading(false);
    }
    
  }
  return (
    <div>
      <form>
        <span>Name</span>
        <input type='text'value={name} onChange={(event)=>setName(event.target.value)} /><br/>
        <span>Email</span>
        <input type='text'value={email} onChange={(event)=>setEmail(event.target.value)} /><br/>
        <span>Password</span>
        <input type='text'value={password} onChange={(event)=>setPassword(event.target.value)} /><br/>
        <span>Confirm Password</span>
        <input type='text'value={rePassword} onChange={(event)=>setRePassword(event.target.value)} /><br/>
        <input type='Button' value='Submit' onClick={handleSubmit} disabled={loading}/>

      </form>
     
    </div>
  )
}
