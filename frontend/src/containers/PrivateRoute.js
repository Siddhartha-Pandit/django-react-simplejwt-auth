import React from 'react'
import { useSelector } from 'react-redux';
import {Route,useNavigate} from 'react-router-dom'
export default function PrivateRoute({path,element}) {
    const navigate=useNavigate()
    const isAuthenticated = useSelector(state => state.auth.auth.isAuthenticated);
    if(!isAuthenticated){
  
    navigate('/login')
    return null
    }
    return <Route path={path} element={element} />

}


