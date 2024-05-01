import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '../../utils/Context/UserAthenticationContext';

function ProtectedRoute({children}) {
  const {user} = useUserAuth();
  const location = useLocation();
  if(user){
	 return children;
  }
  else{
	return <Navigate to="/home"/>
  }
}

export default ProtectedRoute
