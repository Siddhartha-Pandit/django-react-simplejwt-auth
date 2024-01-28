import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function ForgotPassword() {
    const navigate=useNavigate()
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)
    const handleSubmit= async (e)=>{
        e.preventDefault();
        setLoading(true)
        try{
            
            const email=localStorage.getItem('email')
            const otp=localStorage.getItem('otp')
            const userdata={
                email:email,
                otp:otp,
                password:password
            }
            console.log(userdata)
            const response=await axios.post(`${process.env.REACT_APP_API_URL}/forgotpassword/`,userdata)
            // console.log("user data",response.data)
           navigate('/login')
        }
        catch(error){
                console.log("error",error.response.data)
                
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <div>
         <span>New Password</span>
        <input type='text'value={password} onChange={(event)=>setPassword(event.target.value)} /><br/>
        <input type='button' value='Change Password' onClick={handleSubmit}  disabled={loading}/>
    </div>
  )
}
