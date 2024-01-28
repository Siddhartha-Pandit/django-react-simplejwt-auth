import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
export default function ResetPasswordConfirm() {
  const navigate=useNavigate()
  const authState = useSelector(state=>state.auth.auth.isAuthenticated)
  useEffect(() => {
    if (!authState) {
      navigate('/login');
    }
  }, [authState, navigate]);
  
  return (
    <div>Your Password is Reset successfully</div>
  )
}
