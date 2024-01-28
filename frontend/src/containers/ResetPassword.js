import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function ResetPassword() {

  const [currentPassword,setCurrentPassword]=useState('')
  const [newPassword,setNewPassword]=useState('')
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const authState = useSelector(state=>state.auth.auth.isAuthenticated)
  useEffect(() => {
    if (!authState) {
      navigate('/login');
    }
  }, [authState, navigate]);
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      const accessToken=localStorage.getItem('access_token')
      console.log(accessToken)
      const data={
        current_password:currentPassword,
        new_password:newPassword
      }
      const config={
        headers:{
          "Authorization":`Bearer ${accessToken}`
         
        }
      }
      
      const response=await axios.post('http://localhost:8000/auth/users/reset_password/',data,config);
      console.log("Signup Sucessfully",response.data);
      navigate('/password/reset/confirm')
    }catch(error){
      console.log("Signup failed",error.response.data)
    }finally{
      setLoading(false);
    }
   
  }
  return (
    <div>
      <span>Current password</span>
        <input type='text'value={currentPassword} onChange={(event)=>setCurrentPassword(event.target.value)} /><br/>
        <span>New Password</span>
        <input type='text'value={newPassword} onChange={(event)=>setNewPassword(event.target.value)} /><br/>
        <input type='Button' value='Submit' onClick={handleSubmit} disabled={loading} />
    </div>
  )
}
