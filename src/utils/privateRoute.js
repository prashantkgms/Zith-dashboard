import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = sessionStorage.getItem('token'); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element; 
};

export default PrivateRoute;
