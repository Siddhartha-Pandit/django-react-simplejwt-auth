import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import {loginSuccess} from '../slicefile/authSlice'
import {useDispatch} from 'react-redux'
export default function Login() {
  const dispatch=useDispatch()
  
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)
  
  const navigate=useNavigate()
  const handleSubmit= async (e)=>{
    e.preventDefault();
   try{
    setLoading(true)
    const loginData={
     
      email:email,
      password:password,
      
      
    }
   
    const response=await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`,loginData)

    console.log('Login Sucessful',response.data)
    const loginstate={
      isAuthenticated:true,
      data:null,
      accessToken:response.data.access,
      refreshToken:response.data.refresh
    }
   
    localStorage.setItem('access_token',response.data.access)
    localStorage.setItem('refresh_token',response.data.refresh)
    dispatch(loginSuccess(loginstate))
    navigate('/')
   }
   catch (error){
    console.log("Login failed",error.response.data)

   }
   finally{
setLoading(false)
   }
  
 
  }
  return (
    <div>
        <form>
      
        <span>Email</span>
        <input type='text'value={email} onChange={(event)=>setEmail(event.target.value)} /><br/>
        <span>Password</span>
        <input type='text'value={password} onChange={(event)=>setPassword(event.target.value)} /><br/>
        
        <input type='Button' value='Submit' onClick={handleSubmit} disabled={loading} />

      </form>
      <Link to='/generateotp'>Forgot Password</Link>
    </div>
  )
}
