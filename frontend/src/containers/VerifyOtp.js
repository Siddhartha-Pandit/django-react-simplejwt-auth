import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function VerifyOtp() {
    
    const [otp,setOtp]=useState('')
    const [loading,setLoading]=useState(false)
    const [error, setError] = useState(null);
    const navigate=useNavigate()
const handleChange= async (e)=>{
    e.preventDefault();
    try{
        const email=localStorage.getItem("email")
        const userdata={
            email:email,
            otp:otp
             }
             const response=await axios.post(`${process.env.REACT_APP_API_URL}/verifyotp/`,userdata)  
             console.log("user data",response.data)  
             setOtp(otp)  
             localStorage.setItem('otp',otp)
             navigate('/forgotpassword');
    }
    catch (error){
        console.error("Error:", error.response ? error.response.data : error.message);
        setError('Failed to send OTP. Please try again.');
    }
    finally {
        setLoading(false);
    }

   
     console.log(error)
}
  return (
    <div>
         <span>OTP</span>
        <input type='text'value={otp} onChange={(event)=>setOtp(event.target.value)} /><br/>
    
        <input type='button' value='Verify OTP' onClick={handleChange} />
    </div>
  )
}
