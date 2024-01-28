import React from 'react'
import axios from 'axios'
import { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
export default function GenerateOtp() {
    const [email,setEmail]=useState('')
    const [loading,setLoading]=useState(false)
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate=useNavigate()
    const handleGetOTP=async (e)=>{
        e.preventDefault();
        try{
            const data={
                email:email
            }

            const response=await axios.post(`${process.env.REACT_APP_API_URL}/generateotp/`,data)
            localStorage.setItem('email',email)
            setIsOtpSent(response.data.isotpsent);
            var userdata=response.data
            navigate('/verifyotp');
            setLoading(true)
        }
        catch (error){
            console.log("error",error.response.data)
            setLoading(false)
        }
       
        console.log(isOtpSent)
       
       


    }
    useEffect(() => {
        if (isOtpSent) {
          setLoading(false)
        }
      }, [isOtpSent]);
  return (
    
    <div>
        <span>Email</span>
        <input type='text'value={email} onChange={(event)=>setEmail(event.target.value)} /><br/>
        <input type='button' value='Get OTP' onClick={handleGetOTP} disabled={loading}/>
    </div>
  )
}
