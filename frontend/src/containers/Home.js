import React from 'react'
import {  useSelector } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function Home() {
  const authState = useSelector(state=>state.auth.auth.isAuthenticated)
  console.log(authState)
  const navigate=useNavigate()
  useEffect(() => {
    if (!authState) {
      navigate('/login');
    }
  }, [authState, navigate]);
  return (
    <div>
      This is home
     <Link to="reset_password">change password</Link>
    </div>
    
  )
}
